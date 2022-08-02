
import { useEffect, useState } from 'react';
import FrontContext from './FrontContext';
import FrontNav from './Nav';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';
import List from './Products/List';
import Create from './Orders/Create';
import OrderList from './Orders/List';



function Front() {
   
    const [lastUpdate, setLastUpdate] = useState(Date.now());

    const [products, setProducts] = useState(null);
    const [orders, setOrders] = useState(null);
    const [createOrder, setCreateOrder] = useState(null);

//READ PRODUCTS

    useEffect(() => {
        axios.get('http://localhost:3003/products', authConfig())
            .then(res => setProducts(res.data));
    }, []);

    //READ ORDERS
useEffect(() => {
    axios.get('http://localhost:3003/orders', authConfig())
        .then(res => setOrders(res.data));
}, [lastUpdate]);

    //CREATE ORDERS

useEffect(() => {
    if (null === createOrder) return;
    axios.post('http://localhost:3003/orders', createOrder, authConfig())
    .then(res => {
        setLastUpdate(Date.now());
    })
    
}, [createOrder]);
        return (
            <FrontContext.Provider value={{
             products,
             orders,
             setCreateOrder
          

            }}>
               <FrontNav/>
               <div className="container">
                    <div className="row">
                        
                        <Create/>
                        <OrderList/>
              
               </div>
               </div>
               <div className="container">
               
                
                    <div className="row">
                    <List/>
                    </div>
              
               </div>
            </FrontContext.Provider>
        )
    }
export default Front;