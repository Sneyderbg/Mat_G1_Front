import { useState, useEffect } from "react";
import { NavBar } from "./NavBar";
import { BlankPage } from "./blank/blankPage";
import { OfertaDeMaterias } from "./oferta/OfertaDeMaterias";
import { StartMatricula } from "./matricula/StartMatricula";
import { STATUS, getUserInfo } from "../utils/CommonRequests";
import { Login } from "./Login";

/**
 * Componente que renderiza la página principal (o página general) de la app web.
 *
 * @param {*} props Propiedades = {}
 * @returns Render del componente.
 */
export function MainPage(props) {
  const [currentPageNumber, setCurrentPageNumber] = useState(3);
  const [userInfo, setUserInfo] = useState({});
  const [login, setLogin] = useState({ status: undefined });

  useEffect(() => {
    if (userInfo.status === STATUS.OK) {
      setLogin({ status: STATUS.OK, userId: userInfo.id });
    } else {
      setLogin({
        status: userInfo.status,
        customMessage: userInfo.customMessage,
        info: userInfo.info,
      });
    }
  }, [userInfo]);

  return (
    <div>
      <header>
        <h1>Proceso de matrícula</h1>
      </header>
      {login.status === STATUS.OK ? (
        <main>
          <NavBar activeBtnIdx={currentPageNumber} changePageNumber={setCurrentPageNumber}></NavBar>
          {getCurrentPage(currentPageNumber, userInfo)}
        </main>
      ) : (
        <Login
          loginStatus={login}
          fnOnLogin={(e) => {
            e.preventDefault();
            const data = new FormData(e.target);
            setLogin({ status: STATUS.PENDING });
            getUserInfo(data.get("userId")).then((info) => setUserInfo(info));
          }}
        ></Login>
      )}
    </div>
  );
}

function getCurrentPage(idx, userInfo) {
  switch (idx) {
    case 2:
      return <OfertaDeMaterias userInfo={userInfo}></OfertaDeMaterias>;

    case 3:
      return <StartMatricula userInfo={userInfo}></StartMatricula>;

    default:
      return <BlankPage></BlankPage>;
  }
}
