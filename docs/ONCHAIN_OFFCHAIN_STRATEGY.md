# On-chain vs Off-chain Strategy - Tank Battle Game Logic

## 🎯 Nguyên Tắc Phân Chia

### **❌ KHÔNG nên đưa On-chain:**
- **Real-time game logic** (di chuyển, bắn đạn từng frame)
- **Physics calculations** (collision detection, trajectory)
- **Animation states** (tank rotation, bullet effects)
- **Temporary game states** (HP trong battle, ammo count)

### **✅ CẦN đưa On-chain:**
- **Battle results** (winner/loser, final stats)
- **Asset ownership** (Tank NFTs, tokens)
- **Economic transactions** (entry fees, rewards)
- **Permanent records** (leaderboard, achievements)

---

## 🏗️ Kiến Trúc Hybrid

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │     Oracle       │    │  Smart Contract │
│   (Phaser.js)   │    │   (Node.js)      │    │    (Move)       │
├─────────────────┤    ├──────────────────┤    ├─────────────────┤
│ • Tank movement │◄──►│ • Validate       │◄──►│ • Battle result │
│ • Shooting      │    │ • Anti-cheat     │    │ • Token transfer│
│ • Collision     │    │ • Aggregate      │    │ • NFT ownership │
│ • Animation     │    │ • Submit result  │    │ • Leaderboard   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
     Off-chain              Validation            On-chain
```

---

## 🎮 Game Logic Breakdown

### **Real-time Battle (Off-chain - Phaser.js)**

#### **Tank Movement:**
```typescript
// frontend/src/game/TankController.ts
class TankController {
  update() {
    // ✅ Off-chain: Real-time movement
    if (this.cursors.left.isDown) {
      this.tank.x -= this.speed
    }
    
    // ✅ Off-chain: Collision detection
    if (this.physics.overlap(this.tank, this.walls)) {
      this.tank.x += this.speed // Revert movement
    }
  }
}
```

#### **Shooting System:**
```typescript
// frontend/src/game/WeaponSystem.ts
class WeaponSystem {
  shoot() {
    // ✅ Off-chain: Bullet physics
    const bullet = this.add.sprite(tank.x, tank.y, 'bullet')
    bullet.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed)
    
