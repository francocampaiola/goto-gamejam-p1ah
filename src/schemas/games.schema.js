import yup from 'yup';

const createGameSchema = yup.object({
    name: yup.string("El nombre del juego debe ser un string").required("El nombre del juego es un campo requerido."),
    genre: yup.string("El género del juego debe ser un string").required("El género del juego es un campo requerido"),
    members: yup.array("Los desarrolladores del juego deben estar contenidos en un array").required("Los desarrolladores del juego es un campo requerido"),
    edition: yup.number("La edición del juego debe ser un número que indique el año de lanzamiento").required("La edición del juego es un campo requerido")
});

export default {
    createGameSchema
}

export {
    createGameSchema
}