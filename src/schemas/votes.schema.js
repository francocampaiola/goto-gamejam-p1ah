import yup from "yup";

const requiredError = "Este campo es obligatorio";
const stringError = "El valor debe ser un texto";
const integerError = "El valor debe ser un número entero";
const minNumberError = "El valor debe ser mayor a 0";
const maxNumberError = "El valor debe ser menor o igual a 10";

const createVoteSchema = yup.object({
  id_judge: yup.string(stringError).required(requiredError),
  name_judge: yup.string(stringError).required(requiredError),
  id_game: yup.string(stringError).required(requiredError),
  name_game: yup.string(stringError).required(requiredError),
  gameplay: yup
    .number()
    .integer(integerError)
    .min(1, minNumberError)
    .max(10, maxNumberError)
    .required(requiredError),
  art: yup
    .number()
    .integer(integerError)
    .min(1, minNumberError)
    .max(10, maxNumberError)
    .required(requiredError),
  sound: yup
    .number()
    .integer(integerError)
    .min(1, minNumberError)
    .max(10, maxNumberError)
    .required(requiredError),
  affinity: yup
    .number()
    .integer(integerError)
    .min(1, minNumberError)
    .max(10, maxNumberError)
    .required(requiredError),
});

export { createVoteSchema };
