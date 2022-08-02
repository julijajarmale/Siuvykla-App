import { useContext } from "react";
import BackContext from "../BackContext";
import BackOrder from "./Order";




function AdminList() {
  const { orders} = useContext(BackContext);

  return (
    <div className="container list-container">
      <div className="row">
        <div className="col-12 list-form">
          <h2>List of Orders</h2>
          <div className="list-group">
          <ul className="list-group-item">
            {orders
              ? orders.map((order) => (
                  <BackOrder key={order.id} order={order}></BackOrder>
                ))
              : null}
          </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminList;