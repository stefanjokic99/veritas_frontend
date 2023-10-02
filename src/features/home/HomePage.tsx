import { observer } from "mobx-react-lite";
import { Link, useNavigate } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default observer(function HomePage() {
  const { userStore } = useStore();
  const navigate = useNavigate();

  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/veritas-logo.svg"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          eritas
        </Header>
        {userStore.isLoggedIn ? (
          <>
            <Header as="h2" inverted content="Dobrodošli u Veritas" />
            <Button as={Link} to="/slucajevi" size="huge" inverted>
              Glavna stranica
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => navigate(`/login`) }
              to="/login"
              size="huge"
              inverted
            >
              Prijava
            </Button>
            <Button
              onClick={() => navigate(`/register`) }
              to="/register"
              size="huge"
              inverted
            >
              Registracija
            </Button>
          </>
        )}
      </Container>
    </Segment>
  );
});
