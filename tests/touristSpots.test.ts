import { describeServerErrorCases, describeSuccessCases } from "./fixtures/testStructures";
import { ROUTE, MOCK_ORIGIN_DATA, MOCK_FORMAT_DATA } from "./fixtures/touristSpotsTestConfig"; 


describe("TouristSpots API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe(`GET ${ROUTE.BASE}`, () => {
    describeSuccessCases(ROUTE.BASE, MOCK_ORIGIN_DATA, MOCK_FORMAT_DATA);
    describeServerErrorCases(ROUTE.BASE);
  });
});
