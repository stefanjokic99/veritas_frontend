import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import * as yup from "yup";
import _ from "@lodash";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AuthService from "src/app/auth/services/authService";
import { showMessage } from "app/store/fuse/messageSlice";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Morate unijeti validan e-mail.")
    .required("Morate unijeti validan e-mail."),
  password: yup
    .string()
    .required("Morate unijeti lozinku.")
    .min(4, "Lozinka je prekratka - najmanja dužina 4 karaktera."),
});

const defaultValues = {
  email: "",
  password: "",
  remember: true,
};

function SignInPage() {
  const dispatch = useDispatch();

  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    setValue("email", "stefan@jokic.com", {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("password", "Pa$$w0rd", {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [setValue]);

  function onSubmit({ email, password }) {
    AuthService.login(email, password).then(
      (response) => {
        if (response) {
          localStorage.setItem("access_token", response?.data?.token);

          AuthService.currentUser().then((currentUser) => {
            if (currentUser) {
              localStorage.setItem(
                "current_user",
                JSON.stringify(currentUser?.data)
              );
              window.location.href = "/dashboard";
            }
          });
        }
      },
      (err) => {
        if (err) {
          setValue("password", "", { shouldDirty: true, shouldValidate: true });
          dispatch(
            showMessage({
              message: err?.response?.data || "Molimo vas pokušajte ponovo.",
            })
          );
        }
      }
    );
  }

  return (
    <div
      className="flex flex-col sm:flex-row items-center md:items-center sm:justify-center md:justify-center flex-1 min-w-0"
      style={{
        background: "url(assets/images/apps/sign-in/backgroud-2.png)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-center w-full sm:w-auto md:h-70 md:w-50 py-8 px-16 sm:p-48 md:p-64 bg-transparent login-form	glass-effect">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <img
            className="w-48"
            src="assets/images/logo/veritas-logo.svg"
            alt="logo"
          />
          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Prijava
          </Typography>
          <div className="flex items-baseline mt-2 font-medium">
            <Typography>Da li posjedujete nalog? </Typography>
            <Link className="ml-4" to="/sign-up">
              Registracija
            </Link>
          </div>

          <form
            name="loginForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="E-mail"
                  autoFocus
                  type="email"
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Lozinka"
                  type="password"
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
              <Controller
                name="remember"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormControlLabel
                      label="Zapamti me"
                      control={<Checkbox size="small" {...field} />}
                    />
                  </FormControl>
                )}
              />

              <Link
                className="text-md font-medium"
                to="/pages/auth/forgot-password"
              >
                Zaboravili ste šifru?
              </Link>
            </div>

            <Button
              variant="contained"
              color="secondary"
              className=" w-full mt-16"
              aria-label="Sign in"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
            >
              Prijavi se
            </Button>
          </form>
        </div>
      </Paper>
    </div>
  );
}

export default SignInPage;
