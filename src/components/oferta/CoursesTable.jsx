import React, { useState, useEffect } from "react";
import { STATUS, getOferta } from "utils/CommonRequests";
import { Table } from "components/common/Table";

/**
 * Componente que muestra la tabla de los cursos obligatorios ofertados.
 *
 * @param {*} props Propiedades = {userInfo, fnOnBtnClick, fnSetCourseId}
 * @returns Render del componente.
 */
export function CoursesTable({ userInfo, fnSetCourseId, fnOnBtnClick }) {
  const [oferta, setOferta] = useState({ status: undefined });

  // Actualiza la lista de cursos cada vez que cambie la información del usuario
  useEffect(() => {
    if (userInfo.status === STATUS.OK) {
      setOferta({ status: STATUS.PENDING });
      getOferta(userInfo.ofertaId).then((res) => setOferta(res));
    }
  }, [userInfo]);

  return (
    <div className="fill-horizontal">
      {oferta.status === STATUS.PENDING ? (
        <div className="flex-box">
          <h3>Cargando cursos...</h3>
        </div>
      ) : (
        <div className="flex-box error-box">
          <h3>{oferta.customMessage}</h3>
        </div>
      )}
      {oferta.status === STATUS.OK ? (
        <Table
          className="fill-horizontal primary-table"
          head={["Código", "Materia", "Créditos", "Grupos"]}
          body={oferta.materiasList.map((course) => [
            course.id,
            course.nombre,
            course.creditos,
            <button
              type="button"
              onClick={() => {
                fnSetCourseId(course.id);
                fnOnBtnClick();
              }}
            >
              Ver Grupos
            </button>,
          ])}
        />
      ) : (
        ""
      )}
    </div>
  );
}
