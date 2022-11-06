import React,{useState} from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  
    const [credentials, setcredentials] = useState({email:"",password:""})
    let navigate = useNavigate();
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch("http://localhost:5500/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if(json.success===true)
        {
            //Save the auth token and Redirect to Home Page
            localStorage.setItem('token',json.authData);
            navigate('/');
        }
        else
        {
            alert("Invalid Login");
        } 
    }

    const handleChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
      };
  
    return (
        <div>
        <form  onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" value={credentials.email} onChange={handleChange} id="email" name="email" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} onChange={handleChange} name="password" id="password" />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  );
};

export default Login;
