import Head from "next/head";

const SEO = ({ pageTitle }) => {
  return (
    <Head>
      <title>{`Freesia | ${pageTitle}`}</title>
      <meta name="description" content="Freesia" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Freesia" />
      <meta property="og:description" content="Freesia" />
      <meta property="og:site_name" content="Freesia" />
      <meta property="twitter:card" content="Freesia" />
      <meta property="twitter:title" content="Freesia" />
      <meta property="twitter:description" content="Freesia" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
};

export default SEO;
