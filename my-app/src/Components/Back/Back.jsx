import BackContext from './BackContext';
import ProductsCrud from './Products/Crud';
import Nav from './Nav';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';
import Admin from './Admin/Admin';


function Back({show}) {
    const [lastUpdate, setLastUpdate] = useState(Date.now());

    const [products, setProducts] = useState(null)
    const [createProducts, setCreateProducts] = useState(null)
    const [deleteProduct, setDeleteProduct] = useState(null)
    const [editProduct, setEditProduct] = useState(null)
    const [modalProduct, setModalProduct] = useState(null)

    const [orders, setOrders] = useState(null)
    const [deleteOrder, setDeleteOrder] = useState(null)
    const [approveOrder, setApproveOrder] = useState(null)

    //READ PRODUCTS
useEffect(() => {
    axios.get('http://localhost:3003/admin/products', authConfig())
        .then(res => setProducts(res.data));
}, [lastUpdate]);

    //CREATE PRODUCTS

useEffect(() => {
    if (null === createProducts) return;
    axios.post('http://localhost:3003/admin/products', createProducts, authConfig())
    .then(res => {
        setLastUpdate(Date.now());
    })
    
}, [createProducts]);

//DELETE PRODUCT

useEffect(() => {
    if (null === deleteProduct) return;
    axios.delete('http://localhost:3003/admin/products/' + deleteProduct.id, authConfig())
        .then(res => {
            setLastUpdate(Date.now());
        })
    
}, [deleteProduct]);

//EDIT Product

useEffect(() => {
    if (null === editProduct) return;
    axios.put('http://localhost:3003/admin/orders/' + editProduct.id, editProduct, authConfig())
        .then(res => {
            setLastUpdate(Date.now());
        })
       
}, [editProduct]);

//READ FRONT ORDERS
useEffect(() => {
    axios.get('http://localhost:3003/orders', authConfig())
        .then(res => setOrders(res.data));
}, [lastUpdate]);

 //READ ORDERS
 useEffect(() => {
    axios.get('http://localhost:3003/admin/orders', authConfig())
        .then(res => setOrders(res.data));
}, [lastUpdate]);

//DELETE ORDERS

useEffect(() => {
    if (null === deleteOrder) return;
    axios.delete('http://localhost:3003/admin/orders/' + deleteOrder.id, authConfig())
        .then(res => {
            setLastUpdate(Date.now());
        })
    
}, [deleteOrder]);
//EDIT Order

useEffect(() => {
    if (null === approveOrder) return;
    axios.put('http://localhost:3003/admin/orders/' + approveOrder.id, approveOrder, authConfig())
        .then(res => {
            setLastUpdate(Date.now());
        })
       
}, [approveOrder]);


    return (
        <BackContext.Provider value={{
            products,
            setCreateProducts,
            setDeleteProduct,
            setEditProduct,
            modalProduct,
            setModalProduct,
            orders,
            setDeleteOrder,
            setApproveOrder

            
        }}>
              {
                show === 'admin' ?
                    <>
                    
                    <Nav/>
                    <Admin/>
                    
                   
            
                    </>
                    : show === 'products' ? <ProductsCrud/>: 
                        null
            }
        </BackContext.Provider>
    )
}
export default Back;