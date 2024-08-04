import React from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = ({ theme, toggleTheme }) => {
  return (
    <div className="toggle-switch">
      <span className={`toggle-text ${theme === "light" ? "active" : ""}`}>
        Light
      </span>
      <input
        type="checkbox"
        id="toggle"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <label htmlFor="toggle">
        <span className="slider"></span>
      </label>
      <span className={`toggle-text ${theme === "dark" ? "active" : ""}`}>
        Dark
      </span>
    </div>
  );
};

export default ToggleSwitch;
