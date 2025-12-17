from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/config", tags=["Config"])

# In-memory storage for MVP
# In a production app, this would be a database or persistent store
_config_store: Optional[dict] = None

class ConfigUpdate(BaseModel):
    target_wallet_address: str
    label: Optional[str] = None
    copy_ratio: float = 1.0
    fixed_amount: Optional[float] = None
    is_active: bool = True

class ConfigResponse(BaseModel):
    target_wallet_address: str
    label: Optional[str]
    is_active: bool
    copy_ratio: float
    fixed_amount: Optional[float]

def get_in_memory_config():
    return _config_store

@router.get("/", response_model=Optional[ConfigResponse])
def get_config():
    if not _config_store:
        return None
    return _config_store

@router.post("/", response_model=ConfigResponse)
def update_config(config: ConfigUpdate):
    global _config_store
    _config_store = config.model_dump(exclude_none=True)
    return _config_store

@router.delete("/")
def delete_config():
    """Stop tracking/Clear config"""
    global _config_store
    _config_store = None
    return {"message": "Config cleared"}
