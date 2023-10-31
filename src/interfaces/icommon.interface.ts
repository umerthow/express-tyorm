export interface Paginate {
  data: Record<string, any>
  count: number,
  skip: number,
  take: number
}


export interface RateLimitData {
  identifier: string,
  limit: number
}

export type  IObject = Record<string, any>