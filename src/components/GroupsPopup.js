import { GroupsTable } from "./GroupsTable";
import "./GroupsPopup.css";

export function GroupsPopup(props) {
  return props.trigger ? (
    <div className="popup-background">
      <div id="popup" className="popup">
        <div id="txtpopuptitle" className="txtpopuptitle">
          Grupos y horarios disponibles para esta materia
        </div>
        <div id="txtcourse" className="txtcourse">
          {props.data.hasOwnProperty("id")
            ? "[" + props.data.id + "] " + props.data.name
            : props.data.hasOwnProperty("error")
            ? props.data.error
            : "Cargando información..."}
        </div>
        <GroupsTable
          className="groupsTable"
          groupsList={
            props.data.hasOwnProperty("groups") ? props.data.groups : []
          }
        ></GroupsTable>
        <div id="btnback" className="btnback">
          <button
            id="btnClosePopup"
            className="btnClosePopup"
            onClick={() => props.setTrigger(false)}
          >
            Regresar
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
