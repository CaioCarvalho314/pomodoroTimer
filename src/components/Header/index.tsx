import { Timer, Scroll } from "phosphor-react";
import { HeaderContainer } from "./styles";
import logoIgnite from "./../../assets/logo-ignite.svg";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <HeaderContainer>
      <img src={logoIgnite} alt="Logo do Ignite"></img>
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={30} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={30} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
