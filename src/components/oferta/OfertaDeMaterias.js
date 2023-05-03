import { useState, useEffect } from "react";
import axios from "axios";

import { GroupsPopup } from "./GroupsPopup";
import { CoursesTable } from "./CoursesTable";
import { GeneralInfo } from "./GeneralInfo";
import cfg from "./config.json";

/**
 * Página principal de la oferta de materias.
 *
 * @param {*} props Object{}
 * @returns Render de la página.
 */
export function OfertaDeMaterias(props) {
  //---------- Constants for testing --------------
  const USER_ID = 47147042692;
  //-----------------------------------------------

  const showTanda = true;
  const [showGroupsPopup, setShowGroupsPopup] = useState(false);
  const [courseId, setCourseId] = useState(10002);
  const [userInfo, setUserInfo] = useState({});

  // actualiza la información del usuario cada vez que cambia el id del usuario
  useEffect(() => {
    getUserInfo(USER_ID, cfg.API_URL + cfg.endpoints.STUDENTS)
      .then((info) => setUserInfo(info))
      .catch((res) => console.log(res));
  }, [USER_ID]);

  return (
    <div className="default-div">
      <GroupsPopup
        showYourself={showGroupsPopup}
        endpoint={cfg.API_URL + cfg.endpoints.ACADEMIC_SCHEDULE}
        courseId={courseId}
        setTrigger={setShowGroupsPopup}
      ></GroupsPopup>
      <div className="body">
        <h2>Oferta de materias</h2>
        <p>
          Aquí encontrarás las materias que puedes matricular en este periodo académico, además
          del día, hora y tanda en la cual debes matricularte a través del Portal Web
          Universitario, identificándote con usuario y contraseña.
        </p>
        <GeneralInfo
          endpoint={cfg.API_URL + cfg.endpoints.TANDAS}
          userInfo={userInfo}
          showTanda={showTanda}
        ></GeneralInfo>
        <div className="sub-title--left">
          <label>Materias obligatorias </label>
        </div>
        <CoursesTable
          userInfo={userInfo}
          endpoint={cfg.API_URL + cfg.endpoints.COURSES}
          showGroupsPopup={() => {
            setShowGroupsPopup(true);
          }}
          setCourseId={setCourseId}
        ></CoursesTable>
        <div className="sub-title--left">
          <label>No tiene materias electivas en su oferta </label>
        </div>
        <div id="botones-finales">
          <button>Imprimir</button>
          <button>Elegir otro programa</button>
          <div></div>
        </div>
      </div>
    </div>
  );
}

/**
 * Obtiene la información de un usuario por su id a través del endpoint.
 *
 * @param {Number} userId Id de usuario.
 * @param {String} endpoint Endpoint para hacer la consulta.
 * @returns Promise de la info.
 */
async function getUserInfo(userId, endpoint) {
  const sample_info = await axios
    .get(endpoint, {
      params: { Id: userId },
    })
    .then((res) => res.data[0]) // solo hay un estudiante por id
    .catch((err) => {
      const error = { ...err, customMessage: "Error al obtener la infromación del usuario." };
      console.log(error.customMessage, err);
      return error;
    });

  return sample_info;
}
