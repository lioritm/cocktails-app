import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./style.css";
const BackToPrev = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="flex justify-center">
      <button className="flex align-center back-btn" onClick={goBack}>
        <FaArrowLeft /> <span className="btn-text">Go back</span>
      </button>
    </div>
  );
};

export default BackToPrev;
