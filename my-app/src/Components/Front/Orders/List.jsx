import { useEffect, useState } from "react";
import { useContext } from "react";
import FrontContext from "../FrontContext";
import Order from "./Order";



function OrderList() {
  const { orders } = useContext(FrontContext);

  const [sum, setSum] = useState(parseFloat(0));

  useEffect(() => {
    if (null === orders) {
      return;
    }
    setSum(0);
    
    for (let i = 0; i < orders.length; i++) {
      
      setSum((s) => s + orders[i].price) ;
    }
  }, [orders]);

  return (
    
      
        <div className="col-8 list-container">
            <div className="list-form">
          <h2>List of Orders</h2>
          <div className="list-group">
          <ul className="list-group-item">
            {orders
              ?  orders.map((order) => ( order.approved === 1?
                  <Order key={order.id} order={order}></Order> : null
                ))
              : null}
          </ul>
          
          <div className="statistic">
        <p> Total paid: {sum} EUR</p>
      </div>
        
      </div>
          </div>
        </div>
       
     
  );
}

export default OrderList;