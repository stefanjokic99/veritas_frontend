import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Segment, Button, Header } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import CustomTextInput from "../../../app/common/Form/CustomTextInput";
import CustomTextArea from "../../../app/common/Form/CustomTextArea";
import CustomSelectInput from "../../../app/common/Form/CustomSelectInput";
import { typeOptions } from "../../../app/common/options/typeOptions";
import CustomDateInput from "../../../app/common/Form/CustomDateInput";
import { CourtCase } from "../../../models/case";
import { departmentOptions } from "../../../app/common/options/departmentOptions";

export default observer(function ActivityForm() {
  const { caseStore } = useStore();

  const { id } = useParams();
  const navigate = useNavigate();

  const [courtCase, setCourtCasse] = useState<CourtCase>(new CourtCase());

  const validationSchema = Yup.object({
    Name: Yup.string().required("Naziv slučaja je obavezno."),
    Description: Yup.string().required("Opis slučaja je obavezno."),
    Type: Yup.string().required(),
    Department: Yup.string().required("Odjeljenje je obavezno.").nullable(),
  });

  function handleFormSubmit(courtCase: CourtCase) {
    if (!courtCase.Id) {
      let newCase = {
        ...courtCase,
        id: uuid(),
      };
      caseStore.createCase(newCase).then(() => navigate(`/dashboard`));
    }
  }

  if (caseStore.loadingInitial)
    return <LoadingComponent content="Loading case ..." />;

  return (
    <Segment clearing>
      <Header content="Detalji slučaja" sub color="grey" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={courtCase}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <CustomTextInput name="Name" placeholder="Naziv slučaja" />
            <CustomTextArea
              rows={3}
              name="Description"
              placeholder="Opis slučaja"
            />
            <Header content="Detalji slučaja" sub color="grey" />
            <CustomSelectInput
              placeholder="Vrsta slučaja"
              name="Type"
              options={typeOptions}
            />
             <CustomSelectInput
              placeholder="Odjeljenje slučaja"
              name="Department"
              options={departmentOptions}
            />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={isSubmitting}
              floated="right"
              primary
              type="submit"
              content="Potvrdi kreiranje"
            />
            <Button
              as={Link}
              to="/dashboard"
              floated="right"
              type="button"
              content="Otkaži"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
