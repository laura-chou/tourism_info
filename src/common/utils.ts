import { NextFunction, Request, Response } from "express";

export const isJestTest: boolean = typeof jest !== "undefined";

export interface OriginBase {
  Region: string;
  Town: string;
  Add: string;
  Name: string;
  Tel: string;
  Website: string;
  Description: string;
  Picture1: string;
  Picture2: string;
  Picture3: string;
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

export const setFunctionName = <T extends (
  request: Request,
  response: Response,
  next?: NextFunction
) => void> (fn: T, name: string): T => {
  Object.defineProperty(fn, "name", { value: name });
  return fn;
};