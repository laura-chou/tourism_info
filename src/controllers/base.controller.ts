import { Response, Request } from "express";

import { responseHandler } from "../common/response";
import { isNullOrEmpty } from "../common/utils";
import { LogLevel, LogMessage, setLog } from "../core/logger";

interface HasPictureAndWebsite {
  Picture1?: string;
  Website?: string;
}

export const errorHandler = (
  response: Response,
  error: unknown,
  functionName: string
): void => {
  setLog(
    LogLevel.ERROR,
    error instanceof Error ? error.message : LogMessage.ERROR.UNKNOWN,
    functionName);
  responseHandler.serverError(response);
};

export const filterByRegionAndTown = <T extends { Region: string; Town: string }> (
  data: T[],
  request: Request
): T[] => {
  const { region, town } = request.params;
  if (region && town) {
    return data.filter(item => item.Region === region && item.Town === town);
  }
  return data;
};

export const getValidAddress = (
  address: string,
  region: string,
  town: string
): string => {
  return isNullOrEmpty(address) ? region + town : address;
};

export const getDisplayTel = (telephone: string): string => {
  return isNullOrEmpty(telephone) ? "無" : telephone;
};

export const getDisplayOpenTime = (openTime: string): string => {
  return isNullOrEmpty(openTime) ? "無" : openTime;
};

export const getValidPictures = (
  picture1: string,
  picture2: string,
  picture3: string
): string[] => {
  return [picture1, picture2, picture3].filter((pic): pic is string => !isNullOrEmpty(pic));
};

export const sortByPictureAndWebsite = <T extends HasPictureAndWebsite>(x: T, y: T): number => {
  const xHasPic = !isNullOrEmpty(x.Picture1);
  const yHasPic = !isNullOrEmpty(y.Picture1);
  if (xHasPic !== yHasPic) return xHasPic ? -1 : 1;

  const xHasSite = !isNullOrEmpty(x.Website);
  const yHasSite = !isNullOrEmpty(y.Website);
  if (xHasSite !== yHasSite) return xHasSite ? -1 : 1;

  return 0;
};
