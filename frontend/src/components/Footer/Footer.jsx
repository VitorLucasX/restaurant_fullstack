import React from "react";
import "./Footer.css";
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat magnam optio voluptate, ab officia vero fugit ratione dolorem enim delectus praesentium libero tempora facere. Vero nemo iste esse hic dolores.</p>
            <div className="footer-social-icons">
              <img src={assets.facebook_icon} alt="" />
              <img src={assets.twitter_icon} alt="" />
              <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>EMPRESA</h2>
            <ul>
              <li>Home</li>
              <li>Sobre</li>
              <li>Delivery</li>
              <li>Políticas de Privacidade</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>ENTRAR EM CONTATO</h2>
            <ul>
              <li>+55 (31) 99672-9996</li>
              <li>vitorlucasdev@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 vitorlucasdev - Todos os Direitos Reservados</p>
    </div>
  );
};

export default Footer;
