import logging
from typing import List, Dict, Any, Optional
from py_clob_client.client import ClobClient
from py_clob_client.clob_types import OrderArgs, OrderType
from py_clob_client.constants import POLYGON
from backend.app.config import settings
import requests

logger = logging.getLogger(__name__)

class PolymarketService:
    def __init__(self):
        self.client = self._create_client()
        self.gamma_url = "https://gamma-api.polymarket.com"

    def _create_client(self) -> Optional[ClobClient]:
        try:
            if not settings.POLYMARKET_API_KEY:
                logger.warning("Polymarket credentials not set. ClobClient disabled.")
                return None
            
            return ClobClient(
                host=settings.HOST,
                key=settings.POLYMARKET_API_KEY,
                chain_id=settings.CHAIN_ID,
                signature_type=1, # 0 for EOA, 1 for Poly Proxy (usually 1 for API keys if derived, but depends on setup. Defaulting to 1 or 2 often safer, but let's stick to standard if keys are provided)
                # Note: py-clob-client setup can be complex with L1/L2 headers. 
                # Assuming API Key/Secret/Passphrase are for the CLOB API auth.
                # If using L2 key directly:
                # private_key=settings.PRIVATE_KEY
                creds=dict(
                    api_key=settings.POLYMARKET_API_KEY,
                    api_secret=settings.POLYMARKET_SECRET,
                    api_passphrase=settings.POLYMARKET_PASSPHRASE,
                )
            )
        except Exception as e:
            logger.error(f"Failed to initialize ClobClient: {e}")
            return None

    def get_positions(self, user_address: str) -> List[Dict[str, Any]]:
        """
        Fetch positions for a specific user address using Gamma API.
        """
        try:
            # Gamma API endpoint for positions
            url = f"{self.gamma_url}/positions"
            params = {"user": user_address}
            response = requests.get(url, params=params)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            logger.error(f"Error fetching positions for {user_address}: {e}")
            return []

    def get_market(self, condition_id: str) -> Dict[str, Any]:
        """
        Fetch market details by condition_id (or token_id).
        """
        try:
            # Gamma API for market info
            url = f"{self.gamma_url}/markets"
            params = {"condition_ids": condition_id} # or similar param
            response = requests.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            if isinstance(data, list) and len(data) > 0:
                return data[0]
            return {}
        except Exception as e:
            logger.error(f"Error fetching market {condition_id}: {e}")
            return {}

    async def create_order(self, token_id: str, side: str, price: float, size: float):
        """
        Place an order using ClobClient.
        side: BUY or SELL
        """
        if not self.client:
            logger.error("ClobClient not initialized")
            return None

        try:
            # This is a simplified example. Real usage requires valid tick size checks, etc.
            order_args = OrderArgs(
                price=price,
                size=size,
                side=side.upper() == "BUY" and OrderType.BUY or OrderType.SELL,
                token_id=token_id,
            )
            # Create order (post_order / create_order depending on library version)
            resp = self.client.create_order(order_args)
            return resp
        except Exception as e:
            logger.error(f"Error creating order: {e}")
            raise e

    def get_my_balances(self):
        if not self.client:
            return {}
        try:
            # Get API key specific balances or account balances
            return self.client.get_balance_allowance(asset_type="COLLATERAL") # Simplified
        except Exception as e:
            logger.error(f"Error fetching balances: {e}")
            return {}

