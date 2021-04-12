import LogoImg from "../../utils/Logo";
import { Circle } from "better-react-spinkit";

export default function Loading() {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <LogoImg />
        <div style={{ marginBottom: 50 }} />
        <Circle color="#3cbc28" size="60px" />
      </div>
    </center>
  );
}
