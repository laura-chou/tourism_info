import axios from "axios";
import { Request, Response } from "express";

import { responseHandler } from "../common/response";
import { OriginBase, setFunctionName } from "../common/utils";
import { setLog, LogLevel, LogMessage } from "../core/logger";

import * as baseController from "./base.controller";

interface OriginHotelInfo extends OriginBase {
  Serviceinfo: string;
}

export interface FormatHotelInfo {
  Id: number
  Add: string
  Name: string
  Tel: string
  Website: string
  ServiceInfo: string[]
  Description: string
  Pictures: string[]
}

export const getHotelInfo = setFunctionName(
  async(request: Request, response: Response): Promise<void> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      await axios.get(process.env.HOTELINFO_URL!)
        .then(result => {
          const rawData = result.data.XML_Head.Infos.Info;
          const responseData = baseController.filterByRegionAndTown<OriginHotelInfo>(rawData, request);

          const data: FormatHotelInfo[] = responseData
            .sort(baseController.sortByPictureAndWebsite)
            .map((item: OriginHotelInfo, index: number) => 
              {
                const address = baseController.getValidAddress(item.Add, item.Region, item.Town);
                const telephone = baseController.getDisplayTel(item.Tel);
                const serviceInfo = item.Serviceinfo.split(",").filter(ele => ele);
                const pictures = baseController.getValidPictures(item.Picture1, item.Picture2, item.Picture3);

                return { 
                  Id: index + 1,
                  Add: address,
                  Name: item.Name,
                  Tel: telephone,
                  Website: item.Website,
                  ServiceInfo: serviceInfo,
                  Description: item.Description,
                  Pictures: pictures
                };
              });
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