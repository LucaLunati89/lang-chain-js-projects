import { Request } from "express";

export type Language = "English" | "Spanish" | "Italian" | "French";

export type Message = string;

export type Transalation = {
  language: Language;
  message: Message;
};

export interface TranslateMessageRequest extends Request {
  message: Message;
  languages: Language[];
}

export interface TranslateMessageResponse {
  message: Message;
  translations: Transalation[];
}
