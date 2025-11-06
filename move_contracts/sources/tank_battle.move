module tank_battle::game {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;

    public struct Tank has key, store {
        id: UID,
        owner: address,
        health: u64,
        position_x: u64,
        position_y: u64,
        ammunition: u64,
    }

    public struct GameSession has key {
        id: UID,
        players: vector<address>,
        is_active: bool,
    }

    public fun create_tank(ctx: &mut TxContext): Tank {
        Tank {
            id: object::new(ctx),
            owner: tx_context::sender(ctx),
            health: 100,
            position_x: 0,
            position_y: 0,
            ammunition: 10,
        }
    }

    public fun move_tank(tank: &mut Tank, x: u64, y: u64) {
        tank.position_x = x;
        tank.position_y = y;
    }

    public fun mint_tank(ctx: &mut TxContext) {
        let tank = create_tank(ctx);
        transfer::transfer(tank, tx_context::sender(ctx));
    }
}