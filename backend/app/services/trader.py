import logging
from typing import Dict, Optional
from backend.app.config import settings
from backend.app.services.polymarket import PolymarketService
from backend.app.api.config import get_in_memory_config

logger = logging.getLogger(__name__)

class CopyTraderService:
    def __init__(self):
        self.poly_service = PolymarketService()
        # No Supabase dep for config

    async def sync_all_wallets(self):
        """
        Fetch the single tracked wallet configuration from memory and sync positions.
        """
        # logger.info("Checking sync configuration...")
        try:
            config = get_in_memory_config()
            
            if not config:
                # Silent return if no config to avoid log spam
                return

            if not config.get("is_active"):
                logger.info("Bot is paused (is_active=False).")
                return

            await self.sync_wallet(config)
        except Exception as e:
            logger.error(f"Error in sync task: {e}")

    async def sync_wallet(self, config: Dict):
        """
        Sync positions for the single tracked wallet.
        """
        source_address = config["target_wallet_address"]
        copy_ratio = float(config.get("copy_ratio", 1.0))
        fixed_amount = config.get("fixed_amount")

        logger.info(f"Syncing target {source_address} with ratio {copy_ratio}")

        # 1. Get Source Positions
        source_positions = self.poly_service.get_positions(source_address)
        if not source_positions:
            logger.info(f"No positions found for {source_address}")
            return

        # 2. Get My Positions
        if not settings.MY_ADDRESS:
            logger.warning("MY_ADDRESS not set, skipping sync.")
            return
            
        my_positions = self.poly_service.get_positions(settings.MY_ADDRESS)
        my_pos_map = {p["asset"]: p for p in my_positions} # Map by asset/token_id

        # 3. Compare and Execute
        for src_pos in source_positions:
            asset_id = src_pos["asset"]
            src_size = float(src_pos.get("size", 0))
            
            # Calculate target size
            target_size = src_size * copy_ratio

            # Get current size
            current_pos = my_pos_map.get(asset_id)
            current_size = float(current_pos.get("size", 0)) if current_pos else 0.0

            diff = target_size - current_size
            
            # Threshold to avoid dust trades
            if abs(diff) < 1.0: 
                continue

            side = "BUY" if diff > 0 else "SELL"
            abs_diff = abs(diff)
            
            logger.info(f"Executing {side} {abs_diff} for {asset_id} (Target: {target_size}, Current: {current_size})")
            
            # TODO: Execute trade
            # self.poly_service.create_order(asset_id, side, price, abs_diff) 
