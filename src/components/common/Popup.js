import { useEffect, useState } from "react";

/**
 *
 * @param {*} props = {visible, fnBtnAction, btnText?, children}
 * @returns
 */
export function Popup(props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  return visible ? (
    <div className="popup__background">
      <div className="popup">
        {props.children}
        <button
          onClick={() => {
            if (!props.fnBtnAction) {
              setVisible(false); // no btnAction func was found, default is close popup
            } else {
              props.fnBtnAction();
            }
          }}
        >
          {props.btnText ? props.btnText : "Regresar"}
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}
