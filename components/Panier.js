import styled from "styled-components";
import { useStateContext } from "../lib/context";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faCircleMinus,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import getStripe from "../lib/getStripe";
const { motion } = require("framer-motion");

// Animation variants
const card = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

const cards = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const Cart = () => {
  const { cartItems, setShowCart, onAdd, onRemove, totalPrice } =
    useStateContext();

  // Paiement
  const handleCheckout = async () => {
    const stripePromise = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });
    const data = await response.json();
    await stripePromise.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <CartWrapper
      animate={{ x: 0 }}
      intitial={{ x: "-100%" }}
      exit={{ x: "100%" }}
      onClick={() => setShowCart(false)}
    >
      <StyledCart
        initial={{ x: "50%" }}
        animate={{ x: "0%" }}
        exit={{ x: "50%" }}
        transition={{ type: "tween" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Close onClick={() => setShowCart(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </Close>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {cartItems.length < 1 && (
            <h2 className="empty-cart">Votre panier est vide</h2>
          )}
        </motion.div>

        <CartItems layout variants={cards} initial="hidden" animate="show">
          {cartItems.length >= 1 && <h2>Mon Panier</h2>}
          {cartItems.length >= 1 &&
            cartItems.map((item) => {
              return (
                <Item key={item.slug} layout variants={card}>
                  <Image
                    src={item.image.data.attributes.formats.thumbnail.url}
                    alt={item.image.data.attributes.alternativeText}
                    width={130}
                    height={130}
                  />
                  <Description>
                    <h3>{item.titre}</h3>
                    <h4>{item.prix} $</h4>
                    <Quantity>
                      <FontAwesomeIcon
                        icon={faCircleMinus}
                        onClick={() => onRemove(item)}
                      />
                      <span>{item.quantitie}</span>
                      <FontAwesomeIcon
                        icon={faCirclePlus}
                        onClick={() => onAdd(item, 1)}
                      />
                    </Quantity>
                  </Description>
                </Item>
              );
            })}
        </CartItems>
        {cartItems.length >= 1 && (
          <div>
            <h3>Total: {totalPrice} $</h3>
            <Button onClick={handleCheckout}>Acheter</Button>
          </div>
        )}
      </StyledCart>
    </CartWrapper>
  );
};

export default Cart;

const CartWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: hsla(0, 0%, 0%, 0.4);
`;

const StyledCart = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 30%;
  height: 100vh;
  background: white;
  overflow-y: scroll;
  padding: 1rem;

  h2.empty-cart {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    text-align: center;
  }

  @media screen and (max-width: 1200px) {
    width: 50%;
  }

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const Close = styled.div`
  text-align: right;
`;

const CartItems = styled(motion.div)`
  padding: 1rem 0;
`;

const Item = styled(motion.div)`
  display: flex;
  margin: 2rem 0;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1rem;
`;

const Quantity = styled.div`
  margin: 1rem 0;
  span {
    padding: 0 1rem;
  }

  svg {
    cursor: pointer;
  }
`;
const Button = styled.button`
  width: 100%;
  background: black;
  border: none;
  outline: none;
  padding: 1rem 2rem;
  color: white;
  cursor: pointer;
  margin-top: 2rem;
`;
