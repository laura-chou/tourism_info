import { NextFunction, Request, Response } from "express";

import { ProcessedFoodItem } from "../controllers/foodInfo.controller";

export const isJestTest: boolean = typeof jest !== "undefined";

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

export const ReplaceValue = (item: ProcessedFoodItem): ProcessedFoodItem => {
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