import React from "react";

/**
 *
 * @param {*} props = {fnBtnAction, btnText?, closing?, children}
 * @returns
 */
export function Popup({ closing, children, fnBtnAction, btnText }) {
  return (
    <div
      className={`popup__background${
        closing ? " popup__background--disappearing" : ""
      }`}
    >
      <div className="popup">
        {children}
        <button
          type="button"
          onClick={() => {
            fnBtnAction();
          }}
        >
          {btnText || "Regresar"}
        </button>
      </div>
    </div>
  );
}
