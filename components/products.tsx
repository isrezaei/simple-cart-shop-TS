import {useContext} from "react";
import {ShopContext} from "../context/ShopContext";
import {Badge , Button , Stack , Col} from "react-bootstrap";


type dataTypeApi = {
    image : string,
    id : number,
    description : string,
    price : number,
    title : string
}


export const Products = ({image , id , description , price , title} : dataTypeApi) =>
{

    const {getQuantity , increaseQuantity , decreaseQuantity} = useContext(ShopContext)

    let render ;

    if (getQuantity(id) === 0)
    {
        render = <>
        <Button onClick={()=> increaseQuantity(id)}>Add to cart</Button>
        </>
    }
    if (getQuantity(id) !== 0)
    {
        render = <>
            <div className='w-100 d-flex justify-content-around align-items-center'>
                <Button variant='success' onClick={() => increaseQuantity(id)}>Add</Button>
                <Badge pill>{getQuantity(id)}</Badge>
                <Button variant='danger' onClick={()=> decreaseQuantity(id)}>Dec</Button>
            </div>
        </>
    }


    return (
        <div className="col-4 card p-4 d-flex justify-content-start align-items-center">

            <img src={image} className="card-img-top w-25" alt="..."/>

                <div className="w-100 card-body d-flex flex-column justify-content-between align-items-center">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text text-center text-truncate" style={{maxWidth : '300px'}}>{description}</p>
                    <p>${price}</p>
                    {render}
                </div>
        </div>
    )
}