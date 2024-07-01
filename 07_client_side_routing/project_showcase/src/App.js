import { useState, useEffect } from "react"
import Header from "./components/navigation/Header";
import ProjectForm from "./components/project/ProjectForm";
import ProjectList from "./components/project/ProjectList";
import SearchBar from "./components/search/SearchBar";
import ButtonsFilter from "./components/search/ButtonsFilter";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("")
  const [phaseSelected, setPhaseSelected] = useState("All");
  
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:4000/projects`)
        const data = await response.json()
        setProjects(data);
      } catch (error) {
        alert(error)
      }
    })()
  }, [])
  
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

  const handleAddProject = (newProject) => {
    setProjects(currentProjects => {
      return [...currentProjects, newProject]
    })
  }

  const handlePatchProject = (patchedProject) => {
    setProjects(current => current.map(project => project.id === patchedProject.id ? patchedProject : project))
  }

  const toggleDarkMode = () => setIsDarkMode(current => !current)

  const handleDelete = (projectId) => {
    //! using the functional form because the new list of projects ahs to be calculated based on the most recent list version
    setProjects(current => current.filter(project => project.id !== projectId)) 
  }

  return (
    <div className={isDarkMode ? "App" : "App light"}>
      <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
      <ProjectForm handleAddProject={handleAddProject} />
      <ButtonsFilter handlePhaseSelection={handlePhaseSelection}/>
      <SearchBar handleSearch={handleSearch} searchQuery={searchQuery} />
      <ProjectList handlePatchProject={handlePatchProject} handleDelete={handleDelete} projects={projects} searchQuery={searchQuery} phaseSelected={phaseSelected}  />

    </div>
  );
};

export default App;
