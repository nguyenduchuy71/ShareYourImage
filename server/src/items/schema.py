from pydantic import BaseModel

class CollectionBase(BaseModel):
    pass

class CollectionShare(CollectionBase):
    srcImage: str

class ItemBase(BaseModel):
    title: str


class ItemCreate(ItemBase):
    pass

class Item(ItemBase):
    id: str
    userId: str

    class Config:
        from_attributes = True
