import yup from "yup";

const requiredError = "Este campo es obligatorio";
const positiveError = "El valor debe ser positivo";
const integerError = "El valor debe ser un número entero";
const stringError = "El valor debe ser un texto";
const arrayError = "El valor debe ser un array";

const createGameSchema = yup.object({
  name: yup.string(stringError).required(requiredError),
  genre: yup.string(stringError).required(requiredError),
  members: yup.array(arrayError).of(yup.string(stringError)).required(requiredError),
  edition: yup
    .number(integerError)
    .positive(positiveError)
    .integer(integerError)
    .required(requiredError),
});

export { createGameSchema };
