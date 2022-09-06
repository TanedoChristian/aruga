import { useEffect, useState } from "react";
import $ from 'jquery';
import axios from "axios";
import {ReactSession } from "react-client-session";


const RegisterBabySitter = () => {





    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [number, setNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [auth ,setAuth] = useState('');
   

    



    const handleChangeName = (e) => {
        setName(e.target.value);
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleChangeNumber = (e) => {
        setNumber(e.target.value);
    }

    const handleChangeOtp = (e) => {
        setOtp(e.target.value);
    }


    const verifyAccount = () => {
        
        axios({
            method: 'post',
            url: 'http://192.168.1.50:80/aruga/store-accounts',
            body: 'Content-Type: application/json',
            data: {
                name: name,
                email: email,
                password: password,
                number: number,
                otp: otp
            }
        })
        .then((res)=>{
            console.log(res.data.auth);
            if(res.data.auth == true){
                ReactSession.set("email", email);
                console.log(ReactSession.get("email"));
                window.location.href = "http://192.168.1.50:3000/dashboard"
                
            } 
        })
        

    


    }

    

  



    const testData = () => {

        $.post("http://192.168.1.50:80/aruga/verify-account", { number: number} );

        $(".form").hide();
        $(".otp-container").show();
    }

    



    return (
        <div>
            <div className="register-babysitter-container">
                <div className="register-babysitter-logo-container  ">
                    <h1> Register </h1>
                </div>
                <div className="register-babysitter-info-container">
                    <div className="form">                
                        <div className="register-form">
                        <label> Name </label><br/>
                        <input type="text" placeholder="Name" name="name" onChange={handleChangeName}/>
                        </div>

                        <div className="register-form">
                        <label> Email </label><br/>
                        <input type="text" placeholder="Email" name="email" onChange={handleChangeEmail}/>
                        </div>

                        <div className="register-form">
                        <label> Password </label><br/>
                        <input type="password" placeholder="Password" name="password" onChange={handleChangePassword}/>
                        </div>

                        <div className="register-form">
                        <label> Number </label><br/>
                        <input type="text" placeholder="Number" name="number" onChange={handleChangeNumber}/>
                        </div>

                        <button onClick={testData}> Go </button>
                    </div>
                 <div className="otp-container">
                        <input type="text" placeholder="otp" onChange={handleChangeOtp} />
                        <button onClick={verifyAccount}> Verify Account </button>
                </div>   
                    
                </div>
            </div>
        </div>
    )

}

export default RegisterBabySitter;