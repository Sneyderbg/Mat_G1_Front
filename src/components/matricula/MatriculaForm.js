import { useState, useEffect, Fragment } from "react";
import { MatriculaInfo } from "./MatriculaInfo";
import { Popup } from "../common/Popup";
import { Table } from "../common/Table";
import { STATUS, getGroupsByCourseId, getOferta } from "../../utils/CommonRequests";
import { GroupSelection } from "./GroupSelection";

export function MatriculaForm(props) {
  const [infoMatricula, setInfoMatricula] = useState({
    idEstudiante: undefined,
    idOferta: undefined,
    selectedGroups: [],
  });
  const [oferta, setOferta] = useState({ status: STATUS.PENDING });

  const [showGroupsPopup, setShowGroupsPopup] = useState(false);
  const [groupsPopupClosing, setGroupsPopupClosing] = useState(false);

  const [showMaxCreditsReachedPopup, setShowMaxCreditsReachedPopup] = useState(false);
  const [maxCreditsPopupClosing, setMaxCreditsPopupClosing] = useState(false);

  const [showTimeOutPopup, setShowTimeOutPopup] = useState(false);

  const [courseInfo, setCourseInfo] = useState({
    id: undefined,
    nombre: undefined,
    creditos: NaN,
    groups: { status: STATUS.PENDING },
  });

  useEffect(() => {
    setOferta({ status: STATUS.PENDING });
    if (!props.userInfo) {
      return;
    }
    getOferta(props.userInfo.ofertaId).then((res) => {
      setOferta(res);
      setInfoMatricula((prevInfo) => {
        return {
          ...prevInfo,
          idEstudiante: props.userInfo.id,
          idOferta: res.ofertaId,
          programa: props.userInfo.programa,
          tanda: props.userInfo.tanda,
          selectedGroups: res.materiasList.map((m, i) => {
            return { materiaId: m.id, groupSelected: false };
          }),
        };
      });
    });
  }, [props.userInfo]);

  useEffect(() => {
    if (!courseInfo.id) {
      return;
    }
    getGroupsByCourseId(courseInfo.id).then((res) => {
      setCourseInfo((prev) => {
        return {
          ...prev,
          groups: res,
        };
      });
    });
  }, [courseInfo.id]);

  return (
    <Fragment>
      <div className="default-box">
        <MatriculaInfo
          maxCredits={oferta.topeMaximoCreditos}
          fnGetCurrentCredits={() => getCurrentCredits(infoMatricula)}
          fnOnTimeFinished={() => {
            setShowTimeOutPopup(true);
          }}
        ></MatriculaInfo>
        {showGroupsPopup && (
          <GroupSelection
            closing={groupsPopupClosing}
            courseInfo={courseInfo}
            fnOnCancel={() => {
              setGroupsPopupClosing(true);
              setTimeout(() => {
                setShowGroupsPopup(false);
                setGroupsPopupClosing(false);
              }, 300);
            }}
            fnOnSubmit={(courseInfo, groupInfo) => {
              setGroupsPopupClosing(true);
              if (
                groupInfo &&
                getCurrentCredits(infoMatricula) + courseInfo.creditos > oferta.topeMaximoCreditos
              ) {
                setShowMaxCreditsReachedPopup(true);
              } else {
                saveGroupSelection(courseInfo, groupInfo, infoMatricula, setInfoMatricula);
              }
              setTimeout(() => {
                setShowGroupsPopup(false);
                setGroupsPopupClosing(false);
              }, 300);
            }}
          ></GroupSelection>
        )}
        {showMaxCreditsReachedPopup && (
          <Popup
            closing={maxCreditsPopupClosing}
            fnBtnAction={() => {
              setMaxCreditsPopupClosing(true);
              setTimeout(() => {
                setShowMaxCreditsReachedPopup(false);
                setMaxCreditsPopupClosing(false);
              }, 300);
            }}
            btnText={"Aceptar"}
          >
            <div className="popup__title">Tope máximo de creditos alcanzado</div>
            <div className="popup__text">
              No puedes matricular esta materia ya que no tienes suficientes créditos disponibles.
              Selecciona otra, o elimina alguna.
            </div>
          </Popup>
        )}
        {showTimeOutPopup && (
          <Popup fnBtnAction={() => window.location.reload()} btnText={"Recargar"}>
            <div className="popup__title">Tiempo agotado</div>
            <div className="popup__text">
              Debes recargar la página y volver a iniciar tu matrícula.
            </div>
          </Popup>
        )}
        {oferta.status === STATUS.OK && (
          <Table
            className="fill-horizontal"
            head={["Materia", "Créditos", "Grupo Elegido", "Grupos"]}
            body={oferta.materiasList.map((course, i) => {
              return [
                course.nombre,
                course.creditos,
                formatSelectedGroup(infoMatricula.selectedGroups[i]),
                <button
                  onClick={() => {
                    setCourseInfo((prev) => {
                      return {
                        ...prev,
                        id: course.id,
                        nombre: course.nombre,
                        creditos: course.creditos,
                      };
                    });
                    setShowGroupsPopup(true);
                  }}
                >
                  Ver Grupos
                </button>,
              ];
            })}
          ></Table>
        )}
      </div>
      <div className="default-box btn-box lower-rounded">
        <button onClick={() => clearSelectedGroups(infoMatricula, setInfoMatricula)}>
          Limpiar
        </button>
        <button onClick={() => console.log("Enviar")}>Enviar</button> {/*TODO: implement */}
      </div>
    </Fragment>
  );
}

function formatSelectedGroup(group) {
  return group && group.groupSelected ? `${group.numeroGrupo} - ${group.horario}` : "Ninguno";
}

function clearSelectedGroups(infoMatricula, setInfoMatricula) {
  setInfoMatricula((prevInfo) => {
    const newSelectedGroups = infoMatricula.selectedGroups.map((group) => {
      return { materiaId: group.materiaId, selectedGroup: false };
    });
    return { ...prevInfo, selectedGroups: newSelectedGroups };
  });
}

function saveGroupSelection(courseInfo, groupInfo, infoMatricula, setInfoMatricula) {
  if (groupInfo === undefined) {
    return;
  }
  var selection = {
    // groupInfo == null (eliminar grupo)
    materiaId: courseInfo.id,
    groupSelected: false,
  };

  if (groupInfo !== null) {
    selection = {
      materiaId: courseInfo.id,
      groupSelected: true,
      grupoId: groupInfo.grupoId,
      numeroGrupo: groupInfo.numeroGrupo,
      horario: groupInfo.horario,
      creditos: courseInfo.creditos,
    };
  }

  var newSelectedGroups = [...infoMatricula.selectedGroups];
  newSelectedGroups = newSelectedGroups.map((selectedGroup, i) => {
    if (selectedGroup.materiaId === courseInfo.id) {
      return selection;
    }
    return selectedGroup;
  });

  setInfoMatricula((prevInfo) => {
    return { ...prevInfo, selectedGroups: newSelectedGroups };
  });
}

function getCurrentCredits(infoMatricula) {
  const creditos = infoMatricula.selectedGroups
    .filter((group) => group.hasOwnProperty("creditos"))
    .map((group) => group.creditos);
  if (creditos.length === 0) {
    return 0;
  }
  const total = creditos.reduce((prev, curr, i) => prev + curr);
  return total;
}
