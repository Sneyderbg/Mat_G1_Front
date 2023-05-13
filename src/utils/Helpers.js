const DAYS = ["L", "M", "W", "J", "V", "S", "D"];

export function formatHorario(horario) {
  let str = "";
  horario.forEach((h) => {
    str = str.concat(`${DAYS[h.diaSemana]}${h.horaInicio}-${h.horaFin} `);
  });
  str = str.slice(0, -1);
  return str;
}
