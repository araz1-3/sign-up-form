import React,{useState,useEffect } from 'react';

//style
import styled from "./SignUp.module.css"

//link
import {Link} from "react-router-dom";

//toastify
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {notify} from "./toast";

//icon
import GifLog from "../assests/Login.gif"
import Email from "../assests/email (1).svg"
import pass from "../assests/lock.svg"


//errors
import {Validate} from "./Validate";

const Login = () => {

    const [data ,setDate]=useState({
        email:"",
        password:"",
    })


    const [errors ,setErrors]=useState({})
    const [touch ,setTouch] = useState({})


    const ChangeHandler=(e)=>{
        if(e.target.name === "isChecked"){
            setDate({...data,[e.target.name]:e.target.checked})
        }else{
            setDate({...data,[e.target.name]:e.target.value})
        }
        console.log(data)
    }

    useEffect(()=>{
        setErrors(Validate(data,"Login"))
        console.log(errors)
    },[data,touch])


    const focusHandler =(e)=>{
        setTouch({...touch,[e.target.name]:true})
    }

    const submitHandler =(e)=>{
        e.preventDefault()
        if (!Object.keys(errors).length){
            fetch('https://api.freerealapi.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                })
            })
                .then((response) => response.json())
                .then((json) =>{
                    if (json.success === true){
                        notify("you logged in successfully","success")
                    }else {
                        notify(json.message,"error")
                    }
                    console.log(json)
                })
            console.log(data)
        }else {
            notify("invalid data!","error")
            setTouch({
                email:true,
                password:true,
            })
        }
    }


    return (
        <div>
            <form className={styled.form} onSubmit={submitHandler}>
                <img src={GifLog} alt="Login"/>
                <h2 className={styled.title}>Welcome!</h2>
                <p className={styled.paragraph}>Sign in to your account</p>
                <div className={styled.inputContainer}>
                    <label>Email</label>
                    <div className={styled.contain}>
                        <img src={Email} alt="email"/>
                        <input className={(errors.email && touch.email)?styled.uncompleted:styled.formInput} type="text" name="email" value={data.email} onChange={ChangeHandler} onFocus={focusHandler} />
                    </div>
                    {errors.email && touch.email && <span>{errors.email}</span>}
                </div>
                <div className={styled.inputContainer}>
                    <label>Password</label>
                    <div className={styled.contain}>
                        <img src={pass} alt="pass"/>
                        <input className={(errors.password && touch.password)?styled.uncompleted:styled.formInput} type="password" name="password" value={data.password} onChange={ChangeHandler} onFocus={focusHandler} />
                    </div>
                    {errors.password && touch.password && <span>{errors.password}</span>}
                </div>
                <div className={styled.forget}>
                    <a href="#">forgot password?</a>
                </div>
                <div className={styled.formButtons}>
                    <Link to="/signup">Sign up</Link>
                    <button>Login</button>
                </div>
            </form>
            <ToastContainer/>
        </div>
    );
};

export default Login;