import { useState, useEffect } from "react";
import { getCoursesByLevel } from "../../utils/CommonRequests";

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
      getCoursesByLevel(props.userInfo["Semestre académico"]).then((res) => setCourses(res));
    }
  }, [props.userInfo]);

  return (
    <div className="tabla-cursos">
      {courses.status !== "ok" ? (
        <div className="flex-box error-box">
          <h3>{courses.customMessage}</h3>
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
            {courses.list.map((course, idx) => {
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