    // ✅ Off-chain: Hit detection
    this.physics.overlap(bullet, enemyTank, (bullet, tank) => {
      this.dealDamage(tank, 25)
      bullet.destroy()
    })
  }
}
```

### **Battle Validation (Oracle - Node.js)**

#### **Action Tracking:**
```typescript
// scripts/oracle/battle-tracker.ts
class BattleTracker {
  trackAction(battleId: string, action: BattleAction) {
    // ✅ Oracle: Validate action legitimacy
    if (!this.antiCheat.validateAction(action)) {
      this.flagPlayer(action.player, 'SUSPICIOUS_ACTION')
      return
    }
    
    // ✅ Oracle: Store for final validation
    this.battleHistory.get(battleId).push(action)
  }
}
```

#### **Result Calculation:**
```typescript
// scripts/oracle/result-calculator.ts
class ResultCalculator {
  calculateBattleResult(battleId: string): BattleResult {
    const actions = this.battleHistory.get(battleId)
    
    // ✅ Oracle: Aggregate damage from all hits
    const player1Damage = this.calculateTotalDamage(actions, 'player1')
    const player2Damage = this.calculateTotalDamage(actions, 'player2')
    
    // ✅ Oracle: Determine winner
    const winner = player1Damage > player2Damage ? 'player1' : 'player2'
    
    return { battleId, winner, totalDamage: Math.max(player1Damage, player2Damage) }
  }
}
```

### **Final Settlement (On-chain - Move)**

#### **Battle Result Only:**
```move
// move_contracts/sources/modules/battle.move
module tank_battle::battle {
    public fun finish_battle(
        battle: &mut Battle,
        winner: address,
        total_damage: u64,  // ✅ Only final aggregated damage
        battle_duration: u64, // ✅ Only total time
        clock: &Clock,
    ) {
        // ✅ On-chain: Record final result only
        battle.winner = option::some(winner);
        battle.total_damage = total_damage;
        battle.end_time = option::some(clock::timestamp_ms(clock));
        
        // ✅ On-chain: Emit event for indexing
        event::emit(BattleResult {
            battle_id: object::uid_to_address(&battle.id),
            winner,
            loser: if (winner == battle.player1) battle.player2 else battle.player1,
            damage_dealt: total_damage,
            battle_duration: clock::timestamp_ms(clock) - battle.start_time,
        });
    }
}
```

---

## 💰 Economic Transactions (On-chain)

### **Entry Fees & Rewards:**
```move
// move_contracts/sources/modules/treasury.move
module tank_battle::treasury {
    public fun process_battle_rewards(
        treasury: &mut GameTreasury,
        winner: address,
        loser: address,
        entry_fee: u64,
        ctx: &mut TxContext
    ) {
        // ✅ On-chain: Winner gets 80% of prize pool
        let winner_reward = (entry_fee * 2 * 80) / 100;
        let house_fee = (entry_fee * 2 * 20) / 100;
        
        // ✅ On-chain: Transfer tokens
        let reward_coin = coin::take(&mut treasury.balance, winner_reward, ctx);
        transfer::public_transfer(reward_coin, winner);
        
        // ✅ On-chain: Update treasury
        treasury.house_balance = treasury.house_balance + house_fee;
    }
}
```

---

## 🛡️ Anti-Cheat Strategy

### **Multi-Layer Validation:**

#### **Layer 1: Client-side (Basic)**
```typescript
// frontend/src/game/ClientValidator.ts
class ClientValidator {
  validateMovement(oldPos: Vector2, newPos: Vector2, deltaTime: number): boolean {
    const distance = Vector2.distance(oldPos, newPos)
    const maxDistance = this.maxSpeed * deltaTime
    
    // ✅ Basic client validation
    return distance <= maxDistance
  }
}
```

#### **Layer 2: Oracle (Comprehensive)**
```typescript
// scripts/oracle/anti-cheat.ts
class AntiCheatSystem {
  validateBattleSequence(actions: BattleAction[]): boolean {
    // ✅ Oracle: Comprehensive validation
    return this.validateMovementSpeed(actions) &&
           this.validateFireRate(actions) &&
           this.validatePositionConsistency(actions) &&
           this.validateDamageCalculation(actions)
  }
}
```

#### **Layer 3: On-chain (Final Authority)**
```move
// move_contracts/sources/modules/battle.move
public fun finish_battle(
    battle: &mut Battle,
    winner: address,
    damage: u64,
    // ...
) {
    // ✅ On-chain: Final validation
    assert!(damage <= MAX_POSSIBLE_DAMAGE, INVALID_DAMAGE);
    assert!(winner == battle.player1 || winner == battle.player2, INVALID_WINNER);
    
    // Only oracle can call this function
    // Oracle address is verified in the transaction
}
```

---

## 📊 Data Flow Example

### **Complete Battle Flow:**

```typescript
// 1. ✅ On-chain: Create battle
const battleTx = await battleSDK.createBattle(player1, player2, tank1, tank2, entryFee)

// 2. ✅ Off-chain: Real-time gameplay (Phaser.js)
gameScene.update(() => {
  // Tank movement, shooting, collision - all off-chain
  if (hitDetected) {
    websocket.send({ type: 'HIT', damage: 25, timestamp: Date.now() })
  }
})

// 3. ✅ Oracle: Validate and aggregate
oracle.onBattleEnd((battleData) => {
  const isValid = antiCheat.validate(battleData.actions)
  if (isValid) {
    const result = calculateFinalResult(battleData)
    submitToBlockchain(result)
  }
})

// 4. ✅ On-chain: Final settlement
const finishTx = await battleSDK.finishBattle(battleId, winner, totalDamage)
```

---

## 🎯 Kết Luận

### **On-chain (Smart Contract):**
- Battle creation & matching
- Final results & rewards
- Token transfers
- NFT ownership
- Leaderboard updates

### **Off-chain (Phaser.js + Oracle):**
- Real-time game mechanics
- Physics calculations
- Animation & effects
- Action validation
- Anti-cheat detection

### **Lợi ích của kiến trúc này:**
- ⚡ **Performance:** Game chạy mượt 60fps
- 💰 **Cost-effective:** Chỉ pay gas cho kết quả cuối
- 🛡️ **Secure:** Oracle validation + on-chain settlement
- 🎮 **User Experience:** Responsive gameplay
- 🔒 **Trustless:** Blockchain đảm bảo fairness

**Kết luận:** Logic bắn nhau KHÔNG cần smart contract, chỉ cần Oracle validation và on-chain settlement!