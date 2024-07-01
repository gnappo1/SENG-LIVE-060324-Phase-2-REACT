import { useState, useEffect } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa"
import { fetchDeleteProject } from "../apis/project/projectApi";
import EditProjectForm from "./EditProjectForm";
import { Link, useParams, useLocation, useOutletContext, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const ProjectListItem = ({ id, image, name, link, about, phase }) => {
  const projectObj = {id, image, name, link, about, phase}
  const [fetchedProject, setFetchedProject] = useState(null);
  const [error, setError] = useState(null);
  const { projectId } = useParams()
  const location = useLocation()
  const { handlePatchProject, handleDelete } = useOutletContext()
  const navigate = useNavigate()
  console.log("🚀 ~ ProjectListItem ~ location:", location)

  // const {image, name, link, about, phase} = project
  const [clapCount, setClapCount] = useState(0);
  const [editingMode, setEditingMode] = useState(false)
  
  useEffect(() => {
    if (projectId) {
      fetch(`http://localhost:4000/projects/${projectId}`)
      .then(res => res.json())
      .then(setFetchedProject)
        .catch(err => setError(err.message))
    }
  }, [projectId])

  const handleClap = () => setClapCount(current => current + 1);

  const toggleEditMode = () => setEditingMode(current => !current)



  if (error) {
    return <h4>{error}</h4>
  }

  if (!id && !fetchedProject) {
    return <ClipLoader />
  }

  const finalProject = fetchedProject ? fetchedProject : projectObj
  
  const cardJSX = <li className="card">
    <figure className="image">
      <img src={finalProject.image} alt={finalProject.name} />
      <button className="claps" onClick={handleClap}>
        👏{clapCount}
      </button>
    </figure>

    <section className="details">
      <Link to={`/projects/${id}`}><h4>{finalProject.name}</h4></Link>
    { location.pathname !== "/projects" ? (
      <>
        <p>{finalProject.about}</p>
        {finalProject.link ? (
          <p>
            <a href={finalProject.link}>Link</a>
          </p>
        ) : null}
      </>) : null}
    </section>

    <footer className="extra">
      <span className="badge blue">Phase {finalProject.phase}</span>
      {location.pathname !== "/projects" ? (
        <div className="manage">
        <button onClick={toggleEditMode}><FaPencilAlt /></button>
          <button onClick={() => fetchDeleteProject(finalProject.id, handleDelete, navigate)}><FaTrash /></button>
      </div>
      ) : null}
    </footer>
  </li>
  return (
    <>
      {!editingMode ? cardJSX : <EditProjectForm {...finalProject} toggleEditMode={toggleEditMode} handlePatchProject={handlePatchProject } />}
    </>
  );
}

export default ProjectListItem;
