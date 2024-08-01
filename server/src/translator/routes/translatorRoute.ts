import express, { Router } from "express";
import { TranslateMessageRequest } from "../../dto/translatorDto";
import TranslatorController from "../controller/translatorController";
const translatorRouter: Router = express.Router();
const translatorController = new TranslatorController();

translatorRouter.post("/translate", (req, res) =>
  translatorController.translate(req as TranslateMessageRequest, res)
);

export default translatorRouter;
