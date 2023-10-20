import "../assets/knowledgeCard.css";
import { LogoDisplay } from "./logoDisplay";

export function KnowledgeCard(props) {
  return (
    <div className="knowledgeCard">
      <h4>{props.header}</h4>

      <LogoDisplay images={props.images} />
    </div>
  );
}
