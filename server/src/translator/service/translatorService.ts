import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { TranslateMessageRequest } from "../../dto/translatorDto";
import { openAIApiKey } from "../../server";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { TranslateMessageResponse } from "../../dto/translatorDto";

const placeholder = {
  languages: "languages",
  message: "message",
};

const systemTemplate = `You are a TranslatorSystem and your role
is to translate the messages in the best way as possible.
Translate the following message: {${placeholder.message}} 
into only those languages {${placeholder.languages}} 
and respond with a valid JSON containing two field: 
1 'message' with value {${placeholder.message}}  
2 'translations'with value an ARRAY with two field: the 'language' and the 'message' you translate it`;

export default class TranslatorService {
  async translate(req: TranslateMessageRequest) {
    const { languages, message } = req.body;

    const model = new ChatOpenAI({
      model: "gpt-4o-mini",
      temperature: 0,
      openAIApiKey: openAIApiKey,
    });

    const parser = new JsonOutputParser<TranslateMessageResponse>();

    const promptTemplate = ChatPromptTemplate.fromMessages([
      ["system", systemTemplate],
      ["user", `{${placeholder.message}}`],
    ]);

    const chain = promptTemplate.pipe(model).pipe(parser);

    return await chain.invoke({
      [placeholder.languages]: languages,
      [placeholder.message]: message,
    });
  }
}
