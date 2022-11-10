import React, { FC, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../index';
import { USER_REGISTER } from '../../endpoints';
const RegisterPage: FC<{}> = ({  }) => {
    const navigate = useNavigate();
    const [payload, setPayload] = useState({fullName: "", email:"", password:"", rePassword:""});
    const onChange = (value:any, fieldName:string) => {
        const data:any = {...payload}
        data[fieldName] = value;
        setPayload(data);
    }

    const onReset = ()=>{
        setPayload({fullName:"", email:"", password:"", rePassword:""});
    }
    
    const onSubmit = () =>{
        if(payload.fullName == ""
            || payload.email == "" 
            || payload.password == "" 
            || payload.rePassword == ""){
            alert('All field is Manadatory')
            return;
        }

        if(payload.password !== payload.rePassword){
            alert('Password and re password did not match')
            return;
        }

        axios.post(`${USER_REGISTER}`,payload)
            .then(res => {
                console.log(res.data);
                if(res.data.success){
                    alert("Hello "+ payload.fullName + ' '+res.data.message);
                    navigate('/login');
                }else{
                    alert(res.data.message);
                }
            }).catch(err => {
                alert(err);
        })


    }

    return (
        <>
        <div className="layout-main">
            <div className="container">
                <div className="main">
                <h3 className="page-heading">Register</h3>
                <div className="page-inner login-inner">
                <form id="form" className="myform">

                    <div className="field-box">
                    <div className="field-box-inner">
                        <label>Full Name</label>
                        <input
                            name='FullName'
                            id='fullName'
                            type='text'
                            placeholder='Full Name'
                            onChange={(e) => onChange(e.target.value, 'fullName')}
                            value={payload.fullName}
                        />
                    </div>
                    </div>
                    
                    <div className="field-box">
                    <div className="field-box-inner">
                        <label>User Email Id</label>
                        <input
                            name='Email'
                            id='email'
                            type='text'
                            placeholder='Email Id'
                            onChange={(e) => onChange(e.target.value, 'email')}
                            value={payload.email}
                        />
                    </div>
                    </div>
                    <div className="field-box">
                    <div className="field-box-inner">
                        <label>Password</label>
                        <input
                            name='Password'
                            id='password'
                            type='password'
                            placeholder='Password'
                            onChange={(e) => onChange(e.target.value, 'password') }
                            value={payload.password}
                            />
                    </div>
                    </div>
                    <div className="field-box">
                        <div className="field-box-inner">
                            <label>Re Enter Password</label>
                            <input
                                name='Re Password'
                                id='rePassword'
                                type='password'
                                placeholder=' Re Password'
                                onChange={(e) => onChange(e.target.value, 'rePassword') }
                                value={payload.rePassword}
                                />
                        </div>
                    </div>
                    <div className="field-box">
                    <div className="field-box-inner control-box">
                        <button type='reset' onClick={onReset}>Reset</button>
                        <button type='button' onClick={onSubmit}>Register</button>
                    </div>
                    </div>
                    <div className="field-box">
                    <div className="field-box-inner">
                        <p>Already having Account? Go for Login.</p>
                        <Link to={'/login'}>Login</Link>
                    </div>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
            
        </>
    );
};

export default RegisterPage;