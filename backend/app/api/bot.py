from fastapi import APIRouter, BackgroundTasks
from backend.app.services.trader import CopyTraderService

router = APIRouter(prefix="/bot", tags=["Bot"])

trader_service = CopyTraderService()

@router.post("/sync")
async def manual_sync(background_tasks: BackgroundTasks):
    """
    Trigger a manual sync of all wallets in the background.
    """
    background_tasks.add_task(trader_service.sync_all_wallets)
    return {"message": "Sync started in background"}

