import cfg from "./config.json";
import axios from "axios";

/**
 * Obtiene la información de un usuario por su id a través del endpoint.
 *
 * @param {Number} userId Id de usuario.
 * @returns Promise de la info.
 */
export async function getUserInfo(userId) {
  const response = await axios
    .get(cfg.API_URL + cfg.endpoints.STUDENTS, {
      signal: AbortSignal.timeout(5000),
      params: { Id: userId },
    })
    .then((res) => {
      return { ...res.data[0], status: "ok" }; // solo hay un usuario por id
    })
    .catch((err) => handleError(err, "Error al obtener la información del usuario."));

  return response;
}

/**
 * Obtiene la información de la tanda del usuario actual a través del endpoint dado.
 *
 * @param {*} numTanda Número de tanda del usuario.
 * @returns Promise de la información de la tanda.
 */
export async function getTanda(numTanda) {
  const response = await axios
    .get(cfg.API_URL + cfg.endpoints.TANDAS, {
      signal: AbortSignal.timeout(5000),
      params: { Tanda: numTanda },
    })
    .then((res) => {
      return { ...res.data[0], status: "ok" }; // tandas únicas
    })
    .catch((err) => handleError(err, "Error al cargar la información de la tanda."));

  return response;
}

/**
 * Consulta la lista de cursos según el nivel académico dado.
 *
 * @param {*} level Nivel académico de los cursos a consultar
 * @returns Promise con la lista de los cursos.
 */
export async function getCoursesByLevel(level) {
  const response = await axios
    .get(cfg.API_URL + cfg.endpoints.COURSES, {
      signal: AbortSignal.timeout(5000),
      params: { Nivel: level },
    })
    .then((res) => {
      return { list: res.data, status: "ok" };
    })
    .catch((err) => handleError(err, "Error al cargar los cursos del usuario."));

  return response;
}

/**
 * Consulta la lista de grupos de un curso.
 *
 * @param {*} courseId Id del curso a consultar.
 * @returns Promise con lista de la información de los grupos.
 */
export async function getCourseGroups(courseId) {
  const response = axios
    .get(cfg.API_URL + cfg.endpoints.ACADEMIC_SCHEDULE, {
      signal: AbortSignal.timeout(5000),
      params: {
        IdCurso: courseId,
      },
    })
    .then((res) => {
      return { list: res.data, status: "ok" };
    })
    .catch((err) => handleError(err, "Error al cargar los grupos para esta materia."));

  return response;
}

function handleError(err, customMsg) {
  var info = "";
  var status = "";
  if (err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error("Error");
    info = "Hubo respuesta del servidor, pero ocurrió un error.";
    status = "error"
  } else if (err.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.error("Server Error");
    info = "No hubo respuesta del servidor.";
    status = "server-error"
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error("Request Error");
    info = "Error en la configuración de la solicitud.";
    status = "request-error"
  }

  console.error(err);

  return {
    status: status,
    customMessage: customMsg,
    info: info,
  };
}
