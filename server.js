import express from "express";
import aiService from "./aiService";
import exampleService, { getServiceClient } from "./exampleService";
import addRequestId from "express-request-id";

let localConcurrencyToken = "";
let localChannelId = "";
let tokenCreationInProgress = false;
let serviceClient;

const app = express();
const port = 3000;

app.use(express.json());
app.use(addRequestId());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});



app.post("/test", async (req, res) => {
  const { a, b } = req.body;
  const log = (...args) => {
    console.log("reqID: ", req.id, " ", ...args);
  };

  if (!serviceClient) {
    serviceClient = await getServiceClient();
  }

  function waitForTokenCreation() {
    log("waiting for new Token");
    return new Promise((resolve, reject) => {
      const checking = setInterval(() => {
        log("waiting for new concurrency Token");
        if (!tokenCreationInProgress) {
          clearInterval(checking);
          resolve();
        }
      }, 3000);
    });
  }

  const createConcurrencyToken = async () => {
    try {
      log("creating new token");
      tokenCreationInProgress = true;
      const { concurrencyToken, channelId } = await serviceClient.getConcurrencyTokenAndChannelId();
      log("new token", concurrencyToken);
      tokenCreationInProgress = false;
      localConcurrencyToken = concurrencyToken;
      localChannelId = channelId;
    } catch (error) {
      log("create token error", error);
    }
  };

  const invokeAiService = async () => {
    try {
      serviceClient.setConcurrencyTokenAndChannelId(localConcurrencyToken, localChannelId);
      const response = await exampleService(a, b, serviceClient);
      log("response", response.getValue());
      res.send({ output: response.getValue() });
    } catch (error) {
      log("invoke AI service error", error);
      throw error;
    }
  };
  const recursion = async (shouldCreateNewToken = false) => {
    try {
      if (tokenCreationInProgress) await waitForTokenCreation();
      if (shouldCreateNewToken) await createConcurrencyToken();
      await invokeAiService();
    } catch (error) {
      let errorMessage = error.message.toLowerCase();
      if (
        errorMessage.includes(`Usage Exceeded on channel Id`.toLowerCase()) ||
        errorMessage.includes(
          "signed amount for token request cannot be greater than full amount in channel".toLowerCase()
        ) ||
        errorMessage.includes("signed amount for token request needs to be greater than last signed amount") ||
        errorMessage.includes("Insufficient funds in channel".toLowerCase())
      ) {
        try {
          await recursion(true);
        } finally {
          log("finally reinvoked the service");
        }
      } else if (errorMessage.includes("already known")) {
        log("reinvoking due to the blockchain error");
        tokenCreationInProgress = true;
        try {
          await recursion();
        } finally {
          log("finally reinvoked the service");
        }
      } else {
        res.status(500).send(error);
      }
    }
  };
  try {
    log("local concurrency token", localConcurrencyToken)
    await recursion(!Boolean(localConcurrencyToken));
  } catch (error) {
    log("parent recurssion", error);
  }
});

app.post("/styletransferai", async (req, res) => {
  const { content, style } = req.body;
  // try {
  //   // const response = await aiService(content, style);
  //   const response = await exampleService(1, 2);
  //   const outputImageData = response.getData();
  //   res.send({ base64Image: outputImageData });
  // } catch (error) {
  //   console.error("error", error);
  //   return res.status(500).send(error.message);
  // }
  const log = (...args) => {
    console.log("reqID: ", req.id, " ", ...args);
  };
  if (!serviceClient) {
    serviceClient = await getServiceClient();
  }

  function waitForTokenCreation() {
    log("waiting for new Token");
    return new Promise((resolve, reject) => {
      const checking = setInterval(() => {
        log("waiting for new concurrency Token");
        if (!tokenCreationInProgress) {
          clearInterval(checking);
          resolve();
        }
      }, 3000);
    });
  }

  const createConcurrencyToken = async () => {
    try {
      log("creating new token");
      tokenCreationInProgress = true;
      const { concurrencyToken, channelId } = await serviceClient.getConcurrencyTokenAndChannelId();
      log("new token", concurrencyToken);
      tokenCreationInProgress = false;
      localConcurrencyToken = concurrencyToken;
      localChannelId = channelId;
    } catch (error) {
      log("create token error", error);
    }
  };

  const invokeAiService = async () => {
    try {
      serviceClient.setConcurrencyTokenAndChannelId(localConcurrencyToken, localChannelId);
      const response = await aiService(content, style, serviceClient);
      log("response", response.getValue());
      res.send({ output: response.getValue() });
    } catch (error) {
      log("invoke AI service error", error);
      throw error;
    }
  };
  const run = async (shouldCreateNewToken = false) => {
    try {
      if (tokenCreationInProgress) await waitForTokenCreation();
      if (shouldCreateNewToken) await createConcurrencyToken();
      await invokeAiService();
    } catch (error) {
      let errorMessage = error.message.toLowerCase();
      if (
        errorMessage.includes(`Usage Exceeded on channel Id`.toLowerCase()) ||
        errorMessage.includes(
          "signed amount for token request cannot be greater than full amount in channel".toLowerCase()
        ) ||
        errorMessage.includes("signed amount for token request needs to be greater than last signed amount") ||
        errorMessage.includes("Insufficient funds in channel".toLowerCase())
      ) {
        try {
          await run(true);
        } finally {
          log("finally reinvoked the service");
        }
      } else if (errorMessage.includes("already known")) {
        log("reinvoking due to the blockchain error");
        tokenCreationInProgress = true;
        try {
          await run();
        } finally {
          log("finally reinvoked the service");
        }
      } else {
        res.status(500).send(error);
      }
    }
  };
  try {
    log("local concurrency token", localConcurrencyToken)
    await run(!Boolean(localConcurrencyToken));
  } catch (error) {
    log("parent recurssion", error);
  }
});
