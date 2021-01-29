import React, { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';

const Login = props => {
    const [user, setUser] = useState({username: '', password: ''});
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onChange = e => {
        e.preventDefault();
        setUser({...user, [e.target.name] : e.target.value});
        console.log(user)
    }

    const onSubmit = e => {
        e.preventDefault();
        AuthService.login(user).then(data => {
            console.log(data);
            const { isAuthenticated, user, message } = data;
            if(isAuthenticated) {
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                props.history.push('/todos');
            } else
                setMessage(message);
            
        });
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <h3>Please sign in</h3>
                <label htmlFor='username' className='sr-only'>Username: </label>
                <input type='text' 
                    name='username' 
                    onChange={onChange} 
                    className='form-control' 
                    placeholder='Enter Username' />
                <label htmlFor='password' className='sr-only'>Password: </label>
                <input type='password' 
                    name='password' 
                    onChange={onChange} 
                    className='form-control' 
                    placeholder='Enter Password' />
                <button className='btn btn-lg btn-primary btn-block' 
                    type='submit'>Login</button>
                {message ? <Message message={message}/> : null}
            </form>
            
        </div>
    )
}

export default Login;

