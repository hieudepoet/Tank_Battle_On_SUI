import React from 'react'
import { WalletProvider } from '@suiet/wallet-kit'
import GameContainer from './components/GameContainer'
import WalletConnect from './wallet/WalletConnect'

function App() {
  return (
    <WalletProvider>
      <div className="app">
        <header>
          <h1>Tank Battle on Sui</h1>
          <WalletConnect />
        </header>
        <GameContainer />
      </div>
    </WalletProvider>
  )
}

export default App