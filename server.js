import express from "express";
import aiService, {getServiceClient as getStyleServiceClient} from "./aiService";
import exampleService, { getServiceClient as getExampleServiceClient } from "./exampleService";
import addRequestId from "express-request-id";
import cors from "cors";

let exampleServiceConcurrencyToken = "";
let exampleServiceChannelId = "";
let exampleServiceTokenCreationInProgress = false;
let exampleServiceClient;

let styleServiceConcurrencyToken = ""
let styleServiceChannelId = ""
let styleServiceTokenCreationInProgress = false
let styleServiceClient;

const app = express();
const port = 3000;

app.use(express.json());
app.use(addRequestId());
app.use(cors())

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

  if (!exampleServiceClient) {
    exampleServiceClient = await getExampleServiceClient();
  }

  function waitForTokenCreation() {
    log("waiting for new Token");
    return new Promise((resolve, reject) => {
      const checking = setInterval(() => {
        log("waiting for new concurrency Token");
        if (!exampleServiceTokenCreationInProgress) {
          clearInterval(checking);
          resolve();
        }
      }, 3000);
    });
  }

  const createConcurrencyToken = async () => {
    try {
      log("creating new token");
      exampleServiceTokenCreationInProgress = true;
      const { concurrencyToken, channelId } = await exampleServiceClient.getConcurrencyTokenAndChannelId();
      log("new token", concurrencyToken);
      exampleServiceTokenCreationInProgress = false;
      exampleServiceConcurrencyToken = concurrencyToken;
      exampleServiceChannelId = channelId;
    } catch (error) {
      log("create token error", error);
    }
  };

  const invokeAiService = async () => {
    try {
      exampleServiceClient.setConcurrencyTokenAndChannelId(exampleServiceConcurrencyToken, exampleServiceChannelId);
      const response = await exampleService(a, b, exampleServiceClient);
      log("response", response.getValue());
      res.send({ output: response.getValue() });
    } catch (error) {
      log("invoke AI service error", error);
      throw error;
    }
  };
  const recursion = async (shouldCreateNewToken = false) => {
    try {
      if (exampleServiceTokenCreationInProgress) await waitForTokenCreation();
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
        exampleServiceTokenCreationInProgress = true;
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
    log("local concurrency token", exampleServiceConcurrencyToken);
    await recursion(!Boolean(exampleServiceConcurrencyToken));
  } catch (error) {
    log("parent recurssion", error);
  }
});

app.post("/styletransfer", async (req, res) => {
  const { content, style } = req.body;
  const log = (...args) => {
    console.log("reqID: ", req.id, " ", ...args);
  };
  if (!styleServiceClient) {
    styleServiceClient = await getStyleServiceClient();
  }

  function waitForTokenCreation() {
    log("waiting for new Token");
    return new Promise((resolve, reject) => {
      const checking = setInterval(() => {
        log("waiting for new concurrency Token");
        if (!styleServiceTokenCreationInProgress) {
          clearInterval(checking);
          resolve();
        }
      }, 3000);
    });
  }

  const createConcurrencyToken = async () => {
    try {
      log("creating new token");
      styleServiceTokenCreationInProgress = true;
      const { concurrencyToken, channelId } = await styleServiceClient.getConcurrencyTokenAndChannelId();
      log("new token", concurrencyToken);
      styleServiceTokenCreationInProgress = false;
      styleServiceConcurrencyToken = concurrencyToken;
      styleServiceChannelId = channelId;
    } catch (error) {
      log("create token error", error);
    }
  };

  const invokeAiService = async () => {
    try {
      styleServiceClient.setConcurrencyTokenAndChannelId(styleServiceConcurrencyToken, styleServiceChannelId);
      const response = await aiService(content, style, styleServiceClient);
      const outputImageData = response.getData();
      res.send({ base64Image: outputImageData });
    } catch (error) {
      log("invoke AI service error", error);
      throw error;
    }
  };
  const run = async (shouldCreateNewToken = false) => {
    try {
      if (styleServiceTokenCreationInProgress) await waitForTokenCreation();
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
        styleServiceTokenCreationInProgress = true;
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
    log("local concurrency token", styleServiceConcurrencyToken);
    await run(!Boolean(styleServiceConcurrencyToken));
  } catch (error) {
    log("parent recurssion", error);
  }
});