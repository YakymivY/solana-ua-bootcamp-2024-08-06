use anchor_lang::prelude::*;

declare_id!("H8E68oDp3cN3KXFnmXe1bBW2CfHkFjiSSytSDuEizwAp");

#[program]
pub mod favorites {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
