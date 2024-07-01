import { Link, NavLink } from "react-router-dom"

const Header = ({isDarkMode, onToggleDarkMode}) => {
  return (
    <header>
      <h1>
        <span className="logo">{"//"}</span>
        Project Showcase
      </h1>
      <NavLink to="/projects" className={({isActive}) => isActive ? "active" : ""}>All Projects</NavLink>
      <NavLink to="/projects/new" className={({isActive}) => isActive ? "active" : ""}>New Project</NavLink>
      <button onClick={onToggleDarkMode}>{isDarkMode ? "Light Mode" : "Dark Mode"}</button>
    </header>
  );
}

export default Header;