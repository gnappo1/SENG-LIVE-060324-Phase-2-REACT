import { useState } from "react"

import ProjectListItem from "./ProjectListItem";

const ProjectList = ({ projects }) => {
  const [phaseSelected, setPhaseSelected] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");


  const filteredProjects = projects
                            .filter(project => phaseSelected === "All" || project.phase === phaseSelected)
  const projectListItems = filteredProjects.map((project) => (
    <ProjectListItem key={project.id} {...project}/>
  ));

  const handlePhaseSelection = (e) => {
    
    const phase = e.target.innerText
    if (phase === "All") {
      setPhaseSelected("All")
    } else {
      const intPhase = Number(phase.replace("Phase ", ""))
      setPhaseSelected(intPhase)
    }
  }

  return (
    <section>
      <h2>Projects</h2>

      <div onClick={handlePhaseSelection} className="filter">
        <button>All</button>
        <button>Phase 5</button>
        <button>Phase 4</button>
        <button>Phase 3</button>
        <button>Phase 2</button>
        <button>Phase 1</button>
      </div>
      <input type="text" placeholder="Search..."/>

      <ul className="cards">{projectListItems}</ul>
    </section>
  );
};

export default ProjectList;
