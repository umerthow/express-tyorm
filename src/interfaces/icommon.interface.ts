export interface Paginate {
  data: Record<string, any>
  count: number,
  skip: number,
  take: number
}