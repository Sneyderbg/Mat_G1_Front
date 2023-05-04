/**
 * Componente que define la tabla en donde se muestran los grupos de un curso.
 *
 * @param {*} props Propiedades = {groupsList}.
 * @returns Render del componente.
 */
export function GroupsTable(props) {
  return (
    <table className="groups-table">
      <thead>
        <tr>
          <td>Grupo</td>
          <td>Cupos</td>
          <td>Aula</td>
          <td>Horarios</td>
        </tr>
      </thead>
      <tbody>
        {console.log(props.groupsList)}
        {props.groupsList.map((group, idx) => {
          return (
            <tr key={idx}>
              <td>{group.Grupo}</td>
              <td>{group.CuposDisponibles - group.Matriculados}</td>
              <td>(No hay)</td>
              <td>
                {group.Horario.replaceAll(":00", "").replaceAll(" ", "").replaceAll(";", " ")}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
