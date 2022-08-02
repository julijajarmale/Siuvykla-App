import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";

import FrontContext from "../FrontContext";


function Create() {
 
const {setCreateOrder, products} = useContext(FrontContext)


const [product, setProduct] = useState( '');
const [size, setSize] = useState("");
const [comment, setComment] = useState('');

useEffect(()=> {
  if(products === null) return
  setProduct(products[0].id)
},[products])


  
const handleCreate = () => {

    const data = { 
      size, 
      product: parseInt(product),
      comment
      
     };
    
    setCreateOrder(data);
    setSize("");
    setProduct(products[0].id);
    setComment('');
   
    
   
  };

  return (
    
        <div className="col-4">
          <form className="form" >
            <h2>Make an order</h2>
           
            <div className="form-row">
              <label>Select product</label>
              <select
                className="input"
                onChange={(e) => setProduct(e.target.value)}
             value={product}
              >
                {products
                  ? products.map((product) => (
                      <option key={product.id} value={product.id} >
                        {product.type} 
                      </option>
                    ))
                  : null}
              </select>
            </div>

            <div className="form-row">
              <label>Select size</label>
              <select
                className="input"
                onChange={(e) => setSize(e.target.value)}
             value={size}
              >
                <option value="default">Select size</option>
                <option value="A">XS</option>
                <option value="B">S</option>
                 <option value="C">M</option>
                 <option value="C">XL</option>
                 <option value="C">XXL</option>
              </select>
            </div>
          
            <div className="form-row">
                    <textarea className="input" value={comment} onChange={e => setComment(e.target.value)} rows="3"></textarea>
                </div>
            <button
              type="button"
              className="btn"
              onClick={handleCreate}
            >
              Create
            </button>
          </form>
        </div>
        
      
  );
}

export default Create;