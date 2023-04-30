import { useState, useEffect } from "react";
import "./OfertaDeMaterias.css";
import { GroupsPopup } from "./GroupsPopup";
import { CoursesTable } from "./CoursesTable";
import { NavBar } from "./NavBar";
import { GeneralInfo } from "./GeneralInfo";

/**
 * Página principal de la oferta de materias.
*
* @param {*} props Object{}
* @returns Render de la página.
*/
export function OfertaDeMaterias(props) {

  //---------- Constants for testing --------------
  const API_URL = "http://localhost:4000/";
  const USER_ID = 47147042692;
  //-----------------------------------------------

  const showTanda = true;
  const [showGroupsPopup, setShowGroupsPopup] = useState(false);
  const [courseId, setCourseId] = useState(10002);
  const [userInfo, setUserInfo] = useState({});
  
  // actualiza la información del usuario cada vez que cambia el id del usuario
  useEffect(() => {
    getUserInfo(USER_ID, API_URL + "ListadoEstudiantes?Id=")
      .then((info) => setUserInfo(info))
      .catch((res) => console.log(res));
  }, [USER_ID, API_URL]);

  return (
    <div className="main">
        <GroupsPopup
          showYourself={showGroupsPopup}
          endpoint={API_URL + "ProgramacionAcademica?IdCurso="}
          courseId={courseId}
          setTrigger={setShowGroupsPopup}
        ></GroupsPopup>
      <div className="oferta">
        <header>
          <h1>Proceso de matrícula</h1>
        </header>
        <div className="body">
          <NavBar></NavBar>
          <div className="contenido">
            <h2>Oferta de materias</h2>
            <p>
              Aquí encontrarás las materias que puedes matricular en este periodo académico, además
              del día, hora y tanda en la cual debes matricularte a través del Portal Web
              Universitario, identificándote con usuario y contraseña.
            </p>
            <GeneralInfo
              endpoint={API_URL + "HorarioTandas?Tanda="}
              userInfo={userInfo}
              showTanda={showTanda}
            ></GeneralInfo>
            <div className="obligatorias">
              <label>Materias obligatorias </label>
            </div>
            <CoursesTable
              userInfo={userInfo}
              endpoint={API_URL + "CursosIngenieriaSistemas?Nivel="}
              showGroupsPopup={() => {
                setShowGroupsPopup(true);
              }}
              setCourseId={setCourseId}
            ></CoursesTable>
            <div className="electivas">
              <label>No tiene materias electivas en su oferta </label>
            </div>
            <div className="botonesFinales">
              <button id="btnImprimir">Imprimir</button>
              <button id="btnOtro">Elegir otro programa</button>
              <div></div>
            </div>
          </div>
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
  const sample_info = await fetch(endpoint + userId)
    .then((res) => res.json())
    .catch(() => console.log("USERerrrrorrorror"));

  return sample_info[0]; // solo hay un estudiante por id
}
