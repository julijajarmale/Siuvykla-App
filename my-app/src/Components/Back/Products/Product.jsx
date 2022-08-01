import { useContext } from "react";
import BackContext from "../BackContext";

function Product({product}) {

   const {setDeleteProduct, setModalProduct} = useContext(BackContext);

    const handleDelete = () => {
        setDeleteProduct(product)
    }

    const handleEdit =() => {
        setModalProduct(product)
    }

    return (

          <li className="list-item">
            
                <div className="content">
                    <span className="item">{product.type}</span>
                    <span className="item">{product.color}</span>
                <span className="item">{product.hexcolor}</span>
                <span className="item">{product.price}</span>
                </div>
                <div className="item herbas">
                {
                        product.picture ? <div className="photo-bin"><img src={product.picture} alt={product.type} /></div> : null
                    }
                    </div>
                    
                <div className="buttons">
               
                    <button type="button" className="buttons btn2" onClick={handleEdit}>Edit</button>
                    <button type="button" className="buttons btn3" onClick={handleDelete}>Delete</button>
                </div>
            
            </li>
        

    );
}

export default Product;