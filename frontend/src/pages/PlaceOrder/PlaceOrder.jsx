import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
    const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

    const totalCartAmount = getTotalCartAmount();

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data, [name]: value}))
    }

    const placeOrder = async (event) => {
        event.preventDefault();
        let orderItems = [];
        food_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantidade"] = cartItems[item._id];
                orderItems.push(itemInfo)
            }
        })
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount()+2,
        }
        let response = await axios.post(url+"/api/order/place", orderData, {headers: {token}})
        if (response.data.success) {
            const {session_url} = response.data;
            window.location.replace(session_url);
        }
        else {
            alert("Error");
        }
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/cart')
        } else if (getTotalCartAmount() === 0) {
            navigate('/cart')
        }
    }, [token])

    return (
        <form onSubmit={placeOrder} className="place-order">
            <div className="place-order-left">
                <p className="title">Informações de Entrega</p>
                <div className="multi-fields">
                    <input required type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder="Primeiro Nome" />
                    <input required type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder="Último Nome" />
                </div>
                <input required type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder="Endereço de Email" />
                <input required type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder="Rua" />
                <div className="multi-fields">
                    <input required type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder="Cidade" />
                    <input required type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder="Estado" />
                </div>
                <div className="multi-fields">
                    <input required type="text" name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder="Código postal" />
                    <input required type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder="País" />
                </div>
                <input required type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder="Celular" />
            </div>
            <div className="place-order-right">
              <div className="cart-total">
                <h2>Total do Carrinho</h2>
                <div>
                <div className="cart-total-details">
                <p>Subtotal</p>
                <p>R${totalCartAmount}</p>
            </div>
            <hr />
            <div className="cart-total-details">
                <p>Entrega</p>
                <p>R${totalCartAmount === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
                <b>Total</b>
                <b>R${totalCartAmount === 0 ? 0 : totalCartAmount + 2}</b>
            </div>
                </div>
                <button type='submit'>FINALIZAR O PAGAMENTO</button>
            </div>
            </div>
        </form>
    );
}

export default PlaceOrder;
