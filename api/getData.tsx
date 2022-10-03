import axios from "axios";


export const getData = async () =>
{
    try {
        return await axios.get('https://fakestoreapi.com/products');
    } catch (error) {
        console.error('api Error !!');
    }
}