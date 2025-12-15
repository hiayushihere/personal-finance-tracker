from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from ..schemas import TransactionCreate, TransactionResponse
from ..models import Transaction
from ..dependencies import get_db, get_current_user
from fastapi import HTTPException

router = APIRouter(prefix="/transactions", tags=["Transactions"])

@router.post("/", response_model=TransactionResponse)
def create_transaction(
    transaction: TransactionCreate,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    tx = Transaction(**transaction.dict(), owner_id=user.id)
    db.add(tx)
    db.commit()
    db.refresh(tx)
    return tx

@router.get("/", response_model=List[TransactionResponse])
def get_transactions(
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    return db.query(Transaction).filter(Transaction.owner_id == user.id).all()

@router.delete("/{id}")
def delete_transaction(
    id: int,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    tx = db.query(Transaction).filter(Transaction.id == id, Transaction.owner_id == user.id).first()
    if tx:
        db.delete(tx)
        db.commit()
    return {"message": "Deleted"}

@router.put("/{id}", response_model=TransactionResponse)
def update_transaction(
    id: int,
    transaction: TransactionCreate,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    tx = (
        db.query(Transaction)
        .filter(Transaction.id == id, Transaction.owner_id == user.id)
        .first()
    )

    if not tx:
        raise HTTPException(status_code=404, detail="Transaction not found")

    for key, value in transaction.dict().items():
        setattr(tx, key, value)

    db.commit()
    db.refresh(tx)
    return tx
