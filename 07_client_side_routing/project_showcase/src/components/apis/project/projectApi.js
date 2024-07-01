export const fetchDeleteProject = (projectId, fnOnResolve, navigate) => {
    const configObj = {
        method: "DELETE",
    }
    fetch(`http://localhost:4000/projects/${projectId}`, configObj)
    .then(() => fnOnResolve(projectId))
    .then(() => navigate("/projects"))
    .catch(console.log)
}

export const fetchPatchProject = (url, validFormData, handlePatchProject, toggleEditMode, handleError, navigate) => {
    fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(validFormData),
    })
        .then((resp) => resp.json())
        .then((patchedProject) => {
            handlePatchProject(patchedProject)
            navigate("/projects")
        })
        .then(() => toggleEditMode())
        .catch((err) => {
            handleError(err.text);
            setTimeout(() => handleError(""), 5000);
        });
}

export const fetchPostProject = (url, finalizedData, handleFormData, initialState, handleError, navigate) => {
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(finalizedData)
    })
        .then(resp => {
            if (!resp.ok) {
                throw new Error("Failed to fetch because server is not running")
            }
            // handleFormData(initialState)
            navigate("/projects")
        })
        .catch(err => {
            handleError(err.text)
            setTimeout(() => handleError(""), 5000)
            // removeLastProject()
        })
}