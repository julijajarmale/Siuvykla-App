import { useContext } from "react";
import FrontContext from "../FrontContext";
import Order from "./Order";



function OrderList() {
  const { orders } = useContext(FrontContext);

  return (
    
      
        <div className="col-8 list-container">
            <div className="list-form">
          <h2>List of Orders</h2>
          <div className="list-group">
          <ul className="list-group-item">
            {orders
              ?  orders.map((order) => (
                  <Order key={order.id} order={order}></Order> 
                ))
              : null}
          </ul>
          <div className="statistic">
        <p> We have {orders === null ? null : orders.length} orders</p>
      </div>
          </div>
        </div>
        </div>
     
  );
}

export default OrderList;