#!/usr/bin/env node
import { execSync } from 'child_process'
import { writeFileSync } from 'fs'

class ContractDeployer {
  async deployToTestnet() {
    console.log('🚀 Deploying Move contracts to Sui Testnet...')
    
    try {
      // Build contracts
      execSync('cd move_contracts && sui move build', { stdio: 'inherit' })
      
      // Deploy to testnet
      const deployResult = execSync('cd move_contracts && sui client publish --gas-budget 100000000', { encoding: 'utf8' })
      
      // Extract package ID from deployment result
      const packageIdMatch = deployResult.match(/Package ID: (0x[a-fA-F0-9]+)/)
      if (packageIdMatch) {
        const packageId = packageIdMatch[1]
        
        // Update SDK with package ID
        const sdkContent = `export const PACKAGE_ID = '${packageId}'`
        writeFileSync('frontend/src/sdk/constants.ts', sdkContent)
        
        console.log(`✅ Contracts deployed successfully!`)
        console.log(`📦 Package ID: ${packageId}`)
      }
      
    } catch (error) {
      console.error('❌ Deployment failed:', error)
      process.exit(1)
    }
  }
}

new ContractDeployer().deployToTestnet()