import React, { useState } from "react";
import { GeneralInfo } from "components/oferta/GeneralInfo";
import { MatriculaForm } from "components/matricula/MatriculaForm";
import { STATUS } from "utils/CommonRequests";

export function StartMatricula({ userInfo }) {
  const [validatedState, setValidatedState] = useState(
    userInfo.status === STATUS.OK ? {} : { status: userInfo.status }
  );

  return (
    <div className="default-div">
      <div className="body">
        <h2>Matrícula</h2>
        <p>
          Aquí puedes iniciar tu proceso de matrícula en la fecha y hora que te
          corresponden según tu tanda. Recuerda que solo puedes iniciar tu
          proceso de matrícula después del día y hora que te corresponden.
        </p>
        <GeneralInfo userInfo={userInfo} showTanda />
        {validatedState.status ? (
          getComponentFromStatus(validatedState.status, userInfo)
        ) : (
          <div className="default-box btn-box lower-rounded">
            <button
              type="button"
              onClick={() => {
                setValidatedState({ status: STATUS.PENDING });
                setValidatedState(validateMatricula(userInfo));
              }}
            >
              Iniciar proceso de matrícula
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// TODO: comprobar que aún no haya matriculado
function validateMatricula(userInfo) {
  if (!userInfo) {
    return { status: STATUS.ERROR };
  }

  const currentDate = new Date();
  const tandaDate = new Date(userInfo.tanda.horario);

  if (currentDate > tandaDate) {
    return { status: STATUS.OK };
  }
  return { status: STATUS.WARNING };
}

function getComponentFromStatus(status, userInfo) {
  switch (status) {
    case STATUS.OK:
      return <MatriculaForm userInfo={userInfo} />;

    case STATUS.WARNING:
      return (
        <div className="default-box lower-rounded">
          <div className="flex-box error-box">
            <h3>
              No puedes iniciar matrícula en este momento. Recuerda que solo
              puedes iniciar tu tanda después del día y hora que te
              corresponden.
            </h3>
          </div>
        </div>
      );

    case STATUS.PENDING:
      return (
        <div className="default-box lower-rounded">
          <div className="flex-box">
            <h2>Comprobando... Espere un momento</h2>
          </div>
        </div>
      );

    case STATUS.ERROR:
      return (
        <div className="default-box lower-rounded">
          <div className="flex-box error-box">
            <h2>Hay problemas con el servidor, intentelo más tarde.</h2>
          </div>
        </div>
      );

    default:
      return (
        <div className="default-box lower-rounded">
          <div className="flex-box error-box">
            <h2>Error al validar tu matrícula</h2>
            <h2>{status}</h2>
          </div>
        </div>
      );
  }
}
