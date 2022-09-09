import axios from "axios";
import { useState } from "react"
import {ReactSession} from 'react-client-session'

const Signin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const storeEmail = (e) => {
        setEmail(e.target.value);
    }

    const storePassword = (e) => {
        setPassword(e.target.value);
    }

    const submitLogin = () => {
        console.log(email + " " + password);
        axios({
            method: "post",
            url: "http://192.168.1.50:80/aruga/verify-login",
            body: "Content-Type: application/json",
            data: {
                email: email,
                password: password
            }
        })
        .then((res)=>{
            if(res.data.auth == true)
            window.location.href="http://192.168.1.50:3000/dashboard";
            ReactSession.set("email", email);
        })
    }

    return(
            <div>
                <input type="text" name="email" onChange={storeEmail}/>
                <input type="password" name="password" onChange={storePassword}/>
                <button onClick={submitLogin}>Submit</button>
            </div>
            
     
    )

}

export default Signin;