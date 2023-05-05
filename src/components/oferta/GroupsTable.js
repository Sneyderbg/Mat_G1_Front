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
        {props.groupsList.map((group, idx) => {
          return (
            <tr key={idx}>
              <td>{`${group.grupoId}-${group.numeroGrupo}`}</td>
              <td>-1</td>
              {/*FIXME: no quotas in response*/}
              <td>{group.aula}</td>
              <td>{formatHorario(group.horario)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

//TODO: implement
function formatHorario(horario) {
  return horario;
}
