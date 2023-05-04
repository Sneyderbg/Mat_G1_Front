import { useState } from "react";
import { getUserInfo } from "../../utils/CommonRequests";
import { getTanda } from "../../utils/CommonRequests";

export function StartMatricula(props) {
  // const [matriculando, setMatriculando] = useState(false);
  const [validatedState, setValidatedState] = useState({});

  return (
    <div className="default-div">
      <div className="body">
        <h2>Inicio de matrícula</h2>
        <p>
          Aquí puedes iniciar tu proceso de matrícula en la fecha y hora que te corresponden según
          tu tanda. Recuerda que puedes consultar tu tanda en la sección "Oferta de materias" del
          Portal Web Universitario.
        </p>
        {validatedState.status ? (
          getComponentFromStatus(validatedState.status)
        ) : (
          <div className="btn-box upper-rounded lower-rounded">
            <button
              onClick={() => {
                setValidatedState({ status: "validating" });
                validateMatricula(props.userId)
                  .then((res) => setValidatedState(res))
                  .catch((err) => console.error(err));
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

function canStartMatricula(tandaInfo) {
  const date = tandaInfo["Día"];
  const time = tandaInfo["Horario"];
  const currentDate = new Date();
  const tandaDate = new Date(`${date} ${time}`);
  return currentDate > tandaDate; //FIXME: cambiar a >
}

async function validateMatricula(userId) {
  const tanda = await getUserInfo(userId).then((res) => res["Tanda de matrícula"]);

  const tandaInfo = await getTanda(tanda).then((res) => res);
  if (canStartMatricula(tandaInfo)) {
    return { status: "valid" };
  } else {
    return { status: "invalid" };
  }
}

function getComponentFromStatus(status) {
  switch (status) {
    case "valid":
      return (
        <div className="default-box lower-rounded">
          <div className="flex-box">
            <h2>Puedes iniciar matrícula</h2>
          </div>
        </div>
      );

    case "invalid":
      return (
        <div className="default-box lower-rounded">
          <div className="flex-box error-box">
            <h3>
              No puedes iniciar matrícula en este momento. Recuerda revisar la fecha y hora de tu
              tanda.
            </h3>
          </div>
        </div>
      );

    case "validating":
      return (
        <div className="default-box lower-rounded">
          <div className="flex-box">
            <h2>Comprobando... Espere un momento</h2>
          </div>
        </div>
      );

    default:
      return (
        <div className="default-box lower-rounded">
          <div className="flex-box error-box">
            <h2>Error al validar tu matrícula</h2>
          </div>
        </div>
      );
  }
}
