import { useState, useEffect } from "react";
import { CoursesTable } from "../oferta/CoursesTable";
import { MatriculaInfo } from "./MatriculaInfo";
import { Popup } from "../common/Popup";

export function MatriculaForm(props) {
  const [infoMatricula, setInfoMatricula] = useState({
    timeLeft: new Date(15 * 60 * 1000), // min * sec * ms
    timeFinished: false,
  });
  const [timer, setTimer] = useState(null);
  const [showGroupsPopup, setShowGroupsPopup] = useState(false);

  useEffect(() => {
    // const fiftyMinutes = new Date(15 * 60 * 1000);
    const fiftyMinutes = new Date(3 * 1000); // for testing
    const oneSec = new Date(1000);

    setInfoMatricula((prevInfo) => {
      return { ...prevInfo, timeLeft: fiftyMinutes };
    });
    setTimer(
      setInterval(() => {
        setInfoMatricula((prevInfo) => {
          return {
            ...prevInfo,
            timeLeft: new Date(prevInfo.timeLeft - oneSec),
          };
        });
      }, 1000)
    );
  }, []);

  useEffect(() => {
    if (infoMatricula.timeLeft <= new Date(0)) {
      setInfoMatricula((prevInfo) => {
        return { ...prevInfo, timeFinished: true };
      });
      clearInterval(timer);
    }
  }, [infoMatricula.timeLeft, timer]);

  return (
    <div className="default-box">
      <MatriculaInfo timeLeft={infoMatricula.timeLeft}></MatriculaInfo>
      <Popup visible={showGroupsPopup} fnBtnAction={() => setShowGroupsPopup(false)}>
        {/* {TODO: continue with group selection} */}
      </Popup>
      <Popup
        visible={infoMatricula.timeFinished}
        fnBtnAction={() => window.location.reload()}
        btnText={"Recargar"}
      >
        <div className="popup__title">Tiempo agotado</div>
        <div className="popup__text">Debes recargar la página y volver a iniciar tu matrícula.</div>
      </Popup>
      {/* <InfoPopup
        visible={infoMatricula.timeFinished}
        includeBtn={true}
        fnBtnAction={() => window.location.reload()}
        btnText={"Recargar"}
      >
        <div className="popup__title">Tiempo agotado</div>
        <div className="popup__text">Debes recargar la página y volver a iniciar tu matrícula.</div>
      </InfoPopup> */}
      <CoursesTable
        userInfo={props.userInfo}
        fnOnBtnClick={() => setShowGroupsPopup(true)}
        fnSetCourseId={(id) => setInfoMatricula({ ...infoMatricula, cursoSeleccionandoId: id })}
      ></CoursesTable>
    </div>
  );
}
