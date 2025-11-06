module tank_battle::token {
    use sui::coin::{Self, Coin};
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;

    public struct TANK_TOKEN has drop {}

    public struct Treasury has key {
        id: UID,
        supply: u64,
    }

    fun init(witness: TANK_TOKEN, ctx: &mut TxContext) {
        let (treasury_cap, metadata) = coin::create_currency(
            witness,
            6,
            b"TANK",
            b"Tank Battle Token",
            b"Game token for Tank Battle on Sui",
            option::none(),
            ctx
        );
        
        transfer::public_freeze_object(metadata);
        transfer::transfer(treasury_cap, tx_context::sender(ctx));
    }

    public fun mint(
        treasury_cap: &mut coin::TreasuryCap<TANK_TOKEN>,
        amount: u64,
        ctx: &mut TxContext
    ): Coin<TANK_TOKEN> {
        coin::mint(treasury_cap, amount, ctx)
    }
}