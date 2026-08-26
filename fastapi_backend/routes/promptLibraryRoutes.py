from fastapi import APIRouter, HTTPException
from data.prompt_library_seed import (
    RESTAURANTS_CAFE_TEMPLATES,
    RETAIL_STORES_TEMPLATES,
    HOTELS_HOSPITALITY_TEMPLATES,
    SCHOOLS_UNIVERSITIES_TEMPLATES,
    HOME_TEMPLATES,
)

router = APIRouter(prefix="/prompt-library", tags=["Prompt Library"])

# Mapping of vertical keys to display labels
VERTICAL_LABELS = {
    "restaurants_cafes": "Restaurants & Cafés",
    "retail_stores": "Retail Stores",
    "hotels_hospitality": "Hotels & Hospitality",
    "schools_universities": "Schools & Universities",
    "home": "Home",
}


@router.get("")
def get_all_prompt_library():
    """Return ALL prompt templates grouped by vertical."""
    verticals = [
        {
            "vertical": "restaurants_cafes",
            "label": VERTICAL_LABELS["restaurants_cafes"],
            "prompts": RESTAURANTS_CAFE_TEMPLATES,
        },
        {
            "vertical": "retail_stores",
            "label": VERTICAL_LABELS["retail_stores"],
            "prompts": RETAIL_STORES_TEMPLATES,
        },
        {
            "vertical": "hotels_hospitality",
            "label": VERTICAL_LABELS["hotels_hospitality"],
            "prompts": HOTELS_HOSPITALITY_TEMPLATES,
        },
        {
            "vertical": "schools_universities",
            "label": VERTICAL_LABELS["schools_universities"],
            "prompts": SCHOOLS_UNIVERSITIES_TEMPLATES,
        },
        {
            "vertical": "home",
            "label": VERTICAL_LABELS["home"],
            "prompts": HOME_TEMPLATES,
        },
    ]
    return {"verticals": verticals}


@router.get("/{vertical}")
def get_prompt_library_by_vertical(vertical: str):
    """Return prompt templates for a single vertical.

    404 if the vertical key does not exist.
    """
    verticals_data = {
        "restaurants_cafes": RESTAURANTS_CAFE_TEMPLATES,
        "retail_stores": RETAIL_STORES_TEMPLATES,
        "hotels_hospitality": HOTELS_HOSPITALITY_TEMPLATES,
        "schools_universities": SCHOOLS_UNIVERSITIES_TEMPLATES,
        "home": HOME_TEMPLATES,
    }

    if vertical not in verticals_data:
        raise HTTPException(
            status_code=404,
            detail=f"Vertical '{vertical}' not found. Available verticals: {', '.join(verticals_data.keys())}",
        )

    return {"vertical": vertical, "prompts": verticals_data[vertical]}