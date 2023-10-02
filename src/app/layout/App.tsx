import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useStore } from "../stores/store";
import { useEffect } from "react";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";
import NavBar from "./NavBar";
import HomePage from "../../features/home/HomePage";
import LoginPage from "../../features/users/LoginPage";
import RegisterPage from "../../features/users/RegisterPage";

function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [ commonStore, userStore ]);

  if (!commonStore.appLoaded) return <LoadingComponent content="" />

  return (
    <>
      <ModalContainer />
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      {location.pathname === "/" ? (
        <HomePage />
      ) :
      (location.pathname === "/login" && !commonStore.token) ? (
        <LoginPage />
      ) :
      (location.pathname === "/register" && !commonStore.token) ? (
        <RegisterPage />
      ) :
      (
        <>
          <NavBar />
          <Container style={{ marginTop: "7em" }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  )
}

export default observer(App);
