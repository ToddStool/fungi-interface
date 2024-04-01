import web3 from '@/services/web3'
import BigNumber from 'bignumber.js'

export function isAddressCorrect(address) {
  return web3.utils.isAddress(address)
}

export function decimalsOff(value, decimalCount = 0) {
  return new BigNumber(value || 0)
    .dividedBy(Math.pow(10, decimalCount))
    .toString()
}