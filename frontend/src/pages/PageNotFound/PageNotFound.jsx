import "./PageNotFound.css"
import { useNavigate } from "react-router-dom";

// * PageNotFound page
export default function PageNotFound() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/")
    }

    return (
        <div className="pageNotFound-container">
            <h1>404 Page Not found!</h1>
            <button onClick={handleNavigate}>Go to Homepage</button>
        </div>
    );
}
