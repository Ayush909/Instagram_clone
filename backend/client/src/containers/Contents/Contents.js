import React, {useState,useEffect } from 'react'
import PostCard from '../../components/PostCard/PostCard'
import axios from 'axios'

function Contents () {
    const [data,setData] = useState([]);

    

    useEffect(()=>{

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        try{

            axios.get('/api/post/myfollowingposts',{
                headers : {
                    'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
                },
                cancelToken: source.token
            })
            .then(result=>{
                // console.log(result)
                setData(result.data.posts)
            })
            .catch(err=>{
                console.log(err)
            })

        }catch (error) {
            if (axios.isCancel(error)) {
            console.log("cancelled");
            } else {
            throw error;
            }
        }

        return ()=>{
            source.cancel();
        }        
            
    },[])

       
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
