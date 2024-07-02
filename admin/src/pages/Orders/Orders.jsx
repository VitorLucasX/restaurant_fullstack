import { useState, useEffect } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets.js';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Error fetching orders: " + error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error("Error updating order status");
      }
    } catch (error) {
      toast.error("Error updating order status: " + error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Página de Pedidos</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, itemIndex) => (
                  <span key={itemIndex}>
                    {item.name} x {item.quantity}
                    {itemIndex !== order.items.length - 1 && ", "}
                  </span>
                ))}
              </p>
              {order.address && (
                <>
                  <p className="order-item-name">
                    {order.address.firstName + " " + order.address.lastName}
                  </p>
                  <div className="order-item-address">
                    <p>{order.address.street && order.address.street + ","}</p>
                    <p>
                      {order.address.city && order.address.city + ", "}
                      {order.address.state && order.address.state + ", "}
                      {order.address.country && order.address.country + ", "}
                      {order.address.zipcode && order.address.zipcode}
                    </p>
                  </div>
                  <p className="order-item-phone">{order.address.phone}</p>
                </>
              )}
            </div>
            <p>Itens: {order.items.length}</p>
            <p>R${order.amount}</p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option value="Preparando pedido">Preparando pedido</option>
              <option value="Preparando pra entrega">Preparando pra entrega</option>
              <option value="Em rota de entrega">Em rota de entrega</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
