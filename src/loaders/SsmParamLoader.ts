// import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

// /** Service which fetches an SSM param and loads the properties into environment variables.
//  * Designed to be a cheap, secure way to load sensitive environment vars into Lambda functions.
//  */
// export default class SsmParamLoader {
//   constructor(protected client: SSMClient) {}

//   /** Fetch SSM param and load each property into env vars. */
//   public async loadToEnv(ssmParamName: string) {
//     const paramValue = await this.getSsmParam(ssmParamName);

//     const config = JSON.parse(paramValue);
//     this.loadIntoEnv(config);
//   }

//   private async getSsmParam(ssmParamName: string) {
//     const command = new GetParameterCommand({
//       Name: ssmParamName,
//       WithDecryption: true,
//     });
//     const response = await this.client.send(command);

//     if (!response.Parameter || !response.Parameter.Value) {
//       throw new Error("Invalid SSM Parameter");
//     }

//     return response.Parameter.Value;
//   }

//   /** Load each key-value pair into env vars */
//   private loadIntoEnv(config: object) {
//     for (const [key, value] of Object.entries(config)) {
//       process.env[key] = value;
//     }
//   }
// }

export default "TODO_DELETE_OR_REFACTOR";
