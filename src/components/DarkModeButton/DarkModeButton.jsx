import React, { useContext } from "react";
import { ThemeContext } from "../../../src/context/ThemeContext";
import darkModeIconOn from "../../assets/dark-on.svg";
import darkModeIconOff from "../../assets/dark-off.svg";
import { Button } from "react-bootstrap";
import "./DarkModeButton.css";

export const DarkModeButton = () => {
  const { isDarkMode, toggleIsDarkMode } = useContext(ThemeContext);

  return (
    <Button
      className="button filled-secondary dark-mode"
      onClick={toggleIsDarkMode}
    >
      {isDarkMode === true ? (
        <img src={darkModeIconOn} alt="" width={25} />
      ) : (
        <img src={darkModeIconOff} alt="" width={25} />
      )}
    </Button>
  );
};
