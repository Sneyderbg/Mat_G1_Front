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
          [{props.data.course.id}] {props.data.course.name}
        </div>
        <GroupsTable className="groupsTable" groupsList={props.data.groupsList}></GroupsTable>
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
