from pydantic import BaseModel, EmailStr, field_validator
from datetime import date
from typing import Optional

# =====================
# AUTH SCHEMAS
# =====================

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

    @field_validator("password")
    @classmethod
    def password_length(cls, v: str):
        if len(v) < 6:
            raise ValueError("Password must be at least 6 characters")
        if len(v.encode("utf-8")) > 72:
            raise ValueError("Password must be at most 72 characters")
        return v


class UserLogin(BaseModel):
    email: EmailStr
    password: str

    @field_validator("password")
    @classmethod
    def password_not_empty(cls, v: str):
        v = v.strip()
        if not v:
            raise ValueError("Password cannot be empty")
        return v


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr

    class Config:
        orm_mode = True


# =====================
# TRANSACTION SCHEMAS
# =====================

class TransactionBase(BaseModel):
    title: str
    amount: float
    type: str
    category: str
    date: date

    @field_validator("amount")
    @classmethod
    def amount_positive(cls, v: float):
        if v <= 0:
            raise ValueError("Amount must be greater than 0")
        return v

    @field_validator("type")
    @classmethod
    def valid_type(cls, v: str):
        if v not in {"income", "expense"}:
            raise ValueError("Type must be either 'income' or 'expense'")
        return v


class TransactionCreate(TransactionBase):
    pass


class TransactionUpdate(BaseModel):
    title: Optional[str] = None
    amount: Optional[float] = None
    type: Optional[str] = None
    category: Optional[str] = None
    date: Optional[date] = None

    @field_validator("amount")
    @classmethod
    def amount_positive(cls, v: Optional[float]):
        if v is not None and v <= 0:
            raise ValueError("Amount must be greater than 0")
        return v

    @field_validator("type")
    @classmethod
    def valid_type(cls, v: Optional[str]):
        if v is not None and v not in {"income", "expense"}:
            raise ValueError("Type must be either 'income' or 'expense'")
        return v


class TransactionResponse(TransactionBase):
    id: int

    class Config:
        orm_mode = True
