import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MiniCard = ({ icon, text, cdata, unit }) => {
  return (
    <div className="card p-2 text-center" style={{
      backgroundColor: "rgba(0,0,0,0.3)",
      borderRadius: "10px",
      minWidth: "120px",
      color: "#fff"
    }}>
      <FontAwesomeIcon icon={icon} size="lg" />
      <div style={{ fontSize: "14px", marginTop: "5px" }}>
        {text} <strong>{cdata}</strong> {unit}
      </div>
    </div>
  );
};

export default MiniCard;