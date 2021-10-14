import { Logo } from './Logo';
import { Menu } from './Menu';
import { MenuButton } from './MenuButton';
import { WindowWidthContext } from '@context/WindowWidth';
import { motion, useCycle } from 'framer-motion';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import * as React from 'react';
import styled from 'styled-components';

const HeaderStyle = styled.header`
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

const MenuButtons = styled(motion.div)`
  display: flex;
  align-items: center;
  z-index: 10;

  > a {
    cursor: pointer;
    padding-left: 1.5rem;
  }
`;

const menuButtonsVariants = {
  open: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
      type: 'tween',
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
      type: 'tween',
    },
  },
};

export const Header = () => {
  const [menuIsOpen, toggleMenu] = useCycle(false, true);
  const windowWidth = React.useContext(WindowWidthContext);

  const menuHandler = () => {
    toggleMenu();
  };

  return (
    <HeaderStyle>
      <InnerHeader>
        <Logo windowWidth={windowWidth} />

        <MenuButtons
          animate={menuIsOpen ? 'open' : 'closed'}
          variants={menuButtonsVariants}
        >
          <Link to='/cart'>
            <StaticImage src='../../images/einkaufswagen.svg' height={40} />
          </Link>

          <MenuButton menuHandler={menuHandler} />
        </MenuButtons>
      </InnerHeader>

      <Menu isOpen={menuIsOpen} />
    </HeaderStyle>
  );
};
