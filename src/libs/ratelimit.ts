import { RateLimitData } from "../interfaces/icommon.interface";
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

  async active(value: RateLimitData) {
    const data = await this.validate()

    if (data) {
      return client.set(
        this.name,
        JSON.stringify({
          ...value,
          attempt: data.attempt + 1
        }),
        {EX: this.duration}
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
    const ttl = await client.ttl(this.name)

    if (parseData) {
      const { identifier, limit, attempt } = parseData

      if (attempt > limit) {
        const error = JSON.stringify({
          code: 'RATE_LIMIT',
          message: `Maximum attempt ${limit} times per minutes. Please waiting in ${ttl}s`
        })

        throw new Error(error)
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