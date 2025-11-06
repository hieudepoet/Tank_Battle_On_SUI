module tank_battle::arena {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::clock::Clock;

    public struct Arena has key {
        id: UID,
        name: vector<u8>,
        max_players: u8,
        entry_fee: u64,
        is_active: bool,
        start_time: u64,
    }

    public struct Match has key {
        id: UID,
        arena_id: address,
        players: vector<address>,
        winner: option::Option<address>,
        prize_pool: u64,
        status: u8, // 0: waiting, 1: active, 2: finished
    }

    public fun create_arena(
        name: vector<u8>,
        max_players: u8,
        entry_fee: u64,
        ctx: &mut TxContext
    ) {
        let arena = Arena {
            id: object::new(ctx),
            name,
            max_players,
            entry_fee,
            is_active: true,
            start_time: 0,
        };
        transfer::share_object(arena);
    }

    public fun join_match(
        arena: &Arena,
        clock: &Clock,
        ctx: &mut TxContext
    ): Match {
        Match {
            id: object::new(ctx),
            arena_id: object::uid_to_address(&arena.id),
            players: vector::empty(),
            winner: option::none(),
            prize_pool: arena.entry_fee,
            status: 0,
        }
    }
}