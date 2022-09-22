import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useUser } from "@auth0/nextjs-auth0/dist/frontend/use-user";

export default function User() {
  const route = useRouter();
  const { user } = useUser();
  if (!user)
    return (
      <StyledUser
        onClick={() => {
          route.push("/api/auth/login");
        }}
      >
        <FontAwesomeIcon icon={faUserCircle} />
      </StyledUser>
    );

  return (
    <Profile title={user.name} onClick={() => route.push("/profil")}>
      <img src={user.picture} alt={user.name} />
    </Profile>
  );
}

const StyledUser = styled.div`
  cursor: pointer;
  padding: 0 0.5rem;
  margin: 0 0.5rem;
`;

const Profile = styled.div`
  padding: 0 0.5rem;
  margin: 0 0.5rem;
  cursor: pointer;
  img {
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
  }
`;
