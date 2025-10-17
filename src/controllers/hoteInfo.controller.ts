import axios from "axios";
import { Request, Response } from "express";

import { responseHandler } from "../common/response";
import { ProcessedInfo, OriginPlaceBase, isNullOrEmpty, ReplaceValue, setFunctionName } from "../common/utils";
import { setLog, LogLevel, LogMessage } from "../core/logger";

import * as baseController from "./base.controller";

interface OriginHotelInfo extends OriginPlaceBase {
  Serviceinfo: string;
}

export const getHotelInfo = setFunctionName(
  async(request: Request, response: Response): Promise<void> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      await axios.get(process.env.HOTELINFO_URL!)
        .then(result => {
          let responseData = result.data.XML_Head.Infos.Info;
          if ("town" in request.params && "region" in request.params) {
            responseData = responseData.filter((item: OriginHotelInfo) =>
              item.Region === request.params.region &&
              item.Town === request.params.town
            );
          }

          responseData = responseData.map((item: ProcessedInfo) => {
            const replaced = ReplaceValue(item);
            if (!isNullOrEmpty(replaced.Serviceinfo)) {
              replaced.Serviceinfos = replaced.Serviceinfo.split(",").filter(el => el);
            }
            if (!isNullOrEmpty(replaced.Description) && replaced.Description.length === 1) {
              replaced.Description = "";
            }
            return replaced;
          });

          const data: ProcessedInfo[] = responseData
            .sort(sortCondition)
            .map((item: ProcessedInfo, index: number) => ({
              Id: index + 1,
              Add: item.Add,
              Name: item.Name,
              Tel: item.Tel,
              Website: item.Website,
              Serviceinfos: item.Serviceinfos,
              Description: item.Description,
              Pictures: item.Pictures
            }));
          setLog(LogLevel.INFO, LogMessage.SUCCESS, getHotelInfo.name);
          responseHandler.success(response, data);
        })
        .catch(error => {
          baseController.errorHandler(response, error, getHotelInfo.name);
        });
    } catch (error) {
      baseController.errorHandler(response, error, getHotelInfo.name);
    }
  },
  "getHotelInfo"
);

const sortCondition = (x: OriginHotelInfo, y: OriginHotelInfo): number => {
  if (isNullOrEmpty(x.Picture1)) return 1;
  if (isNullOrEmpty(y.Picture1)) return -1;
  if (isNullOrEmpty(x.Website)) return 1;
  if (isNullOrEmpty(y.Website)) return -1;
  return 0;
};