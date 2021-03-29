
import aiService from "./aiService";

const main = async () => {
  /**
   * 4: Parse the proto get the output in the desired format
   */
  const response = await aiService();
  const outputImage = response.getData();
  require("fs").writeFile("out.png", outputImage, "base64", function (err) {
    console.log(err);
  });
};

main();

