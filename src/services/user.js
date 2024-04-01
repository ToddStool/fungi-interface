import web3modal from '@/services/web3modal'
import web3 from '@/services/web3'
import { getAccount, watchAccount, disconnect as wagmiDisconnect, watchNetwork, switchNetwork } from '@wagmi/core'
import { useUserStore } from '@/stores'
import { DEFAULT_CHAIN_ID } from '@/const/web3'

export async function checkForConnection() {
  const account = await getAccount()
  const { isConnected, isReconnecting } = account

  if (isReconnecting) {
    watchForConnection(onConnected)
  } else if (isConnected) {
    onConnected(account)
  }
}

export async function connect() {
  await web3modal.open()
  await checkForConnection()
  watchForConnection(onConnected)
}

export async function disconnect() {
  await wagmiDisconnect()
  onDisconnected()
}

async function onConnected({ address, connector }) {
  const userStore = useUserStore()
  const provider = await connector.getProvider()

  userStore.address = address
  userStore.connector = connector
  userStore.provider = provider
  userStore.isConnected = true

  web3.setProvider(provider)

  const chainId = await connector.getChainId()

  if (chainId) {
    await changeChain(chainId)
  }

  // Handling chain switching
  const unwatchNetwork = watchNetwork(async ({ chain }) => {
    if (chain) {
      await changeChain(chain.id)
    }
  })

  // Handling disconnecting
  const unwatchAccount = watchAccount(({ isDisconnected }) => {
    if (isDisconnected) {
      onDisconnected()
      unwatchAccount()
      unwatchNetwork()
    }
  })
}

function onDisconnected() {
  const userStore = useUserStore()

  userStore.address = ''
  userStore.provider = null
  userStore.connector = {}
}

async function changeChain(chainId) {
  if (chainId !== DEFAULT_CHAIN_ID) {
    return switchNetwork({ chainId: DEFAULT_CHAIN_ID })
  }
}

function watchForConnection(callback) {
  const unwatchAccount = watchAccount(async (account) => {
    const { isConnected } = account

    if (isConnected) {
      callback(account)
      unwatchAccount()
    }
  })
}