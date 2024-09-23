import React from "react";
import "./Loader.css";

export const Loader = () => {
  return (
    <div className="pt-5 flex flex-col gap-5 items-center justify-start h-screen">
      <h3 className="text-2xl font-bold text-gray-200">Fetching data...</h3>
      <div className="spinner center">
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
      </div>
    </div>
  );
};
