export const getPagination = (page, size) => {
  const limit = size ? +size : 3; // solo mostrara 3 objetos
  const offset = page ? page * limit : 0; // page * limit hace que no se repita el offset
  return { limit, offset }; // retorna la cantidad de páginas y de docs que se saltara
};
