import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";


function Login(){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const navigate = useNavigate();


    const handleLogin = async(e)=>{

        e.preventDefault();

        try{

            const res = await API.post("/auth/login",{
                email,
                password
            });


            localStorage.setItem(
                "token",
                res.data.token
            );


            navigate("/dashboard");


        }catch(error){

            console.log(error);

            alert("Login failed");

        }

    };


    return(
        <div>

            <h1>FraudShield Login</h1>


            <form onSubmit={handleLogin}>

                <input
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />


                <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />


                <button>
                    Login
                </button>


            </form>

        </div>
    )
}


export default Login;