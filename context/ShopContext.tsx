import {createContext, ReactDOM, ReactNode} from "react";
import {useState} from "react";


type Quantity = {
    id : number
    quantity : number
}

type ShopContext = {
    getQuantity : (id : number) => number
    increaseQuantity : (id : number) => void
    decreaseQuantity : (id : number) => void
    removeQuantity : (id : number) => void
    shopQuantity : Quantity[]
    totalQuantity : number
}



export const ShopContext = createContext({} as ShopContext)



export const ShopProvider = ({children} : {children : ReactNode}) =>
{

    const [shopQuantity , setShopQuantity] = useState<Quantity[]>([])


    const totalQuantity = shopQuantity.reduce((total : number , items : any) => items?.quantity + total , 0)



    const getQuantity = (id : number) =>
    {
         return shopQuantity?.find((item : any) => item.id === id)?.quantity || 0
    }


    const increaseQuantity = (id : number) =>
    {
        setShopQuantity((shopQuantity : any) => {

            if (shopQuantity.find(items => items.id === id) == null)
            {
                return [...shopQuantity , {id , quantity : 1}]
            }

            return shopQuantity.map(items => {
                if (items.id === id)
                {
                    return {
                        ...items,
                        quantity : items.quantity + 1
                    }
                }
                return items
            })

        })
    }

    const decreaseQuantity = (id : number) =>
    {
        setShopQuantity((shopQuantity : any) => {

            if (shopQuantity.find(items => items.id === id)?.quantity === 1)
            {
                return shopQuantity.filter(items => items.id !== id)
            }
            else
            {
               return shopQuantity.map(items => {
                    if (items.id === id)
                    {
                        return {
                            ...items,
                            quantity : items.quantity - 1
                        }
                    }
                    return items
                })

            }
        })
    }

    const removeQuantity = (id : number) =>
    {
       return setShopQuantity((value : any) => value.filter((items : any) => items.id !== id))
    }


    return (
        <ShopContext.Provider value={{
            getQuantity,
            increaseQuantity,
            decreaseQuantity,
            removeQuantity,
            shopQuantity,
            totalQuantity
        }}>
            {children}
        </ShopContext.Provider>

    )
}