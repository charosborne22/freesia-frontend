import SEO from "../components/SEO";
import Produit from "../components/Produit";
import { useQuery } from "urql";
import { PRODUCT_QUERY } from "../lib/query";
import styled from "styled-components";
const { motion } = require("framer-motion");

// L'animation
const fade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { ease: "easeOut", duration: 0.75 },
  },
};

export default function Home() {
  // Récupérer les produits de Strapi
  const [results] = useQuery({ query: PRODUCT_QUERY });

  const { data, fetching, error } = results;
  // Verifier les données
  if (fetching) return <p>Chargement...</p>;
  if (error) return <p>Oh non... {error.message}</p>;
  const produits = data.produits.data;

  return (
    <>
      <SEO pageTitle="Home" />
      <Hero></Hero>
      <main>
        <Heading>Notre Produits</Heading>
        <Gallery>
          {produits &&
            produits.map((produit) => (
              <motion.div
                variants={fade}
                initial="hidden"
                key={produit.attributes.slug}
                whileInView="visible"
              >
                <Produit produit={produit} />
              </motion.div>
            ))}
        </Gallery>
      </main>
    </>
  );
}

const Gallery = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  grid-gap: 2rem;
`;

const Hero = styled.div`
  background: url("../hero2.jpg") center no-repeat;
  background-size: cover;
  width: 100vw;
  margin: 0 calc(-50vw + 50%);
  height: 75vh;
  margin-bottom: 3rem;
  overflow-x: visible;
`;

const Heading = styled.h2`
  text-align: center;
  padding-bottom: 2rem;
`;
