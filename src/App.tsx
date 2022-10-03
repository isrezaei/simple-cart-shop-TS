import {getData} from "../api/getData";
import {Products} from "../components/products";
import {useState} from "react";
import {useEffect} from "react";
import {Stack , Row} from "react-bootstrap";
import 'react-bootstrap'
import {OfCanvas} from "../components/OfCanvas";

function App() {

     const [products , getProducts] = useState<any[]>([])


     useEffect(()=>  {

         getData().then(response => getProducts(response?.data))

     } , [])


     console.log(products)

  return (
      <>
          <OfCanvas/>
         <div className='row justify-content-center gap-3 my-5 text-center'> {products?.map((items) => <Products key={items.id} {...items}/>)}</div>
      </>
  )
}

export default App
