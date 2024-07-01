import ButtonsFilter from "../search/ButtonsFilter";
import SearchBar from "../search/SearchBar";
import ProjectList from "./ProjectList";
import { useOutletContext } from "react-router-dom";
const ProjectsContainer = () => {
  const {
    handlePhaseSelection,
    handleSearch,
    searchQuery,
    handlePatchProject,
    handleDelete,
    projects,
    phaseSelected,
  } = useOutletContext();
  return (
    <div>
      <ButtonsFilter handlePhaseSelection={handlePhaseSelection} />
      <SearchBar handleSearch={handleSearch} searchQuery={searchQuery} />
      <ProjectList
        handlePatchProject={handlePatchProject}
        handleDelete={handleDelete}
        projects={projects}
        searchQuery={searchQuery}
        phaseSelected={phaseSelected}
      />
    </div>
  );
};

export default ProjectsContainer;
