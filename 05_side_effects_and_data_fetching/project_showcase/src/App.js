import { useState, useEffect } from "react"
import Header from "./components/navigation/Header";
import ProjectForm from "./components/project/ProjectForm";
import ProjectList from "./components/project/ProjectList";
import SearchBar from "./components/search/SearchBar";
import ButtonsFilter from "./components/search/ButtonsFilter";
import { v4 as uuidv4 } from "uuid"
import Timer from "./components/timer/Timer";

const App = () => {
  //! LOCAL STATE
  //! the hook returns an array with ALWAYS two elements
  //! the ONLY WAY TO UPDATE the state variable is by using the state function
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showTimer, setShowTimer] = useState(false);
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("")
  const [phaseSelected, setPhaseSelected] = useState("All");
  const [error, setError] = useState("");

  //! CRUD
  const addProject = (newProject) => {
    setProjects(currentProjects => {
      const lastProjectArray = currentProjects.slice(-1)
      const id = lastProjectArray.length ? Number(lastProjectArray[0].id) + 1 : uuidv4()
      return [...currentProjects, { ...newProject, id }]
    })
  }

  const removeLastProject = () => {
    setProjects(currentProjects => currentProjects.slice(0, -1))
  }

  const handlePhaseSelection = (e) => {
    if (e.target.textContent === "All") {
      setPhaseSelected("All")
    } else {
      const phase = e.target.textContent.slice(-1)
      setPhaseSelected(Number(phase))
    }
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  //! LOCAL NON-STATE VARIABLES DO NOT CAUSE RE-RENDERS
  // let count = 0
  
  const fetchDataAsync = async () => {
    try {
      const resp =  await fetch("http://localhost:4000/projects")
      const data = await resp.json()
      setProjects(data)
    } catch (error) {
      setError(error.message)
      setTimeout(() => setError(""), 5000)
    }
  }

  useEffect(() => {
    (() => {
      fetch("http://localhost:4000/projects")
        .then((res) => res.json())
        .then(setProjects)
        .catch(err => {
          setError(err.message)
          setTimeout(() => setError(""), 5000)
        });
    })()

  })


  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)
  const toggleTimerVisibility = () => setShowTimer(current => !current)

  return (
    <div className={isDarkMode ? "App" : "App light"}>
      {error && <p className="error-message red">{error}</p>}
      <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
      <ProjectForm addProject={addProject} removeLastProject={removeLastProject} />
      {/* <button className="load-btn" onClick={loadProjects}>Load Projects</button> */}
      <button className="load-btn" onClick={toggleTimerVisibility}>{showTimer ? "Hide" : "Show"} Timer</button>
      {showTimer && <Timer />}
      <ButtonsFilter handlePhaseSelection={handlePhaseSelection} />
      <SearchBar handleSearch={handleSearch} searchQuery={searchQuery} />
      <ProjectList projects={projects} searchQuery={searchQuery} phaseSelected={phaseSelected} />
    </div>
  );
};

export default App;