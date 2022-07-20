import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const Produit = ({ produit }) => {
  const { titre, prix, image, slug } = produit.attributes;

  return (
    <Link href={`/produit/${slug}`}>
      <Details>
        <Image
          src={image.data.attributes.formats.medium.url}
          alt={image.data.attributes.alternativeText}
          width="600"
          height="600"
        />
        <h2>{titre}</h2>
        <p>{prix} $</p>
      </Details>
    </Link>
  );
};

export default Produit;

const Details = styled.div`
  cursor: pointer;
  text-align: center;

  img {
    max-width: 100%;
    max-height: 100%;
    z-index: -1;
  }
`;
