import express from "express";
import SnetSDK, { DefaultPaymentStrategy } from "@vivek205/node-sdk-dev";
import service from "./grpc_stubs/style_transfer/style_transfer_grpc_pb";
import messages from "./grpc_stubs/style_transfer/style_transfer_pb";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => { 
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/styletransferai", async (req, res) => {
  console.log("request", req.body);
  const {
    privateKey,
    networkId,
    web3Provider,
    content,
    style,
    contentSize = 640,
    styleSize = 640,
    preserveColor = false,
    alpha = 1.0,
    crop = false,
    saveExt = "",
    tokenToMakeFreeCall,
    tokenExpirationBlock,
    email,
  } = req.body;
  console.log("received request");
  const config = {
    web3Provider,
    privateKey,
    signerPrivateKey: privateKey,
    networkId,
    ipfsEndpoint: "http://ipfs.singularitynet.io:80",
    defaultGasPrice: "4700000",
    defaultGasLimit: "210000",
  };

  const orgId = "snet";
  const serviceId = "style-transfer";
  const groupName = "default_group";
  const paymentStrategy = new DefaultPaymentStrategy(2);
  const serviceClientOptions = {
    tokenToMakeFreeCall: tokenToMakeFreeCall.toUpperCase(),
    tokenExpirationBlock,
    email,
    disableBlockchainOperations: false,
    concurrency: true,
  };
  
  console.log("setup config values");

  let outputImageData;
  try {
    const sdk = new SnetSDK(config);
    console.log("initialized sdk");

    const serviceClient = await sdk.createServiceClient(
      orgId,
      serviceId,
      service.StyleTransferClient,
      groupName,
      paymentStrategy,
      serviceClientOptions
    );
    console.log("created service client");
    
    const response = await new Promise((resolve, reject) => {
      const request = new messages.TransferImageStyleRequest();
      request.setContent(content);
      request.setStyle(style);
      request.setContentsize(contentSize);
      request.setStylesize(styleSize);
      request.setPreservecolor(preserveColor);
      request.setAlpha(alpha);
      request.setCrop(crop);
      request.setSaveext(saveExt);

      serviceClient.service.transfer_image_style(request, (err, result) => {
        if (err) {
            console.log("service client errro", err.message);
          return reject(err);
        }
        // console.log("result image", result.getData());
        resolve(result);
      });
    });
    outputImageData = response.getData();
  } catch (error) {
    console.error("error", error);
    return res.status(500).send(error.message)
  }
  const outputImage = Buffer.from(outputImageData, 'base64');
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': outputImage.length
  });
  res.end(outputImage)
});
