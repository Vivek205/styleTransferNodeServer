/**
 * dotenv must be on the top of the entry file of the project
 */
import dotenv from "dotenv";
import SnetSDK, { DefaultPaymentStrategy } from "@vivek205/node-sdk-dev";
/**
 * 1: Update the import paths for service and message grpc stubs
 */
import service from "./grpc_stubs/example_service/example_service_grpc_pb";
import messages from "./grpc_stubs/example_service/example_service_pb";
import config from "./config";

dotenv.config();
const sdk = new SnetSDK(config);

const orgId = "6ce80f485dae487688c3a083688819bb";
const serviceId = "test_freecall";
const groupName = "default_group";
const paymentStrategy = new DefaultPaymentStrategy(300);
let tokenToMakeFreeCall = process.env.FREE_CALL_TOKEN ? process.env.FREE_CALL_TOKEN.toUpperCase() : "";
tokenToMakeFreeCall = Boolean(tokenToMakeFreeCall)
  ? tokenToMakeFreeCall.startsWith("0X")
    ? tokenToMakeFreeCall
    : `0X${tokenToMakeFreeCall}`
  : "";
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

export const getServiceClient = async () => {
  try {
    const serviceClient = await sdk.createServiceClient(
      orgId,
      serviceId,
      service.CalculatorClient,
      groupName,
      paymentStrategy,
      serviceClientOptions
    );
    return serviceClient;
  } catch (error) {
    console.log("service client create error", error);
  }
};

const exampleService = async (numA, numB, serviceClientWithToken) => {
  console.log("service is invoked");
  let serviceClient = serviceClientWithToken;
  try {
    if (!serviceClient) {
      serviceClient = await getServiceClient();
    }
    /**
     * 2: Initialize the request object and the set the required input values
     */
    const request = new messages.Numbers();
    request.setA(numA);
    request.setB(numB);
    console.log("created request");
    return new Promise((resolve, reject) => {
      /**
       * 3: Change the method name according to your service
       */
      serviceClient.service.div(request, (err, result) => {
        console.log("service call error", err);
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  } catch (error) {
    console.log("promise error", error);
    throw error;
  }
};
export default exampleService;
