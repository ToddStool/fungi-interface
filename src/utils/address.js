export function shortAddress(address, symbolAmount = 3) {
  return `${address.substring(0, symbolAmount)}...${address.substring(address.length - symbolAmount)}`
}