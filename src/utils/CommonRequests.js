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
export async function getUserInfo(userId) {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_STUDENTS_ENDPOINT}/${userId}`,
      {
        signal:
          process.env.REACT_APP_BYPASS_TIMEOUTS === "1"
            ? undefined
            : AbortSignal.timeout(5000),
      }
    );
    return { ...res.data, status: STATUS.OK };
  } catch (err) {
    return handleError(err, "Error al obtener la información del usuario.");
  }
}

export function getOferta(idOferta) {
  return axios
    .get(process.env.REACT_APP_OFFER_ENDPOINT, {
      signal:
        process.env.REACT_APP_BYPASS_TIMEOUTS === "1"
          ? undefined
          : AbortSignal.timeout(5000),
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
    .get(process.env.REACT_APP_COURSES_ENDPOINT, {
      signal:
        process.env.REACT_APP_BYPASS_TIMEOUTS === "1"
          ? undefined
          : AbortSignal.timeout(5000),
      params: {
        codigo: courseId,
      },
    })
    .then((res) => ({ list: res.data, status: STATUS.OK }))
    .catch((err) =>
      handleError(err, "Error al cargar los grupos para esta materia.")
    );
}

export function sendMatricula(infoMatricula) {
  const body = {
    estudianteId: infoMatricula.idEstudiante,
    semestre: infoMatricula.semestre,
    gruposId: infoMatricula.selectedGroups
      .filter((group) => group.groupSelected)
      .map((group) => group.grupoId),
  };
  return axios
    .post(
      process.env.REACT_APP_REGISTRATION_ENDPOINT,
      { ...body },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    .then((res) => res)
    .catch((err) => handleError(err, "Error al enviar la matricula."));
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
