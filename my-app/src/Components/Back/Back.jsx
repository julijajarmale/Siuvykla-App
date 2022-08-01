import BackContext from './BackContext';
import ProductsCrud from './Products/Crud';
import Nav from './Nav';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';


function Back({show}) {
    const [lastUpdate, setLastUpdate] = useState(Date.now());

    const [products, setProducts] = useState(null)
    const [createProducts, setCreateProducts] = useState(null)
    const [deleteProduct, setDeleteProduct] = useState(null)
    const [editProduct, setEditProduct] = useState(null)
    const [modalProduct, setModalProduct] = useState(null)


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
    axios.put('http://localhost:3003/admin/products/' + editProduct.id, editProduct, authConfig())
        .then(res => {
            setLastUpdate(Date.now());
        })
       
}, [editProduct]);



    return (
        <BackContext.Provider value={{
            products,
            setCreateProducts,
            setDeleteProduct,
            setEditProduct,
            modalProduct,
            setModalProduct

            
        }}>
              {
                show === 'admin' ?
                    <>
                    
                    <Nav/>
                    
                   
            
                    </>
                    : show === 'products' ? <ProductsCrud/>: 
                        null
            }
        </BackContext.Provider>
    )
}
export default Back;