import { handler } from "./index-api-lambda";
import { ALBEvent, Context } from "aws-lambda";

const event: ALBEvent = {
  requestContext: {
    elb: {
      targetGroupArn:
        "arn:aws:elasticloadbalancing:us-east-1:123456789012:targetgroup/lambda-279XGJDqGZ5rsrHC2Fjr/49e9d65c45c6791a",
    },
  },
  httpMethod: "GET",
  path: "/ai/api/status/info",
  queryStringParameters: {
    query: "1234ABCD",
  },
  headers: {
    accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    "accept-encoding": "gzip",
    "accept-language": "en-US,en;q=0.9",
    connection: "keep-alive",
    host: "lambda-alb-123578498.us-east-1.elb.amazonaws.com",
    "upgrade-insecure-requests": "1",
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36",
    "x-amzn-trace-id": "Root=1-5c536348-3d683b8b04734faae651f476",
    "x-forwarded-for": "72.12.164.125",
    "x-forwarded-port": "80",
    "x-forwarded-proto": "http",
    "x-imforwards": "20",
  },
  body: "",
  isBase64Encoded: false,
};

const context: Context = {
  callbackWaitsForEmptyEventLoop: false,
  functionName: "",
  functionVersion: "",
  invokedFunctionArn: "",
  memoryLimitInMB: "",
  awsRequestId: "",
  logGroupName: "",
  logStreamName: "",
  getRemainingTimeInMillis: () => 1000,
  done: (_error?: Error | undefined, _result?: any) => {},
  fail: () => {
    throw new Error("Function not implemented.");
  },
  succeed: () => {},
};

const invoke = async () => {
  const res = await handler(event, context);
  console.log("res", res);
};

console.log("test");
invoke();
