
/**
 *
 * @param {*} props = {fnBtnAction, btnText?, closing?, children}
 * @returns
 */
export function Popup(props) {
  return (
    <div className={`popup__background${props.closing ? " popup__background--disappearing" : ""}`}>
      <div className="popup">
        {props.children}
        <button
          onClick={() => {
            props.fnBtnAction();
          }}
        >
          {props.btnText ? props.btnText : "Regresar"}
        </button>
      </div>
    </div>
  );
}
