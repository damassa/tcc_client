import React, { useState } from 'react';
import UserIcon from '../../assets/person.png';
import EmailIcon from '../../assets/email.png';
import PasswordIcon from '../../assets/password.png';
import './styles';

const Login = () => {
    const [action, setAction] = useState("Registro");
    

    return (
        <div className='login--container'>
            <div className='login--header'>
                <div className='login--text'>
                    {action}
                </div>
                <div className='login--underline'></div>
            </div>
            <div className='login--inputs'>
                {action==="Login"?<div></div>: <div className='login--input'>
                    <img src={UserIcon} alt="" />
                    <input type="text" placeholder='Nome' />
                </div>}
                <div className='login--input'>
                    <img src={EmailIcon} alt="" />
                    <input type="email" placeholder='E-mail' />
                </div>
                <div className='login--input'>
                    <img src={PasswordIcon} alt="" />
                    <input type="password" placeholder='Senha' />
                </div>
            </div>
            {action==="Registro"?<div></div>:<div className="forgotPassword">Esqueceu sua senha? <span>Clique aqui</span></div>}
            <div className="login--submitContainer">
                <div className={action === "Login" ? "login--submit gray" : "login--submit"} onClick={() => {setAction("Registro")}}>Registrar</div>
                <div className={action === "Registro" ? "login--submit gray" : "login--submit"} onClick={() => {setAction("Login")}}>Login</div>
            </div>
        </div>
    );
}

export default Login;