import { useState } from "react"
import { string, object } from 'yup';

const projectSchema = object({
  name: string().required("Name is required!"),
  about: string().required(),
  phase: string().required(),
  link: string().required(),
  image: string().required(),
});

const initialState = {
  name: "",
  about: "",
  phase: "",
  link: "",
  image: "",
}

const ProjectForm = ({ handleAddNewProject }) => {
  const [formData, setFormData] = useState(initialState)

  const handleChange = ({target: {name, value}}) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    //! No page refreshes
    e.preventDefault()

    //! validate the data with yup

    projectSchema.validate(formData)
    .then(validatedData => {

      //! Pessimistically talk to the server and THEN update the page
      fetch("http://localhost:4000/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData)
      })
      .then(resp => resp.json())
      .then(createdProject => handleAddNewProject(createdProject))
      .catch(err => alert(err))
  
      //! Reset the form by resetting state to its initial value
      setFormData(initialState)
    })
    .catch((errorObj) => console.log(`${errorObj.name}: ${errorObj.message}`))

  }

  return (
    <section>
      <p className="error"></p>
      <form onSubmit={handleSubmit} className="form" autoComplete="off">
        <h3>Add New Project</h3>

        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required/>

        <label htmlFor="about">About</label>
        <textarea id="about" name="about" value={formData.about} onChange={handleChange}  required/>

        <label htmlFor="phase">Phase</label>
        <select name="phase" id="phase" value={formData.phase} onChange={handleChange} required>
          <option>Select One</option>
          <option value="1">Phase 1</option>
          <option value="2">Phase 2</option>
          <option value="3">Phase 3</option>
          <option value="4">Phase 4</option>
          <option value="5">Phase 5</option>
        </select>

        <label htmlFor="link">Project Homepage</label>
        <input type="text" id="link" name="link" value={formData.link} onChange={handleChange}  required/>

        <label htmlFor="image">Screenshot</label>
        <input type="text" id="image" name="image" value={formData.image} onChange={handleChange}  required/>

        <input type="submit" value="Add Project" />
      </form>
    </section>
  );
};

export default ProjectForm;
