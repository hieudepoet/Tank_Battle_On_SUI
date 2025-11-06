module tank_battle::treasury {
    use sui::object::{Self, UID};
    use sui::coin::{Self, Coin};
    use sui::balance::{Self, Balance};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use tank_battle::token::TANK_TOKEN;

    public struct GameTreasury has key {
        id: UID,
        balance: Balance<TANK_TOKEN>,
        total_staked: u64,
        reward_pool: u64,
    }

    public fun create_treasury(ctx: &mut TxContext) {
        let treasury = GameTreasury {
            id: object::new(ctx),
            balance: balance::zero(),
            total_staked: 0,
            reward_pool: 0,
        };
        transfer::share_object(treasury);
    }

    public fun stake_tokens(
        treasury: &mut GameTreasury,
        tokens: Coin<TANK_TOKEN>,
    ) {
        let amount = coin::value(&tokens);
        treasury.total_staked = treasury.total_staked + amount;
        balance::join(&mut treasury.balance, coin::into_balance(tokens));
    }

    public fun distribute_rewards(
        treasury: &mut GameTreasury,
        winner: address,
        amount: u64,
        ctx: &mut TxContext
    ) {
        let reward = coin::take(&mut treasury.balance, amount, ctx);
        transfer::public_transfer(reward, winner);
        treasury.reward_pool = treasury.reward_pool - amount;
    }
}