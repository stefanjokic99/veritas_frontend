import { Button, Container, Menu, Image, Dropdown } from "semantic-ui-react";

import { Link, NavLink } from "react-router-dom";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

export default observer(function NavBar() {
  const {
    userStore: { user, logout },
  } = useStore();

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" header>
          <img
            src="/assets/veritas-logo.svg"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          eritas
        </Menu.Item>
        <Menu.Item as={NavLink} to="/dashboard" name="Sudski slučajevi" />
        <Menu.Item position="right">
          <Button
            as={NavLink}
            to="/case/create"
            primary
            basic
            content="Otvori slučaj"
          />
        </Menu.Item>
        <Menu.Item >
          <Image
            src={"/assets/user.jpg"}
            avatar
            spaced="right"
          />
          <Dropdown pointing="top left" text={user?.displayName}>
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to={`/profile/${user?.username}`}
                text="Lične informacije"
                icon="user"
              />
              <Dropdown.Item onClick={logout} text="Odjava" icon="power" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  );
});
