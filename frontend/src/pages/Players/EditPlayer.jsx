import "./EditPlayer.css";
import EditPlayerForm from "../../components/Admin/EditPlayerForm/EditPlayerForm";

// * EditPlayer page
export default function EditPlayer() {
    return (
        <div className="editplayerpage-container">
            <h1>Edit player</h1>
            <EditPlayerForm />
        </div>
    )
}