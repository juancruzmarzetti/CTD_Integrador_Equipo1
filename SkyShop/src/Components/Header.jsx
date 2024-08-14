import { useNavigate } from "react-router-dom";
import customCss from "./Header.module.css";
import MenuHamburguesa from "./MenuHamburguesa";
import { useContext } from "react";
import { BotonContext } from "../Context/Context";

const Header = () => {
  const navigate = useNavigate();
  const { showButtons, setShowButtons } = useContext(BotonContext);

  const handleCrearCuentaClick = () => {
    setShowButtons(false);
    navigate("/login");
  };

  return (
    <header>
      <div className={customCss.headerDivs}>
        <div className={customCss.logo}>
          <MenuHamburguesa />
          <a href="/"><img src="/logoSkyShop.png" alt="logo" /></a>
          <div className={customCss.separator}></div>
          <div className={customCss.sloganContainer}>
            <span className={customCss.slogan}>Los productos</span>
            <span className={customCss.sloganSegundo}>vuelan a tu hogar</span>
          </div>
        </div>
        <nav className={customCss.navLinks}>
          <ul>
            <li><a href="#">Ofertas</a></li>
            <li><a href="#">Productos</a></li>
            <li><a href="#">Carrito</a></li>
          </ul>
        </nav>
        {showButtons && (
          <div className={customCss.botonesHeader}>
            <button className={customCss.btn}>Crear cuenta</button>
            <button className={customCss.btn} onClick={handleCrearCuentaClick}>Iniciar Sesión</button>
          </div>
        )}
        <div className={customCss.userIcon}>
          <a href="#"><img src="/user.png" alt="icon-usuario" /></a>
        </div>
        <div className={customCss.cartIcon}>
          <a href="#"><img src="/cart.png" alt="carrito" /></a>
        </div>
      </div>
    </header>
  );
};

export default Header;