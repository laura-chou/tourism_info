import axios, { AxiosResponse } from "axios";

import { HTTP_STATUS } from "../src/common/constants";

import { ROUTE, MOCK_ORIGIN_DATA, MOCK_FORMAT_DATA } from "./fixtures/foodInfoTestConfig"; 
import { createRequest, expectResponse } from "./fixtures/testUtils";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("FoodInfo API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe(`GET ${ROUTE.BASE}`, () => {
    describe("Success Cases", () => {
      test("should return formatted data when API call is successful", async() => {
        const mockedResponse: AxiosResponse = {
          data: MOCK_ORIGIN_DATA,
          status: 200,
          statusText: "OK",
          headers: {},
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          config: {} as any,
        };
        mockedAxios.get.mockResolvedValue(mockedResponse);
        const response = await createRequest.get(ROUTE.BASE, HTTP_STATUS.OK);
        expectResponse.success(response, MOCK_FORMAT_DATA);
      });
    });

    describe("Server Error Cases", () => {
      test("should return 500 when axios call fails", async() => {
        mockedAxios.get.mockRejectedValue(new Error("API Error"));
        const response = await createRequest.get(ROUTE.BASE, HTTP_STATUS.SERVER_ERROR);
        expectResponse.error(response);
      });

      test("should return 500 for unexpected server errors", async() => {
        mockedAxios.get.mockImplementation(() => {
          throw new Error("Unexpected Error");
        });

        const response = await createRequest.get(ROUTE.BASE, HTTP_STATUS.SERVER_ERROR);
        expectResponse.error(response);
      });
    });
  });
});