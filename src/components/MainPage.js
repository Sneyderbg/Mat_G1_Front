import "./MainPage.css";
import { OfertaDeMaterias } from "./oferta/OfertaDeMaterias";

/**
 * Componente que renderiza la página principal (o página general) de la app web.
 *
 * @param {*} props Propiedades = {}
 * @returns Render del componente.
 */
export function MainPage(props) {
  return (
    <div>
      <OfertaDeMaterias></OfertaDeMaterias>
    </div>
  );
}