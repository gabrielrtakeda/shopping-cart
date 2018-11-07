import { MARKET_ID } from '../constants'

export class Market {}

// Mock `Market` data
export const market = new Market()
market.id = MARKET_ID

export const marketsById = {
  [MARKET_ID]: market
}

export const getMarket = (id) => {
  return marketsById[id || MARKET_ID]
}
