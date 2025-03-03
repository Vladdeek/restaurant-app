from pydantic import BaseModel


#To-Do
class MenuBase(BaseModel):
    title: str
    description: str
    price: int 
    image_path: str
    #user_name: str  # Убедитесь, что это поле может быть None

class MenuCreate(MenuBase):
    pass

class Menu(MenuBase):
    id: int
    class Config:
        orm_mode = True

    

#User 
class UserBase(BaseModel):
    name: str
    password: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    class Config:
        orm_mode = True 


# Здесь описаны различные схемы,
# нужны для описания API
# нужны для описания того что мы будем принимать
# и что мы будем принимать 
