import React, {useState,useEffect } from 'react'
import PostCard from '../../components/PostCard/PostCard'
import axios from 'axios'

function Contents () {
    const [data,setData] = useState([]);
    useEffect(()=>[
        axios.get('http://localhost:5000/api/post/myfollowingposts',{
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
            }
        })
        .then(result=>{
            console.log(result)
            setData(result.data.posts)
        })
        .catch(err=>{
            console.log(err)
        })
            
    ],[])

       
        return (
            <div>
                {  data.map(item=>(
                   <PostCard item={item}  /> 
                ))
            }
            </div>
            
        )
    
}

export default Contents
