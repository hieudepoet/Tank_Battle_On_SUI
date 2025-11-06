import React from 'react'
import { useWallet } from '@suiet/wallet-kit'

const WalletConnect: React.FC = () => {
  const { connected, connect, disconnect, account } = useWallet()

  return (
    <div className="wallet-connect">
      {connected ? (
        <div>
          <span>Connected: {account?.address?.slice(0, 6)}...</span>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      ) : (
        <button onClick={connect}>Connect Wallet</button>
      )}
    </div>
  )
}

export default WalletConnect