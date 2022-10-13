import React, { FC, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../index';
import { USER_LOGIN } from '../../endpoints';
const LoginPage: FC<{}> = ({  }) => {
    const navigate = useNavigate();
    const [payload, setPayload] = useState({email:"", password:""});
    const {setIsLoggedIn} = useContext(AppContext);
    const {setUserInfo} = useContext(AppContext);
    const onChange = (value:any, fieldName:string) => {
        const data:any = {...payload}
        data[fieldName] = value;
        setPayload(data);
    }

    const onReset = ()=>{
        setPayload({email:"", password:""});
    }
    const onSubmit = () =>{
        if((payload.email == "") || payload.password == ""){
            alert('User Email & Password is manadatory')
        }else{
            axios.post(`${USER_LOGIN}`,payload)
            .then(res => {
                console.log(res.data);
                if(res.data.success){
                    localStorage.setItem('userInfo', JSON.stringify(res.data));
                    setIsLoggedIn(true);
                    setUserInfo(res.data);
                    navigate('/');
                }else{
                    alert(res.data.message);
                }
            }).catch(err => {
                alert(err);
            })
        }
    }

    return (
        <>
        <div className="layout-main">
            <div className="container">
                <div className="main">
                <h3 className="page-heading">Login</h3>
                <div className="page-inner login-inner">
                <form id="form" className="myform">
                    
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
                            type='text'
                            placeholder='Password'
                            onChange={(e) => onChange(e.target.value, 'password') }
                            value={payload.password}
                            />
                    </div>
                    </div>
                    <div className="field-box">
                    <div className="field-box-inner control-box">
                        <button type='reset' onClick={onReset}>Reset</button>
                        <button type='button' onClick={onSubmit}>Login</button>
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

export default LoginPage;