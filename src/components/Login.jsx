import { STATUS } from "utils/CommonRequests";

/**
 *
 * @param {*} props = {fnOnLogin, loginStatus}
 */
export function Login({ loginStatus, fnOnLogin }) {
  return (
    <div className="popup__background">
      {getFormGromStatus(loginStatus, fnOnLogin)}
    </div>
  );
}

function getFormGromStatus(loginStatus, fnOnLogin) {
  switch (loginStatus.status) {
    case undefined:
      return (
        <form className="popup" onSubmit={fnOnLogin}>
          <div className="popup__title">Inicio de sesión</div>
          <div className="popup__text">
            Ingrese su número de identificación:
          </div>
          <input name="userId" type="number" placeholder="Id" required />
          <button type="submit">Aceptar</button>
        </form>
      );

    case STATUS.PENDING:
      return (
        <div className="popup">
          <div className="popup__title">Inicio de sesión</div>
          <div className="popup__text">Comprobando información...</div>
        </div>
      );

    case STATUS.ERROR:
      return (
        <div className="popup">
          <div className="popup__title">Inicio de sesión</div>
          <div className="popup__text important-label">
            {loginStatus.customMessage}
          </div>
          <button type="button" onClick={() => window.location.reload()}>
            Recargar página
          </button>
        </div>
      );

    default:
      return (
        <div className="popup">
          <div className="popup__title">Inicio de sesión</div>
          <div className="popup__text important-label">
            {loginStatus.customMessage}, {loginStatus.info}
          </div>
          <button type="button" onClick={() => window.location.reload()}>
            Recargar página
          </button>
        </div>
      );
  }
}
