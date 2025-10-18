import { Response } from "express";

import { HTTP_STATUS, RESPONSE_MESSAGE } from "./constants";

interface ApiResponse<T> {
  status: number
  message: string
  data?: T
}

const sendResponse = <T>(
  res: Response,
  status: number,
  message: string,
  data?: T
): void => {
  const response: ApiResponse<T> = {
    status,
    message,
    ...(data !== undefined && { data })
  };
  res.status(status).json(response);
};

export const responseHandler = {
  success<T>(res: Response, data?: T): void {
    sendResponse(
      res, 
      HTTP_STATUS.OK, 
      RESPONSE_MESSAGE.SUCCESS,
      data
    );
  },

  forbidden(res: Response): void {
    sendResponse(
      res, 
      HTTP_STATUS.FORBIDDEN, 
      RESPONSE_MESSAGE.FORBIDDEN_CORS
    );
  },

  serverError(res: Response): void {
    sendResponse(
      res, 
      HTTP_STATUS.SERVER_ERROR, 
      RESPONSE_MESSAGE.SERVER_ERROR
    );
  }
};