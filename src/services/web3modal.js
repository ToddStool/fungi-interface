import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/vue'
import { base } from '@wagmi/core/chains'

const projectId = 'fungifungifungi' // <-- put your walletconnect projectId here

const chains = [base]
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  appName: 'App',
})

export default createWeb3Modal({ wagmiConfig, projectId, chains })