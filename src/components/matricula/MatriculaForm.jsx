import React, { useState, useEffect, Fragment, useMemo } from "react";
import { MatriculaInfo } from "components/matricula/MatriculaInfo";
import { Popup } from "components/common/Popup";
import { Table } from "components/common/Table";
import { STATUS, getGroupsByCourseId, getOferta } from "utils/CommonRequests";
import { GroupSelection } from "components/matricula/GroupSelection";
import { formatHorario } from "utils/Helpers";

export function MatriculaForm({ userInfo }) {
  const [infoMatricula, setInfoMatricula] = useState({
    idEstudiante: undefined,
    idOferta: undefined,
    selectedGroups: [],
  });
  const [oferta, setOferta] = useState({ status: STATUS.PENDING });

  const [showGroupsPopup, setShowGroupsPopup] = useState(false);
  const [groupsPopupClosing, setGroupsPopupClosing] = useState(false);

  const [showMaxCreditsReachedPopup, setShowMaxCreditsReachedPopup] =
    useState(false);
  const [maxCreditsPopupClosing, setMaxCreditsPopupClosing] = useState(false);

  const [showIncompatibleHours, setShowIncompatibleHours] = useState(false);
  const [incompatibleHoursPopupClosing, setIncompatibleHoursPopupClosing] =
    useState(false);

  const [showTimeOutPopup, setShowTimeOutPopup] = useState(false);

  const [courseInfo, setCourseInfo] = useState({
    id: undefined,
    nombre: undefined,
    creditos: NaN,
    groups: { status: STATUS.PENDING },
  });

  useEffect(() => {
    setOferta({ status: STATUS.PENDING });
    if (!userInfo) {
      return;
    }
    getOferta(userInfo.ofertaId).then((res) => {
      setOferta(res);
      setInfoMatricula((prevInfo) => ({
        ...prevInfo,
        idEstudiante: userInfo.id,
        idOferta: res.ofertaId,
        programa: userInfo.programa,
        tanda: userInfo.tanda,
        selectedGroups: res.materiasList.map((m) => ({
          materiaId: m.id,
          groupSelected: false,
        })),
      }));
    });
  }, [userInfo]);

  useEffect(() => {
    setCourseInfo((prev) => ({ ...prev, groups: { status: STATUS.PENDING } }));
    if (!courseInfo.id) {
      return;
    }
    getGroupsByCourseId(courseInfo.id).then((res) => {
      setCourseInfo((prev) => ({
        ...prev,
        groups: res,
      }));
    });
  }, [courseInfo.id]);

  const matInfo = useMemo(
    () => (
      <MatriculaInfo
        maxCredits={oferta.topeMaximoCreditos}
        fnGetCurrentCredits={() => getCurrentCredits(infoMatricula)}
        fnOnTimeFinished={() => {
          setShowTimeOutPopup(true);
        }}
      />
    ),
    [oferta.topeMaximoCreditos, infoMatricula]
  );

  return oferta.status === STATUS.PENDING ? (
    <div className="default-box flex-box">
      <h2>Cargando materias...</h2>
    </div>
  ) : (
    <>
      <div className="default-box">
        {matInfo}
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
              if (groupInfo) {
                if (
                  getCurrentCredits(infoMatricula) + courseInfo.creditos >
                  oferta.topeMaximoCreditos
                ) {
                  setShowMaxCreditsReachedPopup(true);
                } else if (
                  isIncompatible(groupInfo, infoMatricula.selectedGroups)
                ) {
                  setShowIncompatibleHours(true);
                } else {
                  saveGroupSelection(
                    courseInfo,
                    groupInfo,
                    infoMatricula,
                    setInfoMatricula
                  );
                }
              } else {
                saveGroupSelection(
                  courseInfo,
                  null,
                  infoMatricula,
                  setInfoMatricula
                );
              }
              setTimeout(() => {
                setShowGroupsPopup(false);
                setGroupsPopupClosing(false);
              }, 300);
            }}
          />
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
            btnText="Aceptar"
          >
            <div className="popup__title">
              Tope máximo de creditos alcanzado
            </div>
            <div className="popup__text">
              No puedes matricular esta materia ya que no tienes suficientes
              créditos disponibles. Selecciona otra, o elimina alguna.
            </div>
          </Popup>
        )}
        {showIncompatibleHours && (
          <Popup
            closing={incompatibleHoursPopupClosing}
            fnBtnAction={() => {
              setIncompatibleHoursPopupClosing(true);
              setTimeout(() => {
                setShowIncompatibleHours(false);
                setIncompatibleHoursPopupClosing(false);
              }, 300);
            }}
          >
            <div className="popup__title">Horas incompatibles</div>
            <div className="popup__text">
              No puedes matricular este grupo por cruce de horas, selecciona
              otro.
            </div>
          </Popup>
        )}
        {showTimeOutPopup && (
          <Popup
            fnBtnAction={() => window.location.reload()}
            btnText="Recargar"
          >
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
            body={oferta.materiasList.map((course, i) => [
              course.nombre,
              course.creditos,
              formatSelectedGroup(infoMatricula.selectedGroups[i]),
              <button
                type="button"
                onClick={() => {
                  setCourseInfo((prev) => ({
                    ...prev,
                    id: course.id,
                    nombre: course.nombre,
                    creditos: course.creditos,
                  }));
                  setShowGroupsPopup(true);
                }}
              >
                Ver Grupos
              </button>,
            ])}
          />
        )}
      </div>
      <div className="default-box btn-box lower-rounded">
        <button
          type="button"
          onClick={() => clearSelectedGroups(infoMatricula, setInfoMatricula)}
        >
          Limpiar
        </button>
        {/* TODO: implement */}
        <button type="button" onClick={() => console.log("Enviar")}>
          Enviar
        </button>
      </div>
    </>
  );
}

