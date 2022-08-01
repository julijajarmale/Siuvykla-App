import { useContext } from "react";
import BackContext from "../BackContext";
import Product from "./Product";

function List() {
  const { products} = useContext(BackContext);

  return (
    <div className="container list-container">
      <div className="row">
        <div className="col-12 list-form">
          <h2>List of products</h2>
          <div className="list-group">
          <ul className="list-group-item">
            { products
              ?  products.map((product) => (
                  <Product key={product.id} product={product}></Product>
                ))
              : null}
          </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;