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
import Person from "../assests/Animation (1).gif"
import pIcon from "../assests/person (1).svg"
import Email from "../assests/email (1).svg"
import pass from "../assests/lock.svg"
import ConfirmPass from "../assests/lock (1).svg"

//errors
import {Validate} from "./Validate";

//axios
import axios from "axios";


const SignUp = () => {

    const [data ,setDate]=useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
        isChecked:false
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
        setErrors(Validate(data,"SignUp"))
        console.log(errors)
    },[data,touch])


    const focusHandler =(e)=>{
        setTouch({...touch,[e.target.name]:true})
    }

    const submitHandler =(e)=>{
        e.preventDefault()
        if (!Object.keys(errors).length){
                fetch('https://api.freerealapi.com/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: data.name,
                            email: data.email,
                                password: data.password,
                    })
                })
                    .then((response) => response.json())
                    .then((json) => console.log(json))
            notify("Your account has ben created successfully","success")
            console.log(data)
        }else {
            notify("invalid data!","error")
            setTouch({
                name:true,
                email:true,
                password:true,
                confirmPassword:true,
                isChecked:true
            })
        }
    }

    return (
        <div>
            <form className={styled.form} onSubmit={submitHandler}>
                <img src={Person} alt="person"/>
                <h2 className={styled.title}>Create account!</h2>
                <div className={styled.inputContainer}>
                    <label>Name</label>
                    <div className={styled.contain}>
                        <img  src={pIcon} alt="pIcon"/>
                        <input className={(errors.name && touch.name)?styled.uncompleted:styled.formInput} type="text" name="name" value={data.name} onChange={ChangeHandler} onFocus={focusHandler} />
                    </div>

                    {errors.name && touch.name && <span>{errors.name}</span>}
                </div>
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
                <div className={styled.inputContainer}>
                    <label>Confirm Password</label>
                    <div className={styled.contain}>
                        <img src={ConfirmPass} alt="Confirm"/>
                        <input className={(errors.confirmPassword && touch.confirmPassword)?styled.uncompleted:styled.formInput} type="password" name="confirmPassword" value={data.confirmPassword} onChange={ChangeHandler} onFocus={focusHandler} />
                    </div>
                    {errors.confirmPassword && touch.confirmPassword && <span>{errors.confirmPassword}</span>}
                </div>
                <div className={styled.checkboxContainer}>
                    <div className={styled.checkContainer}>
                        <label>I accept terms of privacy policy</label>
                        <input type="checkbox" name="isChecked" value={data.isChecked} onChange={ChangeHandler} onFocus={focusHandler} />
                    </div>
                    {errors.isChecked && touch.isChecked && <span>{errors.isChecked}</span>}
                </div>
                <div className={styled.formButtons}>
                    <Link to="/login">Login</Link>
                    <button>Sign up</button>
                </div>
            </form>
            <ToastContainer/>
        </div>
    );
};

export default SignUp;