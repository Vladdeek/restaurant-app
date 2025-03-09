import random
from fastapi import FastAPI, HTTPException, Path, Query, Body, Depends
from typing import Optional, List, Dict, Annotated
from sqlalchemy.orm import Session
from sqlalchemy import func
from passlib.context import CryptContext # библиотека для ХЕША паролей 

#импорт наших классов
from .database import engine, session_local
from .models import Base, Menu, Orders, User
from .schemas import MenuCreate, Menu as DbMenu, UserCreate, User as DbUser, OrdersCreate, Orders as DbOrders


app = FastAPI()

# Импортируем CORSMiddleware для разрешения кросс-доменных запросов
# CORS (Cross-Origin Resource Sharing) нужно, чтобы фронтенд с другого домена/порта мог отправлять запросы на наш сервер
from fastapi.middleware.cors import CORSMiddleware

# Разрешаем все источники для теста
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  # Разрешаем все методы (GET, POST, и т.д.)
    allow_headers=["*"],  # Разрешаем все заголовки
)

Base.metadata.create_all(bind=engine)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto") #Настройка контекста для bcrypt

# функция генерации уникального 6-значного номера для номера заказа
def generate_unique_order_number(db: Session) -> int:
    """Генерирует случайный 6-значный номер и проверяет, что он уникален в БД."""
    while True:
        order_num = random.randint(100000, 999999)  # Генерируем случайное 6-значное число
        existing_order = db.query(Orders).filter(Orders.order_num == order_num).first()
        if not existing_order:
            return order_num  # Если номер уникален, возвращаем его

# функция ХЕШИРОВАНИЯ 
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

# Функция для проверки пароля
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)



# функция создает сессию для подключения к ДБ
def get_db():
    db = session_local()
    try:
        yield db 
    finally:
        db.close()

# Вывод всех данных
@app.get("/get_menu/", response_model=List[DbMenu])
async def menu(db: Session = Depends(get_db)):
    menulist = db.query(Menu).all()  # Получаем все задачи
    return menulist  # Возвращаем задачи

@app.get("/search_menu/")
def search_menu(query: str = Query("", min_length=1), db: Session = Depends(get_db)):
    query_lower = query.lower()  # Преобразуем запрос к нижнему регистру

    # Получаем все элементы из базы данных
    all_items = db.query(Menu).all()

    # Ищем элементы, где название в нижнем регистре совпадает с запросом
    results = [
        item for item in all_items
        if query_lower in item.title.lower()  # Сравниваем в нижнем регистре
    ]

    return results

@app.get("/get_menu/{id}", response_model=DbMenu)
async def get_menu_item(id: int, db: Session = Depends(get_db)):
    menu_item = db.query(Menu).filter(Menu.id == id).first()
    if menu_item is None:
        raise HTTPException(status_code=404, detail="Меню не найдено")
    return menu_item

@app.get("/get_orders/", response_model=List[DbOrders])
async def orders(db: Session = Depends(get_db)):
    orderlist = db.query(Orders).filter(Orders.status_id != 4).all()
    return orderlist  # Возвращаем задачи

@app.get("/get_order/{id}", response_model=DbOrders)
async def get_order_item(id: int, db: Session = Depends(get_db)):
    order = db.query(Orders).filter(Orders.id == id).first()
    if order is None:
        raise HTTPException(status_code=404, detail="Заказ не найдет")
    return order

@app.get("/get_done_orders/", response_model=List[DbOrders])
async def done_orders(db: Session = Depends(get_db)):
    doneorderlist = db.query(Orders).filter(Orders.status_id == 4).all()
    return doneorderlist  # Возвращаем задачи

@app.post("/post_order/", response_model=DbOrders)
async def post_order(order: OrdersCreate, db: Session = Depends(get_db)):
    unique_order_num = generate_unique_order_number(db)  # Генерируем уникальный номер
    
    db_order = Orders(order_num=unique_order_num, status_id=order.status_id, orders=order.orders )  # Используем сгенерированный номер
    db.add(db_order)
    db.commit()
    db.refresh(db_order)

    return db_order
    

#Регистрация авторизация
@app.post("/users/", response_model=DbUser)
async def create_user(user: UserCreate, db: Session = Depends(get_db)) -> DbUser:   
     # Проверяем, есть ли уже пользователь с таким именем
    existing_user = db.query(User).filter(User.name == user.name).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Пользователь уже существует")  
    
    # Хешируем пароль
    hashed_password = hash_password(user.password)
    
    # Создаем пользователя с хешированным паролем
    db_user = User(name=user.name, password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


# Дополнительный маршрут, который будет проверять, существует ли пользователь
# Этот эндпоинт вернет {"exists": True}, если пользователь есть, и 404, если его нет.
@app.get("/users/{name}")
async def check_user(name: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.name == name).first()
    if user:
        return {"exists": True}
    raise HTTPException(status_code=404, detail="Пользователь не найден")


# Эндпоинт авторизации
@app.post("/auth/")
async def auth_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.name == user.name).first()

    if not db_user:
        raise HTTPException(status_code=404, detail="Пользователь не найден")

    if not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Неверный пароль")

    return {"message": "Успешный вход", "user": db_user.name}


# Вывод всех данных
@app.get("/users/", response_model=List[DbUser])
async def users(db: Session = Depends(get_db)):
    return db.query(User).all()