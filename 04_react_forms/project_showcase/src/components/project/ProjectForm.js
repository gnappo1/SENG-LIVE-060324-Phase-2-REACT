import { useState } from "react"

const ProjectForm = ({ handleAddNewProject }) => {
  const [name, setName] = useState("")
  const [about, setAbout] = useState("")
  const [phase, setPhase] = useState("")
  const [link, setLink] = useState("")
  const [image, setImage] = useState("")

  const handleSubmit = (e) => {
    //! No page refreshes
    e.preventDefault()

    //! validate the data
    const inputValues = [name, about, phase, link, image]
    const validData = inputValues.every(value => value.trim() !== "")
    if (!validData) {
      alert("Please fill out all of the form fields")
      return
    }

    //! Collect the data into an object
    //! remember that when a key and a value have the same name, you can only type that name once
    const newProject = { name, about, phase, link, image }

    // debugger
    //! Pessimistically talk to the server and THEN update the page
    fetch("http://localhost:4000/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject)
    })
    .then(resp => resp.json())
    .then(createdProject => handleAddNewProject(createdProject))
    .catch(err => alert(err))

    //! Reset the form by resetting state to its initial value
    setName("")
    setAbout("")
    setPhase("")
    setLink("")
    setImage("")
  }

  return (
    <section>
      <p className="error"></p>
      <form onSubmit={handleSubmit} className="form" autoComplete="off">
        <h3>Add New Project</h3>

        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required/>

        <label htmlFor="about">About</label>
        <textarea id="about" name="about" value={about} onChange={(e) => setAbout(e.target.value)}  required/>

        <label htmlFor="phase">Phase</label>
        <select name="phase" id="phase" value={phase} onChange={(e) => setPhase(e.target.value)} required>
          <option>Select One</option>
          <option value="1">Phase 1</option>
          <option value="2">Phase 2</option>
          <option value="3">Phase 3</option>
          <option value="4">Phase 4</option>
          <option value="5">Phase 5</option>
        </select>

        <label htmlFor="link">Project Homepage</label>
        <input type="text" id="link" name="link" value={link} onChange={(e) => setLink(e.target.value)}  required/>

        <label htmlFor="image">Screenshot</label>
        <input type="text" id="image" name="image" value={image} onChange={(e) => setImage(e.target.value)}  required/>

        <input type="submit" value="Add Project" />
      </form>
    </section>
  );
};

export default ProjectForm;
