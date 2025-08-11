import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

const MyTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea
        className={`text-input ${props.className || ""}`}
        {...field}
        {...props}
        style={{ borderColor: meta.touched && meta.error ? "red" : "white" }}
      />
    </>
  );
};

const DateInputForm = ({ handleSubmit }) => {
  return (
    <Formik
      initialValues={{ year: "", month: "", day: "" }}
      validationSchema={Yup.object({
        year: Yup.number().required("Required"),
        month: Yup.number().required("Required"),
        day: Yup.number().required("Required"),
      })}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        handleSubmit(values);
        setSubmitting(false);
        resetForm();
      }}
    >
      <Form className="DateInputForm">
        <MyTextArea name="year" type="number" placeholder="YYYY" />
        <MyTextArea name="month" type="number" placeholder="MM" />
        <MyTextArea name="day" type="number" placeholder="DD" />
        <div>
          <button type="submit">Submit</button>
          <button
            type="button"
            onClick={() => {
              const today = new Date().toISOString();
              localStorage.setItem("ViewThePlanetsDate", today);
              const [year, month, day] = new Date()
                .toISOString()
                .split("T")[0]
                .split("-")
                .map(Number);
              handleSubmit({ year, month, day });
            }}
          >
            Today
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default DateInputForm;
