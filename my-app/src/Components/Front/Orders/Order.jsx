function Order({ order }) {
  return (
    <li className="list-item">
      <div className="content">
        <b className="item">{order.prod}</b>
        <span className="item">{order.size}</span>
        <span className="item">{order.price}</span>
        <span className="item">{order.comment}</span>
        <p style={{ color: order.approved ? "green" : "red" }}>
          Approved: {order.approved ? "Yes" : "No"}
        </p>
      </div>
    </li>
  );
}

export default Order;
