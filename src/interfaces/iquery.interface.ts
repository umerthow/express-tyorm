import { IObject } from "./icommon.interface";

export interface IQuery {
  take: number,
  skip: number,
  select: IObject,
  where: IObject
}