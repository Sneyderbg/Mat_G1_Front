const DAYS = ["L", "M", "W", "J", "V", "S", "D"];

export function formatHorario(horario) {
  let str = "";
  horario.forEach((h) => {
    str = str.concat(`${DAYS[h.diaSemana]}${h.horaInicio}-${h.horaFin} `);
  });
  str = str.slice(0, -1);
  return str;
}

export function formatSelectedGroup(group) {
  return group && group.selected
    ? `${group.numeroGrupo} - ${formatHorario(group.horario)}`
    : "Ninguno";
}

export function intersects(hour0, hour1) {
  const sameDay = hour0.diaSemana === hour1.diaSemana;
  if (!sameDay) {
    return false;
  }
  return (
    (hour0.horaInicio < hour1.horaFin && hour0.horaInicio > hour1.horaInicio) ||
    (hour0.horaFin < hour1.horaFin && hour0.horaFin > hour1.horaInicio) ||
    hour0.horaInicio === hour1.horaInicio ||
    hour0.horaFin === hour1.horaFin
  );
}
