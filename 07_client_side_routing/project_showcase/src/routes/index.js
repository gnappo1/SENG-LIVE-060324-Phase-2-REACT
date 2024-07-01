import { createBrowserRouter } from "react-router-dom"
import App from "../App.js"
import ProjectsContainer from "../components/project/ProjectsContainer.jsx";
import ProjectForm from "../components/project/ProjectForm.js"
import ProjectListItem from "../components/project/ProjectListItem.js";
import ErrorPage from "../components/error/ErrorPage.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/projects",
                element: <ProjectsContainer />
            },
            {
                path: "/projects/new",
                element: <ProjectForm />
            },
            {
                path: "/projects/:projectId",
                element: <ProjectListItem />
            },
            // {
            //     index: true,
            //     element: <ProjectsContainer />
            // }
        ],
    },
]);