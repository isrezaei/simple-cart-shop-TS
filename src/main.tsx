import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {Container} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import {ShopProvider} from "../context/ShopContext";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

    <ShopProvider>
        <Container>
            <App/>
        </Container>
    </ShopProvider>
)
