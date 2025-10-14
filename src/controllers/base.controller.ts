import { Response } from "express";

import { responseHandler } from "../common/response";
import { LogLevel, LogMessage, setLog } from "../core/logger";

export const errorHandler = (
  response: Response,
  error: unknown,
  functionName: string
): void => {
  setLog(
    LogLevel.ERROR,
    error instanceof Error ? error.message : LogMessage.ERROR.UNKNOWN,
    functionName);
  responseHandler.serverError(response);
};