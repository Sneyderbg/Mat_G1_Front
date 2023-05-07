/**
 *
 * @param {*} props = {className?, head[], body[][]}
 */
export function Table(props) {
  checkProps(props);

  return (
    <table className={props.className ? props.className : ""}>
      <thead>
        <tr>
          {props.head.map((head, i) => (
            <th key={i}>{head}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.body.map((row, i) => (
          <tr key={i}>
            {row.map((col, j) => (
              <td key={j}>{col}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function checkProps(props) {
  if (!Array.isArray(props.head)) {
    throw new Error("head must be an array");
  }
  if (!Array.isArray(props.body)) {
    throw new Error("body must be an array");
  }
  if (props.head.length === 0) {
    throw new Error("Table head must have at least one element");
  }
  if (props.body.length === 0) {
    console.log(props.body);
    throw new Error("Table body must have at least one element");
  }
  // if (props.head.length !== props.body.length) {
  //   throw new Error('Table head and body must have the same length');
  // }
}
