import {Offcanvas, Button, Badge} from "react-bootstrap";
import {getData} from "../api/getData";
import {useEffect, useState} from "react";
import {Products} from "./products";
import {useContext} from "react";
import {ShopContext} from "../context/ShopContext";
import {Card} from "react-bootstrap";

export const OfCanvas = () =>
{
    const [products , getProducts] = useState<any[]>([])
    const [openCanvas , setOpenCanvas] = useState<boolean>(false)

    const {shopQuantity , removeQuantity , totalQuantity} = useContext(ShopContext)


    useEffect(()=>{

        getData().then(response => getProducts(response?.data))

    } , [])



    return (
        <>
            <Button onClick={() => setOpenCanvas(value => !value)}>Cart List</Button>
            <Offcanvas placement='end' show={openCanvas} onHide={()=> setOpenCanvas(value => !value)} >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>SHOP CART</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className=''>
                        <Badge pill>{totalQuantity}</Badge>

                        {shopQuantity?.map(items => {

                        const render = products?.find(quantity => quantity.id === items.id)

                            if (render == null) return null

                            return (
                                <div key={Math.random()} className="card p-4 d-flex justify-content-start align-items-center">
                                    <img src={render.image} className="card-img-top w-25" alt="..."/>

                                    <div className="w-100 card-body d-flex flex-column justify-content-between align-items-center">
                                        <h5 className="card-title">{render.title}</h5>
                                        <p className="card-text text-center text-truncate" style={{maxWidth : '300px'}}>{render.description}</p>
                                        <p>${render.price}</p>
                                    </div>

                                    <Button onClick={() => removeQuantity(render.id)} variant='danger'>Remove</Button>
                                </div>
                            )

                        })}

                        {
                            shopQuantity.reduce((total : any , items : any) => {

                                const product = products.find(product => product.id === items.id)

                                return total + product.price  * items.quantity
                            } , 0)
                        }


                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )

}