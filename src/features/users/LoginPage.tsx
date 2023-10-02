import { ErrorMessage, Form, Formik } from "formik";
import CustomTextInput from "../../app/common/Form/CustomTextInput";
import { Button, Header, Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";


export default observer(function LoginPage() {
  const { userStore } = useStore();

  return (
    <div
      style={{
        background: "url(assets/background-home-page.png)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100vh",
      }}
      className="auth-page"
    >
      <Formik
        initialValues={{ email: "", password: "", error: null }}
        onSubmit={(values, { setErrors }) =>
          userStore.login(values).catch((error) =>
            setErrors({
              error: "Pogrešno korisničko ime ili šifra. Pokušajte ponovo",
            })
          )
        }
      >
        {({ handleSubmit, isSubmitting, errors }) => (
          <Form
            className="ui form auth-form glass-effect text-center"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
           
            <h2 className="ui icon header text-center">
              <img
                src="/assets/veritas-logo.svg"
                style={{ color: "white" }}
              ></img>
              <div className="content" style={{ color: "white" }}>Prijava</div>
            </h2><br/>

            <span style={{ color: "white" }}>Da li posjedujete nalog?</span>{" "}
            <a href="/register">Registracija</a>
            <CustomTextInput placeholder="Email" name="email" class="w-80" />
            <CustomTextInput
              placeholder="Password"
              name="password"
              type="password"
              class="w-80"
            />
            <ErrorMessage
              name="error"
              render={() => (
                <Label
                  style={{ marginBottom: 10 }}
                  basic
                  color="red"
                  content={errors.error}
                />
              )}
            />
            <Button
              loading={isSubmitting}
              content="Prijava"
              type="submit"
              fluid
              inverted
              className="w-80 margin-auto"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
});
