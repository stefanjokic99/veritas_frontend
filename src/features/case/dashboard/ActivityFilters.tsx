import React from "react";
import { Calendar } from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

export default function CaseFilters() {
  return (
    <>
      <Menu vertical size="large" style={{ width: "100%", marginTop: 25 }}>
        <Header icon="filter" attached color="blue" content="Filteri" />
        <Menu.Item content="Svi slučajevi" />
        <Menu.Item content="Slučajevi na kojima učestvujem" />
      </Menu>
      <Header />
      <Calendar />
    </>
  );
}
