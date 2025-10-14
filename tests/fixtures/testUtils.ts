import request, { Response } from "supertest";

import app from "../../src/app";
import { CONTENT_TYPE, HTTP_STATUS, RESPONSE_MESSAGE  } from "../../src/common/constants";
import { isTypeString } from "../../src/common/utils";

export interface RouteTestCase {
  route: string;
  formattedData: object[];
}

export const createRequest = {
  get: (
    route: string,
    status: number,
    isExpectJson: boolean = true
  ): request.Test => {
    const contentType = isExpectJson ? CONTENT_TYPE.JSON_WITH_CHARSET : CONTENT_TYPE.TEXT_WITH_CHARSET;
    return request(app)
      .get(route)
      .expect("Content-Type", contentType)
      .expect(status);
  }
};

export const expectResponse = {
  success: (response: Response, data: string | object): void => {
    if (isTypeString(data)) {
      expect(response.text).toBe(data);
    } else {
      expect(response.body).toEqual({
        status: HTTP_STATUS.OK,
        message: RESPONSE_MESSAGE.SUCCESS,
        data: data
      });
    }
  },

  error: (response: Response): void => {
    expect(response.body).toEqual({
      status: HTTP_STATUS.SERVER_ERROR,
      message: RESPONSE_MESSAGE.SERVER_ERROR
    });
  }
};