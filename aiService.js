
/**
* dotenv must be on the top of the entry file of the project
*/
import dotenv from "dotenv";
import SnetSDK, { DefaultPaymentStrategy } from "snet-sdk";
/**
 * 1: Update the import paths for service and message grpc stubs
 */
import service from "./grpc_stubs/style_transfer/style_transfer_grpc_pb";
import messages from "./grpc_stubs/style_transfer/style_transfer_pb";
import config from "./config";

dotenv.config();
const sdk = new SnetSDK(config);

const aiService = async () => {
  const orgId = "snet";
  const serviceId = "style-transfer";
  const groupName = "default_group";
  const paymentStrategy = new DefaultPaymentStrategy(2);
  let tokenToMakeFreeCall = process.env.FREE_CALL_TOKEN ? process.env.FREE_CALL_TOKEN.toUpperCase() : "";
  tokenToMakeFreeCall = Boolean(tokenToMakeFreeCall) ? (tokenToMakeFreeCall.startsWith("0X") ? tokenToMakeFreeCall : `0X${tokenToMakeFreeCall}`) : "";
  const serviceClientOptions = {
    tokenToMakeFreeCall,
    tokenExpirationBlock: process.env.TOKEN_EXPIRATION_BLOCK,
    email: process.env.EMAIL,
    disableBlockchainOperations: false,
    concurrency: true,
  };

  const closeConnection = () => {
    sdk.web3.currentProvider.connection && sdk.web3.currentProvider.connection.close();
  };

  try {
    const serviceClient = await sdk.createServiceClient(
        orgId,
        serviceId,
        service.StyleTransferClient,
        groupName,
        paymentStrategy,
        serviceClientOptions
      );
      console.log("created service client");
      /**
       * 2: Initialize the request object and the set the required input values
       */
      const request = new messages.TransferImageStyleRequest();
      request.setContent("https://cdn.analyticsvidhya.com/wp-content/uploads/2020/04/featured_image-1.jpg");
      request.setStyle("https://miro.medium.com/max/5000/1*1BUIofZgqVuR6nj8LbrRtQ.jpeg");
      request.setContentsize(640);
      request.setStylesize(640);
      request.setPreservecolor(false);
      request.setAlpha(1);
      request.setCrop(false);
      request.setSaveext("");
      
      return new  Promise((resolve, reject)=> {
        /**
       * 3: Change the method name according to your service 
       */
        serviceClient.service.transfer_image_style(request, (err, result) => {
            if (err) {
              return reject(err);
            }
            resolve(result);
          });
      })

  } catch (error) {
    console.log("promise error", error);
    closeConnection();
  }
};
export default aiService;

