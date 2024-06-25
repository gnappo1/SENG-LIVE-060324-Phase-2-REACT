import { useState } from "react"
import Header from "./components/navigation/Header";
import ProjectForm from "./components/project/ProjectForm";
import ProjectList from "./components/project/ProjectList";
import PhaseSelection from "./components/searching/PhaseSelection";
import SearchBar from "./components/searching/SearchBar";

const App = () => {
  //! LOCAL STATE
  //! the hook returns an array with ALWAYS two elements
  //! the ONLY WAY TO UPDATE the state variable is by using the state function
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("")
  const [phaseSelected, setPhaseSelected] = useState("All");
  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }
  const handlePhaseSelection = (e) => {
    if (e.target.textContent === "All") {
      setPhaseSelected("All")
    } else {
      const phase = e.target.textContent.replace("Phase ", "")
      setPhaseSelected(Number(phase))
    }
  }

  //! LOCAL NON-STATE VARIABLES DO NOT CAUSE RE-RENDERS
  // let count = 0

  const toggleDarkMode = () => setIsDarkMode(current => !current)

  return (
    <div className={isDarkMode ? "App" : "App light"}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <ProjectForm />
      <PhaseSelection handlePhaseSelection={handlePhaseSelection }/>
      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
      <ProjectList searchQuery={searchQuery} phaseSelected={phaseSelected} />
    </div>
  );
};

export default App;
