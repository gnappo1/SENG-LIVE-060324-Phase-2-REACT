import { useState } from "react";
// import React from "react";

const Header = () => {
  const [darkModeOn, setDarkModeOn] = useState(false);

  return (
    <header className={darkModeOn ? "App" : "App light"}>
      <h1>
        <span className="logo">{"//"}</span>
        Project Showcase
      </h1>
      <button onClick={(e) => setDarkModeOn(currentValueForDarkMode => !currentValueForDarkMode)}>{darkModeOn ? "Light" : "Dark"} Mode</button>
    </header>
  );
}

export default Header;
