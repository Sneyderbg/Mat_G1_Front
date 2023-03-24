import "./GroupsTable.css";

export function GroupsTable(props) {
  return (
    <table className="groupsTable">
      <thead className="groupsTHead">
        <tr>
          <td>Grupo</td>
          <td>Cupos</td>
          <td>Aula</td>
          <td>Horarios</td>
        </tr>
      </thead>
      <tbody className="groupsTBody">
        {props.groupsList.map((group) => {
          return (
            <tr key={group.id}>
              <td>{group.id}</td>
              <td>{group.quotasLeft}</td>
              <td>{group.classroom}</td>
              <td>{group.hours}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
