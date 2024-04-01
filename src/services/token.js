import Contract from '@/services/contract'
import { CONTRACTS } from '@/const/contracts'
import web3 from '@/services/web3'
import { isAddressCorrect } from '@/utils/web3'

class Fungi {
  constructor() {
    this.contract = new Contract(CONTRACTS.token.address, CONTRACTS.token.abi)
  }

  async getBalance(address) {
    return this.contract.call('balanceOf', [address])
  }

  async getSupply() {
    return this.contract.call('totalSupply')
  }

  async getDecimals() {
    return this.contract.call('decimals')
  }

  async getSeedByIndex(address, index) {
    return this.contract.call('mushroomOfOwnerByIndex', [address, index])
  }

  async getSeedSvg(seed) {
    return this.contract.call('getSvg', [seed])
  }

  async getSeedMeta(seed) {
    return this.contract.call('getMeta', [seed])
  }

  async getHoldersAmount() {
    return this.contract.call('holdersCount')
  }

  async getInscriptionSupply() {
    const [spores, mushrooms] = await Promise.all([
      this.contract.call('sporesTotalCount'),
      this.contract.call('mushroomsTotalCount'),
    ])

    return Number(spores) + Number(mushrooms)
  }

  async getInscription(seed) {
    const [
      svg,
      meta,
    ] = await Promise.all([
      this.getSeedSvg(seed),
      this.getSeedMeta(seed),
    ])

    return {
      svg,
      seed,
      meta: JSON.parse(meta),
    }
  }

  async getInscriptionsByAddress(address) {
    const [
      count,
      degree,
    ] = await Promise.all([
      this.contract.call('mushroomCount', [address]),
      this.contract.call('sporesDegree', [address]),
    ])

    const seedPromises = []

    for (let index = 0; index < count; index++) {
      seedPromises.push(this.getSeedByIndex(address, index))
    }

    let seeds = await Promise.all(seedPromises)

    seeds = seeds.map(seed => ({ seed: seed.seed, extra: seed.extra, owner: address }))

    if (Number(degree.seed)) {
      seeds.unshift({ isDynamic: true, seed: degree.seed, extra: degree.extra, owner: address })
    }

    return seeds
  }

  async getHolders(fromIndex = 0, holderAmount = 4) {
    const holders = await this.contract.call('getHoldersList', [fromIndex, holderAmount])
    return holders.filter(address => !address.startsWith('0x000000'))
  }

  async getHoldersSeeds(fromIndex = 0, amount = 4) {
    const holders = await this.getHolders(fromIndex, amount)

    const holdersSeeds = await Promise.all(
      holders.map(address => this.getInscriptionsByAddress(address))
    )

    let seeds = []

    for (let holderSeeds of holdersSeeds) {
      seeds = [...seeds, ...holderSeeds]
    }

    return seeds
  }

  async fetchInscriptionsBySeeds(seeds) {
    const promises = []

    for (let seed of seeds) {
      promises.push(fungi.getInscription(seed))
    }

    let list = await Promise.all(promises)

    return list || []
  }

  async fetchSeedsByAddress(address) {
    if (address && isAddressCorrect) {
      return fungi.getInscriptionsByAddress(address)
    }

    return []
  }
}

const fungi = new Fungi()

export default fungi