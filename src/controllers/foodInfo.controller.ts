import axios from "axios";
import { Request, Response } from "express";

import { responseHandler } from "../common/response";
import { isNullOrEmpty, ReplaceValue, setFunctionName } from "../common/utils";
import { setLog, LogLevel, LogMessage } from "../core/logger";

import * as baseController from "./base.controller";

interface OriginFoodItem {
  Region: string
  Town: string
  Add?: string
  Name: string
  Tel?: string
  Opentime?: string
  Website?: string
  Description?: string
  Picture1?: string
  Picture2?: string
  Picture3?: string
}

export interface ProcessedFoodItem {
  Id: number
  Add: string
  Region: string
  Town: string
  Name: string
  Tel: string
  Opentime: string
  Website?: string
  Description?: string
  Picture1?: string
  Picture2?: string
  Picture3?: string
  Pictures: string[]
}

export const getFoodInfo = setFunctionName(
  async(request: Request, response: Response): Promise<void> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await axios.get(process.env.FOODINFO_URL!)
      .then(result => {
        let responseData = result.data.XML_Head.Infos.Info;
        if ("town" in request.params && "region" in request.params) {
          responseData = responseData.filter((item: OriginFoodItem) =>
            item.Region === request.params.region &&
            item.Town === request.params.town
          );
        }

        responseData.forEach((item: ProcessedFoodItem) => {
          ReplaceValue(item);
          if (isNullOrEmpty(item.Opentime)) item.Opentime = "無";
        });

        const data: ProcessedFoodItem[] = responseData
          .sort(sortCondition)
          .map((item: ProcessedFoodItem, index: number) => 
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

const sortCondition = (x: OriginFoodItem, y: OriginFoodItem): number => {
  if (isNullOrEmpty(x.Picture1)) return 1;
  if (isNullOrEmpty(y.Picture1)) return -1;
  if (isNullOrEmpty(x.Website)) return 1;
  if (isNullOrEmpty(y.Website)) return -1;
  return 0;
};