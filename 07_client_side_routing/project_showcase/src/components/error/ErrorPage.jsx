import { useRouteError, Link } from "react-router-dom";
import Header from "../navigation/Header";

const ErrorPage = () => {

    const {error} = useRouteError();
    console.log("🚀 ~ ErrorPage ~ error:", error)
    return (
      <>
        <Header />
        <div>{error.message}</div>
      </>
    );
}

export default ErrorPage