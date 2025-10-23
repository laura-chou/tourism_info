import axios from "axios";
import { Request, Response } from "express";

import { responseHandler } from "../common/response";
import { OriginBase, setFunctionName } from "../common/utils";
import { setLog, LogLevel, LogMessage } from "../core/logger";

import * as baseController from "./base.controller";

interface OriginFoodInfo extends OriginBase {
  Opentime: string;
}

export interface FormatFoodInfo {
  Id: number
  Add: string
  Name: string
  Tel: string
  OpenTime: string
  Website: string
  Description: string
  Pictures: string[]
}

export const getFoodInfo = setFunctionName(
  async(request: Request, response: Response): Promise<void> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      await axios.get(process.env.FOODINFO_URL!)
        .then(result => {
          const rawData = result.data.XML_Head.Infos.Info;
          const responseData = baseController.filterByRegionAndTown<OriginFoodInfo>(rawData, request);

          const data: FormatFoodInfo[] = responseData
            .sort(baseController.sortByPictureAndWebsite)
            .map((item: OriginFoodInfo, index: number) => 
              {
                const address = baseController.getValidAddress(item.Add, item.Region, item.Town);
                const telephone = baseController.getDisplayValue(item.Tel);
                const openTime = baseController.getDisplayValue(item.Opentime);
                const pictures = baseController.getValidPictures(item.Picture1, item.Picture2, item.Picture3);

                return {
                  Id: index + 1,
                  Add: address,
                  Name: item.Name,
                  Tel: telephone,
                  OpenTime: openTime,
                  Website: item.Website,
                  Description: item.Description,
                  Pictures: pictures
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