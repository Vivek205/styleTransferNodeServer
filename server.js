import express from "express";
import aiService from "./aiService";

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
  const { content, style } = req.body;
  try {
    const response = await aiService(content, style);
    const outputImageData = response.getData();
    res.send({ base64Image: outputImageData });
  } catch (error) {
    console.error("error", error);
    return res.status(500).send(error.message);
  }
});
