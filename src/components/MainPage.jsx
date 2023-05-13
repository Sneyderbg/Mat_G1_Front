import { useState, useEffect } from "react";
import { NavBar } from "components/NavBar";
import { BlankPage } from "components/blank/blankPage";
import { OfertaDeMaterias } from "components/oferta/OfertaDeMaterias";
import { StartMatricula } from "components/matricula/StartMatricula";
import { STATUS, getUserInfo } from "utils/CommonRequests";
import { Login } from "components/Login";

export function MainPage() {
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
          <NavBar
            activeBtnIdx={currentPageNumber}
            changePageNumber={setCurrentPageNumber}
          />
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
        />
      )}
    </div>
  );
}

function getCurrentPage(idx, userInfo) {
  switch (idx) {
    case 2:
      return <OfertaDeMaterias userInfo={userInfo} />;

    case 3:
      return <StartMatricula userInfo={userInfo} />;

    default:
      return <BlankPage />;
  }

}