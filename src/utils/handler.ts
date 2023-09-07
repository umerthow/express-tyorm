import { Response } from "express";

export const responseHandler = (
  res: Response,
  responseData: Record<string, any>
): void => {

  res
    .status(responseData.statusCode ?? 200)
    .json(responseData);
};