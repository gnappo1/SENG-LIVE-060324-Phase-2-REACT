import { useState } from "react";
// import React from "react";

const Header = () => {
  const [darkModeOn, setDarkModeOn] = useState(false);
  const toggleDarkMode = (e) => setDarkModeOn(currentValueForDarkMode => !currentValueForDarkMode)

  return (
    <header className={darkModeOn ? "App" : "App light"}>
      <h1>
        <span className="logo">{"//"}</span>
        Project Showcase
      </h1>
      <button onClick={toggleDarkMode}>{darkModeOn ? "Light" : "Dark"} Mode</button>
    </header>
  );
}

export default Header;
