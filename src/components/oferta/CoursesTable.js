import { useState, useEffect } from "react";

export function CoursesTable(props) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (props.userInfo.hasOwnProperty("Semestre académico")) {
      getCoursesByLevel(props.userInfo["Semestre académico"], props.endpoint)
        .then((list) => setCourses(list))
        .catch((res) => console.log(res));
    }
  }, [props.userInfo]);

  return (
    <div className="tabla">
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
    </div>
  );
}

async function getCoursesByLevel(level, endpoint) {
  const sample_courses = await fetch(endpoint + level)
    .then((data) => data.json())
    .catch((res) => console.log(res));

  return sample_courses;
}
