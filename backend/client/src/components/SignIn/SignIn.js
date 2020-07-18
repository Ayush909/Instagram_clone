import React, { useState,useContext } from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import axios from 'axios'
import M from 'materialize-css'
import '../SignUp/SignInSignUp.css'
function SignIn() {

    const {state,dispatch} = useContext(UserContext)

    const history = useHistory();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const submitHandler = (e)=>{

        e.preventDefault();
        
        const user = {
            email,
            password
        }

        axios.post('/api/signin',user)
            .then(res=>{
                console.log(res.data)
                localStorage.setItem('jwt',res.data.token)
                localStorage.setItem('user',JSON.stringify(res.data.user))
                dispatch({
                    type : 'USER',
                    payload : res.data.user
                })
                M.toast({html: 'Signed In'})
                history.push('/profile');
            })
            .catch(err=>{
                M.toast({html: err.response.data, classes:'#ef5350 red'})
            })
    }

    
        return (
            <div className="mycard"> 
                <div className="card auth-card input-field">
                    <h2>Instagram</h2>
                    <form onSubmit={submitHandler} >
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
                        <input className="btn btn-login" type="submit" value="Log In"/>
                    </form>
                    <h6>Don't have an account? <Link to="/signup">Sign up</Link> </h6>
                </div>
            </div>
        )
    
}

export default SignIn
