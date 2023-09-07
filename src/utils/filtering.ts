import set from 'lodash/set';
import { Like } from 'typeorm';

export function filtering(query: Record<string, any>) {
  const object = {}

  Object.keys(query).map((item, _index) => {
    let keyFilters = query[item]
    Object.keys(keyFilters).map(item => {
      const isContains = keyFilters[item].contains;
      
      if(isContains) {
        return set(object, item, Like('%' + isContains +'%'))
      }
    });
  })

  return object

}