function formatSelectedGroup(group) {
  return group && group.groupSelected
    ? `${group.numeroGrupo} - ${formatHorario(group.horario)}`
    : "Ninguno";
}

function clearSelectedGroups(infoMatricula, setInfoMatricula) {
  setInfoMatricula((prevInfo) => {
    const newSelectedGroups = infoMatricula.selectedGroups.map((group) => ({
      materiaId: group.materiaId,
      selectedGroup: false,
    }));
    return { ...prevInfo, selectedGroups: newSelectedGroups };
  });
}

function saveGroupSelection(
  courseInfo,
  groupInfo,
  infoMatricula,
  setInfoMatricula
) {
  if (groupInfo === undefined) {
    return;
  }
  let selection = {
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

  let newSelectedGroups = [...infoMatricula.selectedGroups];
  newSelectedGroups = newSelectedGroups.map((selectedGroup) => {
    if (selectedGroup.materiaId === courseInfo.id) {
      return selection;
    }
    return selectedGroup;
  });

  setInfoMatricula((prevInfo) => ({
    ...prevInfo,
    selectedGroups: newSelectedGroups,
  }));
}

function getCurrentCredits(infoMatricula) {
  const creditos = infoMatricula.selectedGroups
    .filter((group) => group.hasOwnProperty("creditos"))
    .map((group) => group.creditos);
  if (creditos.length === 0) {
    return 0;
  }
  const total = creditos.reduce((prev, curr) => prev + curr);
  return total;
}

function isIncompatible(groupInfo, selectedGroups) {
  const posibleHorario = groupInfo.horario;
  let incompatible = false;
  selectedGroups.forEach((group) => {
    if (group.horario) {
      group.horario.forEach((schedule) => {
        posibleHorario.forEach((posibleSchedule) => {
          if (intersects(schedule, posibleSchedule)) {
            incompatible = true;
          }
        });
      });
    }
  });
  return incompatible;
}

function intersects(hour0, hour1) {
  const sameDay = hour0.diaSemana === hour1.diaSemana;
  if (!sameDay) {
    return false;
  }
  return (
    (hour0.diaSemana === hour1.diaSemana &&
      hour0.horaInicio < hour1.horaFin &&
      hour0.horaInicio > hour1.horaInicio) ||
    (hour0.horaFin < hour1.horaFin && hour0.horaFin > hour1.horaInicio) ||
    hour0.horaInicio === hour1.horaInicio ||
    hour0.horaFin === hour1.horaFin
  );
}
