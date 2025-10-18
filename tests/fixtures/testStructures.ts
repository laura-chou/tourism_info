import axios, { AxiosResponse } from "axios";

import { HTTP_STATUS } from "../../src/common/constants";

import { createRequest, expectResponse } from "./testUtils";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

export const describeSuccessCases = (
  route: string,
  mockOriginData: object,
  mockFormatData: object
): void => {
  describe("Success Cases", () => {
    test("should return formatted data when API call is successful", async() => {
      const mockedResponse: AxiosResponse = {
        data: mockOriginData,
        status: 200,
        statusText: "OK",
        headers: {},
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        config: {} as any,
      };
      mockedAxios.get.mockResolvedValue(mockedResponse);
      const response = await createRequest.get(route, HTTP_STATUS.OK);
      expectResponse.success(response, mockFormatData);
    });
  });
};

export const describeServerErrorCases = (
  route: string
): void => {
  describe("Server Error Cases", () => {
    test("should return 500 when axios call fails", async() => {
      mockedAxios.get.mockRejectedValue(new Error("API Error"));
      const response = await createRequest.get(route, HTTP_STATUS.SERVER_ERROR);
      expectResponse.error(response);
    });

    test("should return 500 for unexpected server errors", async() => {
      mockedAxios.get.mockImplementation(() => {
        throw new Error("Unexpected Error");
      });
      const response = await createRequest.get(route, HTTP_STATUS.SERVER_ERROR);
      expectResponse.error(response);
    });
  });
};