import axios from "axios";
import { format } from "date-fns";
import { Request, Response } from "express";

import { responseHandler } from "../common/response";
import { OriginBase, isNullOrEmpty, setFunctionName } from "../common/utils";
import { setLog, LogLevel, LogMessage } from "../core/logger";

import * as baseController from "./base.controller";

interface OriginTouristSpots extends OriginBase {
  Opentime: string;
  Changetime: string;
  Travellinginfo: string;
  Ticketinfo: string;
  Toldescribe: string;
}

export interface FormatTouristSpots {
  Id: number
  Add: string
  Name: string
  Tel: string
  OpenTime: string
  TicketInfo: string
  TravellingInfo: string
  Website: string
  Description: string
  Pictures: string[]
  ChangeTime: string
}

export const getTouristSpots = setFunctionName(
  async(request: Request, response: Response): Promise<void> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      await axios.get(process.env.TOURISTSPOTS_URL!)
        .then(result => {
          const rawData = result.data.XML_Head.Infos.Info;
          const responseData = baseController.filterByRegionAndTown<OriginTouristSpots>(rawData, request);

          const data: FormatTouristSpots[] = responseData
            .sort(sortCondition)
            .map((item: OriginTouristSpots, index: number) => 
            {
              const address = baseController.getValidAddress(item.Add, item.Region, item.Town);
              const telephone = baseController.getDisplayTel(item.Tel);
              const openTime = baseController.getDisplayOpenTime(item.Opentime);
              const ticketInfo = isNullOrEmpty(item.Ticketinfo) ? "無" : item.Ticketinfo;
              const pictures = baseController.getValidPictures(item.Picture1, item.Picture2, item.Picture3);

              return {
                Id: index + 1,
                Add: address,
                Name: item.Name,
                Tel: telephone,
                OpenTime: openTime,
                TicketInfo: ticketInfo,
                TravellingInfo: item.Travellinginfo,
                Website: item.Website,
                Description: item.Toldescribe,
                Pictures: pictures,
                ChangeTime: format(item.Changetime, "yyyy-MM-dd")
              };
            });
          setLog(LogLevel.INFO, LogMessage.SUCCESS, getTouristSpots.name);
          responseHandler.success(response, data);
        })
        .catch(error => {
          baseController.errorHandler(response, error, getTouristSpots.name);
        });
    } catch (error) {
      baseController.errorHandler(response, error, getTouristSpots.name);
    }
  },
  "getTouristSpots"
);

const sortCondition = (x: OriginTouristSpots, y: OriginTouristSpots): number => {
  const date1 = isNullOrEmpty(x.Changetime) ? "0001-01-01" : format(x.Changetime, "yyyy-MM-dd");
  const date2 = isNullOrEmpty(y.Changetime) ? "0001-01-01" : format(y.Changetime, "yyyy-MM-dd");

  if (date1 > date2) return -1;
  if (date1 < date2) return 1;

  if (isNullOrEmpty(x.Picture1) && !isNullOrEmpty(y.Picture1)) return 1;
  if (!isNullOrEmpty(x.Picture1) && isNullOrEmpty(y.Picture1)) return -1;

  if (isNullOrEmpty(x.Travellinginfo) && !isNullOrEmpty(y.Travellinginfo)) return 1;
  if (!isNullOrEmpty(x.Travellinginfo) && isNullOrEmpty(y.Travellinginfo)) return -1;

  if (isNullOrEmpty(x.Website) && !isNullOrEmpty(y.Website)) return 1;
  if (!isNullOrEmpty(x.Website) && isNullOrEmpty(y.Website)) return -1;

  return 0;
};