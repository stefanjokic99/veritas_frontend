import { ErrorMessage, Form, Formik } from "formik";
import CustomTextInput from "../../app/common/Form/CustomTextInput";
import { Button, Header } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import * as yup from "yup";
import ValidationErrors from "../errors/ValidationErrors";
import CustomSelectInput from "../../app/common/Form/CustomSelectInput";

export default observer(function RegisterPage() {
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
        initialValues={{
          forename: "",
          surename: "",
          parentName: "",
          jmbg: "",
          sex: "",
          email: "",
          username: "",
          password: "",
          passwordConfirm: "",
          error: null,
        }}
        onSubmit={(values, { setErrors }) =>
          userStore.register(values).catch((error) => setErrors({ error }))
        }
        validationSchema={yup.object({
          forename: yup.string().required("Morate unijeti vaše ime."),
          surename: yup.string().required("Morate unijeti vaše prezime"),
          jmbg: yup
            .string()
            .required("JMBG je obavezan.")
            .matches(/^[0-9]{13}$/, "JMBG format pogrešan."),
          sex: yup.string().required("Izabrani pol ne postoji."),
          email: yup
            .string()
            .email("Morate unijeti validan e-mail.")
            .required("Morate unijeti validan e-mail."),
          username: yup.string().required("Morate unijeti korisničko ime."),
          password: yup
            .string()
            .required("Morate unijeti lozinku.")
            .min(4, "Lozinka je prekratka - najmanja dužina 4 karaktera."),
          passwordConfirm: yup
            .string()
            .oneOf([yup.ref("password")], "Lozinke se ne podudaraju."),
        })}
      >
        {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
          <Form
            className="ui form error auth-form glass-effect text-center"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <h2 className="ui icon header text-center">
              <img
                src="/assets/veritas-logo.svg"
                style={{ color: "white" }}
              ></img>
              <div className="content" style={{ color: "white" }}>
                Registracija
              </div>
            </h2>
            <br />
            <span style={{ color: "white" }}>Posjedujete nalog?</span>{" "}
            <a href="/login">Prijava</a>
            <div className="ui grid">
              <div className="three column row" style={{ marginTop: "10px" }}>
                <div className="column">
                  <CustomTextInput placeholder="Ime" name="forename" />
                </div>
                <div className="column">
                  <CustomTextInput
                    placeholder="(Ime roditelja)"
                    name="parentName"
                  />
                </div>
                <div className="column">
                  <CustomTextInput placeholder="Prezime" name="surename" />
                </div>
              </div>
              <div className="row">
                <div className="eight wide column">
                  <CustomTextInput placeholder="JMBG" name="jmbg" />
                </div>
                <div className="three wide column">
                  <CustomSelectInput
                    placeholder="Pol"
                    name="sex"
                    options={[
                      { text: "Muško", value: "M" },
                      { text: "Žensko", value: "Z" },
                    ]}
                  />
                </div>
              </div>
              <div className="row">
                <div className="column">
                  <CustomTextInput placeholder="E-mail" name="email" />
                </div>
              </div>
              <div className="row">
                <div className="column">
                  <CustomTextInput
                    placeholder="Korisničko ime"
                    name="username"
                  />
                </div>
              </div>
              <div className="row">
                <div className="column">
                  <CustomTextInput
                    type="password"
                    placeholder="Lozinka"
                    name="password"
                  />
                </div>
              </div>
              <div className="row">
                <div className="column">
                  <CustomTextInput
                    type="password"
                    placeholder="Lozinka (Potvrda)"
                    name="passwordConfirm"
                  />
                </div>
              </div>
              <ErrorMessage
                name="error"
                render={() => <ValidationErrors errors={errors.error} />}
              />
              <div className="row">
                <div className="column">
                  <Button
                    disabled={!isValid || !dirty || isSubmitting}
                    loading={isSubmitting}
                    content="Registracija"
                    type="submit"
                    fluid
                    inverted
                    className="margin-auto"
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
});
