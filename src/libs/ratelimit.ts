import { client } from "../redis-client";

class RateLimit {

  private name 
  private duration

  constructor(
    name: string,
    duration: number
  ){
    this.name = name
    this.duration = duration
  }

  async active(value: any) {
    const data = await this.validate()

    if (data) {
      return client.set(
        this.name,
        JSON.stringify({
          ...value,
          attempt: data.attempt + 1
        }),
        this.duration
      )
    }

    return client.set(
        this.name,
        JSON.stringify({
          ...value,
          attempt: 1
        }),
        {EX: this.duration}
    )
  }

  async validate() {
    const getData = await client.get(this.name)
    const parseData = JSON.parse(getData) || ''

    if (parseData) {
      const { identifier, limit, attempt } = parseData

      if (attempt > limit) {
        throw new Error(`Access limit maximum attempt ${limit} times per minutes` )
      }

      return {
        identifier,
        attempt
      }

    }

    return null
  }
  
}

export default RateLimit