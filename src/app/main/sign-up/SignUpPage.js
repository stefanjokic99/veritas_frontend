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
import FormHelperText from "@mui/material/FormHelperText";
import { MenuItem, Select } from "@mui/material";
import AuthService from "src/app/auth/services/authService";
import { useDispatch } from "react-redux";
import EmployeeService from "src/app/services/EmployeeService";
import { showMessage } from "app/store/fuse/messageSlice";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  forename: yup.string().required("Morate unijeti vaše ime."),
  surename: yup.string().required("Morate unijeti vaše prezime"),
  jmbg: yup
    .string()
    .required("JMBG je obavezan.")
    .matches(/^[0-9]{13}$/, "JMBG format pogrešan."),
  sex: yup.string().matches("^(M|Z)$", "Izabrani pol ne postoji."),
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
    .oneOf([yup.ref("password"), null], "Lozinke se ne podudaraju."),
  acceptTermsConditions: yup
    .boolean()
    .oneOf([true], "Uslovi i odredbe moraju biti prihvaćeni."),
});

const defaultValues = {
  forename: "",
  surename: "",
  parentName: "",
  jmbg: "",
  sex: "",
  email: "",
  username: "",
  password: "",
  passwordConfirm: "",
  acceptTermsConditions: false,
};

function SignUpPage() {
  const dispatch = useDispatch();

  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, setError } = formState;

  async function onSubmit({
    forename,
    surename,
    parentName,
    jmbg,
    email,
    sex,
    username,
    password,
  }) {
    await AuthService.register({
      forename,
      surename,
      email,
      password,
      username,
    })
      .then((response) => {
        if (response) {
          localStorage.setItem("access_token", response?.data?.token);

          AuthService.currentUser().then((currentUser) => {
            if (currentUser) {
              localStorage.setItem(
                "current_user",
                JSON.stringify(currentUser?.data)
              );
            }
          });
        }
      })
      .catch((err) => {
        dispatch(
          showMessage({
            message: err?.response?.data || "Molimo vas pokušajte ponovo.",
          })
        );
      });

    await EmployeeService.createEmployee({
      forename,
      surename,
      sex,
      parentName,
      jmbg,
    })
      .then((employee) => {
        window.location.href = "/dashboard";
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          showMessage({
            message: err?.response?.data || "Molimo vas pokušajte ponovo.",
          })
        );
      });
  }

  return (
    <div
      className="flex flex-col flex-1 min-w-0"
      style={{
        background: "url(assets/images/apps/sign-in/backgroud-2.png)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Paper className="h-full sm:h-full md:flex md:items-center md:justify-center w-full sm:w-auto md:h-70 md:w-50 py-6 px-16 sm:p-48 md:p-32 bg-transparent	glass-effect">
        <div className="w-full max-w-480">
          <div className="flex">
            <div className="grow-[1] basis-0 flex justify-center">
              <img
                className="w-48"
                src="assets/images/logo/veritas-logo.svg"
                alt="logo"
              />
            </div>
            <div className="grow-[4] basis-0">
              <Typography className="text-4xl font-extrabold tracking-tight leading-tight">
                Registracija
              </Typography>
              <div className="flex items-baseline mt-2 font-medium">
                <Typography>Posjedujete nalog?</Typography>
                <Link className="ml-4" to="/sign-in">
                  Prijava
                </Link>
              </div>
            </div>
          </div>

          <form
            name="registerForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex">
              <div className="grow">
                <Controller
                  name="forename"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="w-full mb-24 pr-1"
                      label="Ime"
                      autoFocus
                      type="name"
                      error={!!errors.forename}
                      helperText={errors?.forename?.message}
                      variant="outlined"
                      required
                    />
                  )}
                />
              </div>
              <div className="grow">
                <Controller
                  name="parentName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="w-full mb-24 pr-1 pl-1"
                      label="(Ime roditelja)"
                      autoFocus
                      type="name"
                      variant="outlined"
                    />
                  )}
                />
              </div>
              <div className="grow">
                <Controller
                  name="surename"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="w-full mb-24 pl-1"
                      label="Prezime"
                      autoFocus
                      type="name"
                      error={!!errors.surename}
                      helperText={errors?.surename?.message}
                      variant="outlined"
                      required
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex">
              <div className="grow-[3] basis-0">
                <Controller
                  name="jmbg"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-24 pr-1"
                      label="JMBG"
                      autoFocus
                      type="name"
                      error={!!errors.jmbg}
                      helperText={errors?.jmbg?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />
              </div>
              <div className="grow-[1] basis-0">
                <Controller
                  name="sex"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="w-full mb-24 pl-1"
                      label="Pol"
                      autoFocus
                      error={!!errors.sex}
                      helperText={errors?.sex?.message}
                      required
                    >
                      <MenuItem value={"M"}>Muško</MenuItem>
                      <MenuItem value={"Z"}>Žensko</MenuItem>
                    </Select>
                  )}
                />
              </div>
            </div>

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="E-mail"
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
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Korisničko ime"
                  type="email"
                  error={!!errors.username}
                  helperText={errors?.username?.message}
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

            <Controller
              name="passwordConfirm"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Lozinka (Potvrda)"
                  type="password"
                  error={!!errors.passwordConfirm}
                  helperText={errors?.passwordConfirm?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="acceptTermsConditions"
              control={control}
              render={({ field }) => (
                <FormControl
                  className="items-center"
                  error={!!errors.acceptTermsConditions}
                >
                  <FormControlLabel
                    label="Slažem se sa Uslovima korištenja usluge i Politikom privatnosti."
                    control={<Checkbox size="small" {...field} />}
                  />
                  <FormHelperText>
                    {errors?.acceptTermsConditions?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />

            <Button
              variant="contained"
              color="secondary"
              className="w-full mt-24"
              aria-label="Register"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
            >
              Kreiraj nalog
            </Button>
          </form>
        </div>
      </Paper>
    </div>
  );
}

export default SignUpPage;
