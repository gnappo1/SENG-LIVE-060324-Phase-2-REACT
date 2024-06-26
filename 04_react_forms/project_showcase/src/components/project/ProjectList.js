import ProjectListItem from "./ProjectListItem";

const ProjectList = ({ searchQuery, phaseSelected, loadProjects, projects }) => {

  const handleClick = () => {
    loadProjects();
  };

  const filteredProjects = projects.filter(project => {
    return (phaseSelected === "All" || project.phase === phaseSelected) && (searchQuery === "" || project.name.toLowerCase().includes(searchQuery.toLowerCase()) || project.about.toLowerCase().includes(searchQuery.toLowerCase()))
  })

  // const searchFiltered = filteredProjects.filter(project => {
  //   return searchQuery === "" || project.name.toLowerCase().includes(searchQuery.toLowerCase()) || project.about.toLowerCase().includes(searchQuery.toLowerCase())
  // })

  const renderProjects = () => {
    return filteredProjects.map(project => (
      <ProjectListItem
        key={project.id}
        project={project}
      />
    ))
  }

  return (
    <section>
      <button onClick={handleClick}>Load Projects</button>
      <h2>Projects</h2>

      <ul className="cards">{renderProjects()}</ul>
    </section>
  );
};

export default ProjectList;