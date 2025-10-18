import { ROUTE, MOCK_ORIGIN_DATA, MOCK_FORMAT_DATA } from "./fixtures/hotelInfoTestConfig"; 
import { describeServerErrorCases, describeSuccessCases } from "./fixtures/testStructures";

describe("HotelInfo API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe(`GET ${ROUTE.BASE}`, () => {
    describeSuccessCases(ROUTE.BASE, MOCK_ORIGIN_DATA, MOCK_FORMAT_DATA);
    describeServerErrorCases(ROUTE.BASE);
  });
});