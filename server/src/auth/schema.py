from pydantic import BaseModel
from typing import Optional

class Token(BaseModel):
    token: str
    token_type: str
    userId: str


class TokenData(BaseModel):
    id: Optional[str] = None
