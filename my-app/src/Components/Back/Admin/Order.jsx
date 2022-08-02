import { useContext } from "react";
import BackContext from "../BackContext";

function BackOrder({ order}) {
  const { setDeleteOrder, setApproveOrder } = useContext(BackContext);

  const handleDelete = () => {
    setDeleteOrder(order);
  };

  const handleApprove = () => {
    const data = { ...order, approved: 1 };
    setApproveOrder(data);
  };

  const handleDisapprove = () => {
    const data = { ...order, approved: 0 };
    setApproveOrder(data);
  };

  return (
    <li className="list-item">
      <div className="content">
        <b className="item">{order.product}</b>
        <span className="item">{order.size}</span>
        <span className="item">{order.comment}</span>
       
        <p style={{ color: order.approved ? "green" : "red" }}>
          Approved: {order.approved ? "Yes" : "No"}
        </p>
      </div>
      <div className="buttons">
        <button type="button" className="buttons btn4" onClick={handleApprove}>
          Approve
        </button>
        <button type="button" className="buttons btn5" onClick={handleDisapprove}>
         Disapprove
        </button>
        <button type="button" className="buttons btn3" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default BackOrder;
