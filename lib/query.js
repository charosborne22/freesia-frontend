// Récupérer la liste de produits
export const PRODUCT_QUERY = `
query {
    produits {
      data {
        attributes {
          titre
          description
          slug
          prix,
          image {
            data {
              attributes {
                alternativeText
                formats
              }
            }
          }
        }
      }
    }
  }
`;

// Récupérer chaque produit selon le slug
export const GET_PRODUCT_QUERY = `
    query getProducts($slug:String!) {
        produits(filters: {slug :{eq: $slug}}) {
            data {
                attributes {
                    titre
                    description
                    slug
                    prix,
                    image {
                        data {
                          attributes {
                            alternativeText
                            formats
                          }
                        }
                      }
                }
            }
        }
    }
`;
