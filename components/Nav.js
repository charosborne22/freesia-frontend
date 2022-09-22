import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Link from "next/link";
import { useStateContext } from "../lib/context";
import Panier from "./Panier";
import User from "./User";
import { useUser } from "@auth0/nextjs-auth0/dist/frontend/use-user";
const { AnimatePresence, motion } = require("framer-motion");

const Nav = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const { user, error, isLoading } = useUser();

  return (
    <NavWrapper>
      <InnerNav>
        <h1>
          <Link href="/">Freesia</Link>
        </h1>
        <Menu>
          <User />
          <ShoppingBag onClick={() => setShowCart(true)}>
            {totalQuantities > 0 && (
              <motion.span animate={{ scale: 1 }} initial={{ scale: 0 }}>
                {totalQuantities}
              </motion.span>
            )}
            <FontAwesomeIcon icon={faBagShopping} />
          </ShoppingBag>
          <AnimatePresence>{showCart && <Panier />}</AnimatePresence>
        </Menu>
      </InnerNav>
    </NavWrapper>
  );
};

export default Nav;

const NavWrapper = styled.nav`
  width: 100vw;
  background: white;
  position: sticky;
  top: 0;
  margin: 0 calc(-50vw + 50%);
  padding: 1rem 2rem;
`;

const InnerNav = styled.div`
  position: relative;
  max-width: 1800px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const Menu = styled.div`
  display: flex;
`;

const ShoppingBag = styled.div`
  position: relative;
  cursor: pointer;
  svg {
    width: 1.25rem;
  }

  span {
    background: #ff2626;
    color: white;
    width: 1rem;
    height: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 0.75rem;
    position: absolute;
    right: -50%;
    top: -20%;
    pointer-events: none;
  }
`;
