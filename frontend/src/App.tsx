import React from 'react'
import { WalletProvider } from '@suiet/wallet-kit'
import '@suiet/wallet-kit/style.css'
import GameContainer from './components/GameContainer'
import WalletConnect from './wallet/WalletConnect'
import WalletStatus from './components/WalletStatus'
import GameLobby from './components/GameLobby'
import './index.css'

function App() {
  return (
    <WalletProvider>
      <div className="min-h-screen bg-game-bg">
        <header className="bg-game-primary p-4 flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Tank Battle on Sui</h1>
          <WalletConnect />
        </header>
        
        <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1 space-y-4">
            <WalletStatus />
            <GameLobby />
          </div>
          
          <div className="lg:col-span-2">
            <GameContainer />
          </div>
        </div>
      </div>
    </WalletProvider>
  )
}

export default App