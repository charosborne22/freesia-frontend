import styled from "styled-components";
import Link from "next/link";

const Footer = () => {
  // L'année en cours
  const year = new Date().getFullYear();
  return (
    <StyledFooter>
      <p>
        Copyright &copy; {year} <Link href="/">Freesia</Link>
      </p>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.footer`
  width: 100vw;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 calc(-50vw + 50%);
  margin-top: 2rem;
  background: black;

  p {
    color: white;
  }
`;
