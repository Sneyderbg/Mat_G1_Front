import { useState, useEffect } from "react";

/**
 * Componente que muestra la tabla de los cursos obligatorios ofertados.
 *
 * @param {*} props Propiedades = {userInfo, endpoint, showGroupsPopup, setCourseId}
 * @returns Render del componente.
 */
export function CoursesTable(props) {
  const [courses, setCourses] = useState([]);

  // Actualiza la lista de cursos cada vez que cambie la información del usuario
  useEffect(() => {
    if (props.userInfo.hasOwnProperty("Semestre académico")) {
      getCoursesByLevel(props.userInfo["Semestre académico"], props.endpoint)
        .then((list) => setCourses(list))
        .catch((err) => {
          console.error(err);
        });
    }
  }, [props.userInfo, props.endpoint]);

  return (
    <div className="tabla">
      {courses.hasOwnProperty("error") ? (
        <div id="errorCursos">
          <h3>{courses.error.reason}</h3>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Materia</th>
              <th>Créditos</th>
              <th>Horario</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, idx) => {
              return (
                <tr key={idx}>
                  <td>{course["IDCurso"]}</td>
                  <td>{course["Nombre del curso"]}</td>
                  <td>{course["Créditos"]}</td>
                  <td>
                    <button
                      onClick={() => {
                        props.setCourseId(course["IDCurso"]);
                        props.showGroupsPopup();
                      }}
                    >
                      Ver Horarios
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

/**
 * Consulta la lista de cursos según el nivel académico dado.
 *
 * @param {*} level Nivel académico de los cursos a consultar
 * @param {*} endpoint Endpoint para hacer la consulta.
 * @returns Promise con la lista de los cursos.
 */
async function getCoursesByLevel(level, endpoint) {
  const sample_courses = await fetch(endpoint + level)
    .then((data) => data.json())
    .catch((err) => {
      const error = { reason: "Error al obtener la información de los cursos.", cause: err };
      console.error(error.reason, error.cause);
      return { error };
    });

  return sample_courses;
}
