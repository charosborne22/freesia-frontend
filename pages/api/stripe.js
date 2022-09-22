import Stripe from "stripe";
import { getSession } from "@auth0/nextjs-auth0";

const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

// Proceder les paiments
export default async function handler(req, res) {
  const session = getSession(req, res);
  const user = session?.user;

  if (user) {
    const stripeId = user["http://localhost:3000/stripe_customer_id"];
    if (req.method === "POST") {
      try {
        //  Créer une session de paiement
        const session = await stripe.checkout.sessions.create({
          submit_type: "pay",
          mode: "payment",
          customer: stripeId,
          payment_method_types: ["card"],
          billing_address_collection: "required",
          shipping_address_collection: {
            allowed_countries: ["CA"],
          },
          shipping_options: [
            { shipping_rate: "shr_1LILaKLnYCmOTbMQGXyo1mDV" },
            { shipping_rate: "shr_1LILTZLnYCmOTbMQvOlkNBpA" },
          ],

          // Récupérer la liste de produits du panier
          line_items: req.body.map((item) => {
            return {
              price_data: {
                currency: "cad",
                product_data: {
                  name: item.titre,
                  images: [item.image.data.attributes.formats.thumbnail.url],
                },
                unit_amount: item.prix * 100,
              },
              adjustable_quantity: {
                enabled: true,
                minimum: 1,
              },
              quantity: item.quantitie,
            };
          }),
          // Accéder à la page de rréussite ou d'annulation
          success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${req.headers.origin}/canceled`,
        });
        res.status(200).json(session);
      } catch (error) {
        res.status(error.statusCode || 500).json(error.message);
      }
    } else {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
    }
  } else {
    if (req.method === "POST") {
      try {
        //  Créer une session de paiement
        const session = await stripe.checkout.sessions.create({
          submit_type: "pay",
          mode: "payment",
          payment_method_types: ["card"],
          billing_address_collection: "required",
          shipping_address_collection: {
            allowed_countries: ["CA"],
          },
          shipping_options: [
            { shipping_rate: "shr_1LILaKLnYCmOTbMQGXyo1mDV" },
            { shipping_rate: "shr_1LILTZLnYCmOTbMQvOlkNBpA" },
          ],

          // Récupérer la liste de produits du panier
          line_items: req.body.map((item) => {
            return {
              price_data: {
                currency: "cad",
                product_data: {
                  name: item.titre,
                  images: [item.image.data.attributes.formats.thumbnail.url],
                },
                unit_amount: item.prix * 100,
              },
              adjustable_quantity: {
                enabled: true,
                minimum: 1,
              },
              quantity: item.quantitie,
            };
          }),
          // Accéder à la page de rréussite ou d'annulation
          success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${req.headers.origin}/canceled`,
        });
        res.status(200).json(session);
      } catch (error) {
        res.status(error.statusCode || 500).json(error.message);
      }
    } else {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
    }
  }
}
