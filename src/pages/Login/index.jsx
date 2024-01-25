import React from 'react';
import './style.css';
import LoginButton from '../../components/LoginButton';

const Login = () => {
    return (
        <div className='login--wrapper'>
            <div className="login">
                <h1>Login</h1>
                <div className="errorMessage"></div>
                <div className="row">
                    <input className='login--input' type="email" placeholder='E-mail' />
                </div>
                <div className="row">
                    <input className='login--input' type="password" placeholder='Senha' />
                </div>
                <LoginButton />
            </div>
        </div>
    );
}

export default Login;