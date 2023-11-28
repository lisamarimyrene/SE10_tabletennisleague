import './Login.css';
import LoginForm from '../../components/LoginForm/LoginForm';

// * Login page
export default function Login(){
    return(
        <div className='loginpage-container'>
            <h1>Login</h1>
            <p>Please log in to get the overview access to players, matches and your profile.</p>
            <LoginForm />
        </div>
    )
}
