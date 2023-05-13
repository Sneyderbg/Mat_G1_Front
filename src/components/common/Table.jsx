import { v4 as uuidv4 } from "uuid";
import React from "react";

/**
 *
 * @param {*} props = {className?, head[], body[][]}
 */
export function Table(props) {
  checkProps(props);
  const { className, head, body } = props;

  return (
    <table className={className || ""}>
      <thead>
        <tr>
          {head.map((head) => (
            <th key={uuidv4()}>{head}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {body.map((row) => (
          <tr key={uuidv4()}>
            {row.map((col) => (
              <td key={uuidv4()}>{col}</td>
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
    throw new Error("Table body must have at least one element");
  }
  // if (props.head.length !== props.body.length) {
  //   throw new Error('Table head and body must have the same length');
  // }
}
