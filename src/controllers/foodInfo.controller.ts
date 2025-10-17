import axios from "axios";
import { Request, Response } from "express";

import { responseHandler } from "../common/response";
import { ProcessedInfo, OriginPlaceBase, isNullOrEmpty, ReplaceValue, setFunctionName } from "../common/utils";
import { setLog, LogLevel, LogMessage } from "../core/logger";

import * as baseController from "./base.controller";

interface OriginFoodInfo extends OriginPlaceBase {
  Opentime?: string;
}

export const getFoodInfo = setFunctionName(
  async(request: Request, response: Response): Promise<void> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await axios.get(process.env.FOODINFO_URL!)
      .then(result => {
        let responseData = result.data.XML_Head.Infos.Info;
        if ("town" in request.params && "region" in request.params) {
          responseData = responseData.filter((item: OriginFoodInfo) =>
            item.Region === request.params.region &&
            item.Town === request.params.town
          );
        }

        responseData.forEach((item: ProcessedInfo) => {
          ReplaceValue(item);
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
              Website: item.Website,
              Description: item.Description,
              Pictures: item.Pictures
            };
          });
        setLog(LogLevel.INFO, LogMessage.SUCCESS, getFoodInfo.name);
        responseHandler.success(response, data);
      })
      .catch(error => {
        baseController.errorHandler(response, error, getFoodInfo.name);
      });
    } catch (error) {
      baseController.errorHandler(response, error, getFoodInfo.name);
    }
  },
  "getFoodInfo"
);

const sortCondition = (x: OriginFoodInfo, y: OriginFoodInfo): number => {
  if (isNullOrEmpty(x.Picture1)) return 1;
  if (isNullOrEmpty(y.Picture1)) return -1;
  if (isNullOrEmpty(x.Website)) return 1;
  if (isNullOrEmpty(y.Website)) return -1;
  return 0;
};