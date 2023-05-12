import { useState, useEffect } from "react";
import { STATUS, getOferta } from "../../utils/CommonRequests";
import { Table } from "../common/Table";

/**
 * Componente que muestra la tabla de los cursos obligatorios ofertados.
 *
 * @param {*} props Propiedades = {userInfo, fnOnBtnClick, fnSetCourseId}
 * @returns Render del componente.
 */
export function CoursesTable(props) {
    const [oferta, setOferta] = useState({ status: undefined });

  // Actualiza la lista de cursos cada vez que cambie la información del usuario
  useEffect(() => {
    if (props.userInfo.status === STATUS.OK) {
      setOferta({ status: STATUS.PENDING });
      getOferta(props.userInfo.ofertaId).then((res) => setOferta(res));
    }
  }, [props.userInfo]);

  return (
    <div className="fill-horizontal">
      {oferta.status !== STATUS.OK ? (
        oferta.status === STATUS.PENDING ? (
          <div className="flex-box">
            <h3>Cargando cursos...</h3>
          </div>
        ) : (
          <div className="flex-box error-box">
            <h3>{oferta.customMessage}</h3>
          </div>
        )
      ) : (
        <Table className="fill-horizontal primary-table"
          head={["Código", "Materia", "Créditos", "Grupos"]}
          body={oferta.materiasList.map((course, i) => {
            return [
              course.id,
              course.nombre,
              course.creditos,
              <button
                onClick={() => {
                  props.fnSetCourseId(course.id);
                  props.fnOnBtnClick();
                }}
              >
                Ver Grupos
              </button>,
            ];
          })}
        ></Table>
      )}
    </div>
  );
}
