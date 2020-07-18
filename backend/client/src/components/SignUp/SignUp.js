import React, {useState} from 'react'
import { Link,useHistory } from 'react-router-dom'
import axios from 'axios'
import M from 'materialize-css'
import './SignInSignUp.css'

function SignUp() {
    const history = useHistory();
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const submitHandler = (e)=>{

        e.preventDefault();

        const newuser = {
            name,
            email,
            password
        }

        axios.post('/api/signup',newuser)
            .then(res=>{
                console.log(res.data)
                M.toast({html: 'Account created!'})
                history.push('/signin')
            })
            .catch(err=>{
                M.toast({html: err.response.data, classes:'#ef5350 red'})
            })
    }

    return (
        <div className="mycard"> 
                <div className="card auth-card input-field">
                    <h2>Create Account</h2>
                    <form onSubmit={submitHandler}>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            required
                            onChange={e=>setName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            required
                            onChange={e=>setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            required
                            onChange={e=>setPassword(e.target.value)}
                        />
                        
                        <input className="btn btn-login" type="submit" value="Sign Up"/>
                        
                    </form>
                    
                    <h6>Have an account? <Link to="/signin">Log in</Link> </h6>
                </div>
            </div>
    )
}

export default SignUp
