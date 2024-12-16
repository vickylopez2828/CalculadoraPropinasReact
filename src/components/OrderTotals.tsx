import { Dispatch, useCallback } from "react"
import { OrderItem } from "../types"
import { formatCurrency } from "../helpers"
import { OrderActions } from "../reducers/order-reducer"

type OrderTotalsProp = {
    dispatch: Dispatch<OrderActions>
    order: OrderItem[]
    tip:number
}

export default function OrderTotals({dispatch, order, tip} : OrderTotalsProp) {
    const subTotalAmount = useCallback(()=> order.reduce( (total, item) => total + (item.quantity * item.price), 0), [order])
    const tipAmount = useCallback(()=>  subTotalAmount() * tip , [tip, order])
    const total = useCallback(()=> tipAmount() + subTotalAmount() , [tip, order])
    
    return (
    <>
        <div className="space-y-3">
            <h2 className=" font-black text-2xl">Totales y Propina:</h2>
            <p>Subtotal a pagar: {''}
                <span className=" font-bold">{formatCurrency(subTotalAmount())}</span>
            </p>
            <p>Propina: {''}
                <span className=" font-bold">{formatCurrency(tipAmount())}</span>
            </p>
            <p>Total a Pagar: {''}
                <span className=" font-bold">{formatCurrency(total())}</span>
            </p>
        </div>
        <button 
            className="w-full bg-black p-3 uppercase text-white font-bold mt-10"
            onClick={() =>dispatch({type: 'place-order'})}
        >
            Guardar Orden
        </button>
    </>
  )
}

