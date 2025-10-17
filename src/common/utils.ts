import { NextFunction, Request, Response } from "express";

export const isJestTest: boolean = typeof jest !== "undefined";

export interface OriginPlaceBase {
  Region: string;
  Town: string;
  Add?: string;
  Name: string;
  Tel?: string;
  Website?: string;
  Description?: string;
  Picture1?: string;
  Picture2?: string;
  Picture3?: string;
}

export interface ProcessedInfo {
  Id: number;
  Add: string;
  Name: string;
  Tel: string;
  Website?: string;
  Description: string;
  Region: string;
  Town: string;
  Opentime?: string;
  Ticketinfo: string;
  Travellinginfo: string;
  Toldescribe: string;
  Serviceinfo: string;
  Serviceinfos?: string[];
  Picture1?: string;
  Picture2?: string;
  Picture3?: string;
  Pictures?: string[];
}

export const isNullOrEmpty = (value: string | null | undefined): boolean => {
  if (value == null) {
    return true;
  }
  if (!isTypeString(value)) {
    return false ;
  }
  return value.trim().length === 0;
};

export const isTypeString = (value: unknown): boolean => {
  return typeof value === "string";
};

export const ReplaceValue = (item: ProcessedInfo): ProcessedInfo => {
  if (isNullOrEmpty(item.Add)) item.Add = item.Region + item.Town;
  if (isNullOrEmpty(item.Tel)) item.Tel = "無";
  item.Pictures = [item.Picture1, item.Picture2, item.Picture3]
    .filter((pic): pic is string => !isNullOrEmpty(pic));
  return item;
};

export const setFunctionName = <T extends (
  request: Request,
  response: Response,
  next?: NextFunction
) => void> (fn: T, name: string): T => {
  Object.defineProperty(fn, "name", { value: name });
  return fn;
};