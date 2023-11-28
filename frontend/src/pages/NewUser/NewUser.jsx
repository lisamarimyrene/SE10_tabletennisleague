import './NewUser.css';
import NewUserForm from '../../components/NewUser/NewUserForm';

// * NewUser page
export default function NewUser(){
    return (
        <div className="newuserpage-container">
            <h1>Create account</h1>
            <NewUserForm />
        </div>
    )
}