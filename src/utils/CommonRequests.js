import cfg from "utils/config";
import axios from "axios";

export const STATUS = {
  OK: Symbol(""),
  WARNING: Symbol(""),
  PENDING: Symbol(""),
  ERROR: Symbol(""),
};

/**
 * Obtiene la información de un usuario por su id.
 *
 * @param {Number} userId Id de usuario.
 * @returns Promise de la info.
 */
export function getUserInfo(userId) {
  return axios
    .get(`${cfg.API_URL + cfg.endpoints.STUDENTS}/${userId}`, {
      signal: cfg.BYPASS_TIMEOUTS ? undefined : AbortSignal.timeout(5000),
    })
    .then((res) => ({ ...res.data, status: STATUS.OK }))
    .catch((err) =>
      handleError(err, "Error al obtener la información del usuario.")
    );
}

export function getOferta(idOferta) {
  return axios
    .get(cfg.API_URL + cfg.endpoints.OFFER, {
      signal: cfg.BYPASS_TIMEOUTS ? undefined : AbortSignal.timeout(5000),
      params: { id: idOferta },
    })
    .then((res) => ({ ...res.data, status: STATUS.OK }))
    .catch((err) =>
      handleError(err, "Error al obtener la información de la oferta.")
    );
}
/**
 * Consulta la lista de grupos de un curso.
 *
 * @param {*} courseId Id del curso a consultar.
 * @returns Promise con lista de la información de los grupos.
 */
export function getGroupsByCourseId(courseId) {
  return axios
    .get(cfg.API_URL + cfg.endpoints.COURSES, {
      signal: cfg.BYPASS_TIMEOUTS ? undefined : AbortSignal.timeout(5000),
      params: {
        codigo: courseId,
      },
    })
    .then((res) => ({ list: res.data, status: STATUS.OK }))
    .catch((err) =>
      handleError(err, "Error al cargar los grupos para esta materia.")
    );
}

function handleError(err, customMsg) {
  let info = "";
  if (err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    info = "Error: Hubo respuesta del servidor, pero ocurrió un error.";
  } else if (err.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    info = "ServerError: No hubo respuesta del servidor.";
  } else {
    // Something happened in setting up the request that triggered an Error
    info = "RequestError: Error en la configuración de la solicitud.";
  }

  console.error(info);
  console.error(err);

  return {
    status: STATUS.ERROR,
    customMessage: customMsg,
    info,
    ...err,
  };
}
