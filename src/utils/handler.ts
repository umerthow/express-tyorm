import { Response } from "express";

export const responseHandler = <T>(
  res: Response,
  responseData: Record<string, any>
) => {

  res
    .status(responseData.statusCode ?? 200)
    .json(responseData);
};