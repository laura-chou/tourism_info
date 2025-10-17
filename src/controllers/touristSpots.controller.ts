import axios from "axios";
import { format } from "date-fns";
import { Request, Response } from "express";

import { responseHandler } from "../common/response";
import { ProcessedInfo, OriginPlaceBase, isNullOrEmpty, ReplaceValue, setFunctionName } from "../common/utils";
import { setLog, LogLevel, LogMessage } from "../core/logger";

import * as baseController from "./base.controller";

interface OriginTouristSpots extends OriginPlaceBase {
  Changetime: string;
  Travellinginfo: string;
  Ticketinfo: string;
  Toldescribe: string;
}

export const getTouristSpots = setFunctionName(
  async(request: Request, response: Response): Promise<void> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      await axios.get(process.env.TOURISTSPOTS_URL!)
        .then(result => {
          let responseData = result.data.XML_Head.Infos.Info;
          if ("town" in request.params && "region" in request.params) {
            responseData = responseData.filter((item: OriginTouristSpots) =>
              item.Region === request.params.region &&
              item.Town === request.params.town
            );
          }

          responseData.forEach((item: ProcessedInfo) => {
            ReplaceValue(item);
            if (isNullOrEmpty(item.Ticketinfo)) item.Ticketinfo = "無";
            if (isNullOrEmpty(item.Opentime)) item.Opentime = "無";
          });

          const data: ProcessedInfo[] = responseData
            .sort(sortCondition)
            .map((item: ProcessedInfo, index: number) => 
            {
              return {
                Id: index + 1,
                Add: item.Add,
                Name: item.Name,
                Tel: item.Tel,
                Opentime: item.Opentime,
                Ticketinfo: item.Ticketinfo,
                Travellinginfo: item.Travellinginfo,
                Website: item.Website,
                Toldescribe: item.Toldescribe,
                Pictures: item.Pictures
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
  let val = 0;
  const date1 = isNullOrEmpty(x.Changetime) ? "0001-01-01" : format(x.Changetime, "yyyy-MM-dd");
  const date2 = isNullOrEmpty(y.Changetime) ? "0001-01-01" : format(y.Changetime, "yyyy-MM-dd");
  if (date1 > date2) val = -1;
  if (date1 < date2) val = 1;
  if (isNullOrEmpty(x.Picture1)) val = 1;
  if (isNullOrEmpty(y.Picture1)) val = -1;
  if (isNullOrEmpty(x.Travellinginfo)) val = 1;
  if (isNullOrEmpty(y.Travellinginfo)) val = -1;
  if (isNullOrEmpty(x.Website)) val = 1;
  if (isNullOrEmpty(y.Website)) val = -1;
  return val;
};