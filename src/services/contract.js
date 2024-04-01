import web3 from '@/services/web3'
import { useUserStore } from '@/stores'

class Contract {
  constructor(contractAddress, contractAbi) {
    const contract = new web3.eth.Contract(contractAbi, contractAddress)
    contract.options.address = contractAddress

    this.contract = contract

    return this
  }

  async send(methodName, args = [], sendValue = null) {
    const userStore = useUserStore()

    let sendData = {
      from: userStore.address
    }

    if (sendValue) {
      sendData.value = sendValue
    }

    return this.contract.methods[methodName](...args).send(sendData)
  }

  async call(methodName, args = []) {
    return this.contract.methods[methodName](...args).call()
  }

  async getPastEvents(eventName, args = {}) {
    const result = await this.contract.getPastEvents(eventName, args)

    return result
  }
}

export default Contract