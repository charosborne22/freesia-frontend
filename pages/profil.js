import { useRouter } from "next/router";
const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import styled from "styled-components";
import SEO from "../components/SEO";
import Link from "next/link";

const { motion } = require("framer-motion");

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = getSession(ctx.req, ctx.res);
    const stripeId = session.user[`${process.env.BASE_URL}/stripe_customer_id`];
    const paymentIntents = await stripe.paymentIntents.list({
      customer: stripeId,
    });

    return { props: { orders: paymentIntents.data } };
  },
});

export default function Profil({ user, orders }) {
  const route = useRouter();

  return (
    user && (
      <>
        <SEO pageTitle="Mon Profil" />
        <main>
          <Wrapper
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.75 }}
          >
            <User>
              <Img>
                <img src={user.picture} alt={user.name} />
              </Img>

              <UserInfo>
                <h1>{user.name}</h1>
                <p>{user.email}</p>
              </UserInfo>
            </User>

            {orders.length > 0 && (
              <TableWrapper>
                <Table>
                  <thead>
                    <tr>
                      <th>Nombre de commande</th>
                      <th>Total</th>
                      <th>Reçu</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.amount / 100} $</td>
                        <td>
                          <Link href={order.charges.data[0].receipt_url}>
                            <a target="_blank">Voir</a>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </TableWrapper>
            )}

            {orders.length <= 0 && (
              <Rien>Aucune commande n&apos;a été trouvée</Rien>
            )}

            <Logout onClick={() => route.push("/api/auth/logout")}>
              Se déconnecter
            </Logout>
          </Wrapper>
        </main>
      </>
    )
  );
}

const Wrapper = styled(motion.div)`
  margin: 0 auto;
  padding: 2rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  border-radius: 1rem;
`;

const User = styled.div`
  display: flex;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;
const Img = styled.div`
  display: flex;
  padding-right: 2rem;

  img {
    border-radius: 50%;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    word-break: break-all;
  }
`;

const Logout = styled.button`
  background: black;
  color: white;
  border: none;
  outline: none;
  padding: 1rem 2rem;
  cursor: pointer;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  margin: 2rem 0;

  border-collapse: collapse;
  border-spacing: 0;

  th {
    text-align: left;
    font-size: 1.5rem;
    padding: 0 1rem 1rem 0;
  }

  td {
    padding: 1rem 1rem 1rem 0;
  }

  tbody {
    tr {
      border-top: 1px solid #e5e5e5;
      transition: all;
      transition-duration: 0.5s;

      &:hover {
        background: #f2f2f2;
      }
    }
  }

  a {
    text-decoration: underline;
  }
`;

const Rien = styled.p`
  margin: 2rem 0;
  font-style: italic;
`;
