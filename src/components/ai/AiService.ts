import { injectable } from "tsyringe";
import winston from "winston";
import { CreatePunParams, CreatePunResponse } from "../../types";
import { ConfigOptions } from "../../config";
import LoggerProvider from "../../utils/LoggerProvider";

@injectable()
export default class AiService {
  private logger: winston.Logger;

  constructor(
    protected loggerProvider: LoggerProvider,
    protected config: ConfigOptions
  ) {
    this.logger = loggerProvider.provide("AiService");
  }

  public async createPun(params: CreatePunParams) {
    const { prompt } = params;
    this.logger.info("createPun", { prompt });

    const response: CreatePunResponse = {
      content: "Open the pod bay doors, HAL",
    };

    // const chatCompletion = await this.openai.chat.completions.create({
    //   messages: [
    //     {
    //       role: "user",
    //       content: `Create a pun based on the following words: ${prompt}`,
    //     },
    //   ],
    //   model: "gpt-3.5-turbo",
    // });

    // const response: CreatePunResponse = {
    //   content: chatCompletion.choices[0].message.content || "",
    // };

    return response;
  }
}
