import express, { Express, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/routes";

dotenv.config();
const app: Express = express();

export const openAIApiKey = process.env.OPENAI_API_KEY;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri: string = process.env.MONGODB_URI || "mongodb://localhost27017/llm";

(async () => {
  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.error(error);
  }
})();

app.use("/langchain-js", router);

const PORT: string | number = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
