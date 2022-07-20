import SEO from "../components/SEO";
import { useRouter } from "next/router";
import styled from "styled-components";
const { motion } = require("framer-motion");
const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);

// Récupérer les détails de la commande
export async function getServerSideProps(params) {
  const order = await stripe.checkout.sessions.retrieve(
    params.query.session_id,
    {
      expand: ["line_items"],
    }
  );
  return { props: { order } };
}

const Success = ({ order }) => {
  const route = useRouter();
  return (
    <>
      <SEO pageTitle="Merci pour votre commande" />
      <main>
        <Wrapper
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.75 }}
        >
          <h1>Merci pour votre commande!</h1>
          <p>
            Un courriel a été envoyé à:{" "}
            <span className="email">{order.customer_details.email}</span>.
          </p>
          <Adresse>
            <Shipping>
              <h3>Envoyé à:</h3>
              <p>{order.shipping.name}</p>
              <p>{order.shipping.address.line1}</p>
              <p>{order.shipping.address.line2}</p>
              <p>{order.shipping.address.city}</p>
              <p>{order.shipping.address.state}</p>
              <p>{order.shipping.address.postal_code}</p>
              <p>{order.shipping.address.country}</p>
            </Shipping>
            <Billing>
              <h3>Facturé à:</h3>
              <p>{order.customer_details.name}</p>
              <p>{order.customer_details.address.line1}</p>
              <p>{order.customer_details.address.line2}</p>
              <p>{order.customer_details.address.city}</p>
              <p>{order.customer_details.address.state}</p>
              <p>{order.customer_details.address.postal_code}</p>
              <p>{order.customer_details.address.country}</p>
            </Billing>
          </Adresse>
          <Commande>
            <h3>Détails de la commande:</h3>

            {order.line_items.data.map((item) => (
              <Item key={item.id}>
                <p>Produit: {item.description}</p>
                <p>Qté: {item.quantity}</p>
                <p>Prix: {item.price.unit_amount / 100} $</p>
              </Item>
            ))}

            <h3>Sommaire de la commande:</h3>
            <p>Sous-total: {order.amount_subtotal / 100} $</p>

            {order.total_details.amount_discount > 0 && (
              <p>Discount: -{order.total_details.amount_discount / 100} $</p>
            )}

            <p>Expédition: {order.total_details.amount_shipping / 100} $</p>
            <p className="total">Total: {order.amount_total / 100} $</p>
          </Commande>
          <Button onClick={() => route.push("/")}>Continuer à magasiner</Button>
        </Wrapper>
      </main>
    </>
  );
};

export default Success;

const Wrapper = styled(motion.div)`
  margin: 0 auto;
  padding: 2rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  border-radius: 1rem;
  width: 40%;

  @media screen and (max-width: 1400px) {
    width: 60%;
  }

  @media screen and (max-width: 1200px) {
    width: 75%;
  }

  @media screen and (max-width: 960px) {
    width: 80%;
  }

  @media screen and (max-width: 900px) {
    width: 90%;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
  }

  .email {
    font-weight: bold;
  }
`;

const Adresse = styled.div`
  display: flex;
  width: 100%;
  margin: 1rem 0;

  @media screen and (max-width: 600px) {
    display: block;
  }
`;

const Shipping = styled.div`
  padding-right: 1rem;
`;

const Billing = styled.div`
  padding-left: 1rem;

  @media screen and (max-width: 600px) {
    padding: 1rem 0;
  }
`;

const Commande = styled.div`
  margin: 1rem 0;

  .total {
    font-weight: bold;
  }
`;

const Item = styled.div`
  margin-bottom: 1rem;
`;

const Button = styled.button`
  background: black;
  color: white;
  border: none;
  outline: none;
  padding: 1rem 2rem;
  cursor: pointer;
`;
