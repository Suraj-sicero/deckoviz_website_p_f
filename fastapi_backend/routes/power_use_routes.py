from fastapi import APIRouter, HTTPException
from typing import List

from data.power_uses import POWER_USES_BY_VERTICAL
from schemas import PowerUseListResponse

router = APIRouter(prefix="/power-uses", tags=["Power Uses"])


@router.get("/{vertical}", response_model=PowerUseListResponse)
def get_power_uses_by_vertical(vertical: str):
    """Return the 10 Power Use cards for a single vertical.

    Valid verticals: home, enterprise, schools.
    Returns 404 with a clear message if vertical is not one of those three.
    """
    normalized = vertical.strip().lower()
    if normalized not in POWER_USES_BY_VERTICAL:
        raise HTTPException(
            status_code=404,
            detail="Vertical '{}' not found. Available verticals: home, enterprise, schools".format(vertical),
        )
    items = POWER_USES_BY_VERTICAL[normalized]
    return {"vertical": normalized, "items": items}
