import React, {useEffect,useState,useContext} from 'react'
import axios from 'axios'
import {UserContext} from '../../App'
import './RightSidebar.css'
import UserSuggest from './UserSuggest'

function RightSidebar() {
        const {state,dispatch} = useContext(UserContext)
        const [data,setData] = useState([]);
        const [user,setUser] = useState('');
        
        useEffect(()=>{

            axios.get('http://localhost:5000/api/user/mysuggestions',{
                headers : {
                    'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
                }
            })
            .then(result=>{
                console.log(result.data)
                setData(result.data.accounts)
            })
            .catch(err=>{
                console.log(err)
            })

        },[])

        useEffect(()=>{
            axios.get('http://localhost:5000/api/user/myprofile',{
                headers : {
                    'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
                }
            })
            .then(result=>{
                console.log(result.data)
                setUser(result.data.user)
                
            })
            .catch(err=>{
                console.log(err)
            })
        },[])
   
        return (
            <div className="right-sidebar ">
                <div className="user_info_side_wrapper">
                    <img className="user_dp_side" src={user.dpURL}/>
                    <div className="user_info">
                        <div className="user_fullname">{state ? state.name : "loading..."}</div>
                        <div className="user_bio">Bio</div>
                    </div>
                </div>
                <div className="user_suggestions">
                    <p >Suggestions For You</p>
                    <div>

                        {data.map(account=>(
                            <UserSuggest account={account}/>
                        ))}
                        
                    </div>
                </div>
                <div className="sidebar_footer">
                    <p>© 2020 Instagram from Ayush</p>
                </div>
            </div>
        )
    
}

export default RightSidebar
