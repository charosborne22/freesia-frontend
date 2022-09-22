import SEO from "../../components/SEO";
import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStateContext } from "../../lib/context";
import toast from "react-hot-toast";
const Details = () => {
  const { qty, increaseQty, decreaseQty, onAdd, setQty } = useStateContext();

  // Réinitialiser la quantité
  useEffect(() => {
    setQty(1);
  }, []);

  // Récupérer le slug
  const { query } = useRouter();

  // Récupérer graphql
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.slug },
  });

  const { data, fetching, error } = results;

  if (fetching) return <p>Chargement...</p>;
  if (error) return <p>Oh non... {error.message}</p>;

  // Extraire les données
  const { titre, description, image, prix } = data.produits.data[0].attributes;

  // Créer un toast
  const notify = () => {
    toast.success(`${titre} a été ajouté à votre panier`, { duration: 2000 });
  };

  console.log(data.produits.data[0].attributes);

  return (
    <>
      <SEO pageTitle={titre} />

      <main>
        <Wrapper>
          <Image
            src={image.data.attributes.formats.large.url}
            alt={image.data.attributes.alternativeText}
            width={800}
            height={800}
            objectFit="contain"
          />
          <Description>
            <h1>{titre}</h1>
            <h3>{prix} $</h3>
            <p>{description}</p>

            <Quantity>
              <FontAwesomeIcon icon={faCircleMinus} onClick={decreaseQty} />
              <span>{qty}</span>
              <FontAwesomeIcon icon={faCirclePlus} onClick={increaseQty} />
            </Quantity>

            <Button
              onClick={() => {
                onAdd(data.produits.data[0].attributes, qty);
                notify();
              }}
            >
              Ajouter au Panier
            </Button>
          </Description>
        </Wrapper>
      </main>
    </>
  );
};

export default Details;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  h3 {
    margin: 1rem 0;
  }

  img {
    z-index: -1;
  }

  @media screen and (max-width: 600px) {
    display: block;
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 800px;
  margin-left: 2rem;

  @media screen and (max-width: 600px) {
    margin-left: 0;
  }
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
  background: black;
  border: none;
  outline: none;
  padding: 1rem 2rem;
  color: white;
  cursor: pointer;
`;
