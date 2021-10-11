import * as React from "react";
import styled from "styled-components";
import { useCycle } from "framer-motion";
import { StaticImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

import { WindowWidthContext } from "@context/WindowWidth";
import Logo from "./Logo";
import Menu from "./Menu";

const Main = styled.header`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100vw;
`;

const InnerHeader = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: space-between;
`;

const MenuButtons = styled.div`
  display: flex;
  align-items: center;
  z-index: 10;

  > a {
    cursor: pointer;
    padding-left: 1.5rem;
  }
`;

const Header = styled(() => {
  const [menuIsOpen, toggleMenu] = useCycle(false, true);
  const windowWidth = React.useContext(WindowWidthContext);

  return (
    <Main>
      <InnerHeader>
        <Logo windowWidth={windowWidth} />

        <MenuButtons>
          <Link to="">
            <StaticImage src="../../images/einkaufswagen.svg" height={40} />
          </Link>

          <a onClick={() => toggleMenu()}>
            <StaticImage src="../../images/menubutton.svg" height={30} />
          </a>
        </MenuButtons>
      </InnerHeader>

      <Menu isOpen={menuIsOpen} />
    </Main>
  );
})``;

export default Header;
