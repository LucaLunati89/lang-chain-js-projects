import { Response } from "express";
import { TranslateMessageRequest } from "../../dto/translatorDto";
import TranslatorService from "../service/translatorService";

export default class TranslatorController {
  private translatorService: TranslatorService;
  constructor() {
    this.translatorService = new TranslatorService();
  }

  async translate(req: TranslateMessageRequest, res: Response) {
    try {
      console.log(req);
      const response = await this.translatorService.translate(req);
      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
