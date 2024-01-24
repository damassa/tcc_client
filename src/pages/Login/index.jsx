import React from 'react';
import './style.css';

const Login = () => {
    return (
        <div className='login--wrapper'>
            <div className="login">
                <h1 className='mb-3'>Login</h1>
                <form className="needs-validation">
                    <div className='form-group was-validated mb-2'>
                        <label htmlFor="email" className='form-label'>E-mail</label>
                        <input type="email" className='form-control' required />
                        <div className="invalid-feedback">
                            Por favor, entre com seu e-mail
                        </div>
                    </div>
                    <div className='form-group was-validated mb-2'>
                        <label htmlFor="password" className='form-label'>Senha</label>
                        <input type="password" className='form-control' required />
                        <div className="invalid-feedback">
                            Por favor, entre com sua senha
                        </div>
                    </div>
                    <div className='form-group form-check mb-2'>
                        <input type="checkbox" className='form-check-input'/>
                        <label htmlFor="check" className='form-label'>Remember me</label>
                    </div>
                    <button className="btn btn-success w-100 mt-2" type='submit'>LOGIN</button>
                </form>
            </div>
        </div>
    );
}

export default Login;