import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();
  const totalCartAmount = getTotalCartAmount();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Itens</p>
          <p>Título</p>
          <p>Preço</p>
          <p>Quantidade</p>
          <p>Total</p>
          <p>Remover</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}> 
                <div className='cart-items-title cart-items-item'> 
                  <img src={url+ "/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>R${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>R${item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                </div>
                <hr/>
              </div>
            )
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
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
          <button onClick={() => navigate('/order')} disabled={totalCartAmount === 0}>
            FINALIZAR O PEDIDO
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>Você tem um código promocional? Digite aqui</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='Código Promocional'/>
              <button>Enviar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
