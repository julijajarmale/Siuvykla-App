

function Product({product}) {

 
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
                    
               
            </li>
        

    );
}

export default Product;