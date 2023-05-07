import { useState } from "react";
import { GeneralInfo } from "../oferta/GeneralInfo";
import { MatriculaForm } from "./MatriculaForm";

export function StartMatricula(props) {
	// const [matriculando, setMatriculando] = useState(false);
	const [validatedState, setValidatedState] = useState(
		props.userInfo.status === "ok" ? {} : { status: props.userInfo.status }
	);
	
	return (
		<div className="default-div">
			<div className="body">
				<h2>Inicio de matrícula</h2>
				<p>
					Aquí puedes iniciar tu proceso de matrícula en la fecha y hora que te corresponden según
					tu tanda. Recuerda que puedes consultar tu tanda en la sección "Oferta de materias" del
					Portal Web Universitario.
				</p>
				<GeneralInfo userInfo={props.userInfo} showTanda={true}></GeneralInfo>
				{validatedState.status ? (
					getComponentFromStatus(validatedState.status, props.userInfo)
				) : (
					<div className="btn-box upper-rounded lower-rounded">
						<button
							onClick={() => {
								setValidatedState({ status: "validating" });
								if (props.userInfo.id) {
									validateMatricula(props.userInfo)
										.then((res) => setValidatedState(res))
										.catch((err) => console.error(err));
								} else {
									setValidatedState({ status: "undefined-user" });
								}
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

//TODO: comprobar que aún no haya matriculado
async function validateMatricula(userInfo) {
	const currentDate = new Date();
	const tandaDate = new Date(userInfo.tanda.horario);

	if (currentDate > tandaDate) {
		return { status: "valid" };
	} else {
		return { status: "invalid" };
	}
}

function getComponentFromStatus(status, userInfo) {
	switch (status) {
		case "valid":
			return <MatriculaForm userInfo={userInfo}></MatriculaForm>;

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

		case "server-error":
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
