import React, {useState} from 'react';
import { Link } from 'react-router-dom';


const Login = () => {

    const [email,setEmail] = useState();
    const [password, setPassword] = useState();

  return <div>
    <h3>Country App Login</h3>
    <h4>New Here? Please <Link to ={'/register'}>Sign Up!</Link></h4>

  </div>;
};

export default Login;
