import React, { useState,useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'

function CreatePost() {
        const history = useHistory();
        const [title,setTitle] = useState("");
        const [body,setBody] = useState("");
        const [image,setImage] = useState("");
        const [imageUrl,setImageURL] = useState("");

        useEffect(()=>{
            if(imageUrl){
                axios.post('/api/post/createpost',{
                    title,
                    body,
                    imageURL : imageUrl
                    },{
                        headers : {
                            'authorization' : 'Bearer ' + localStorage.getItem('jwt')
                        }
                    })
                    .then((result)=>{
                        console.log('added in mongodb :'+ result );
                        history.push('/profile')
                    })
                    .catch(err=>{
                        console.log(err);
                    })
            }
        },[imageUrl])

        const postDetails = ()=>{
            const data = new FormData();
            data.append('file',image);
            data.append('upload_preset','insta-clone')
            data.append('cloud_name','ayush-instaclone')
            fetch("https://api.cloudinary.com/v1_1/ayush-instaclone/image/upload",{
                method : "POST",
                body : data
            })
            .then((res)=>res.json())
            .then(data=>{
                 setImageURL(data.url)                    
            })
            .catch(err=>{
                console.log('Error in uploading the image : ' + err)
            })            
            
        }

        return (
            <div className="card input-field"
                style={{
                    margin:"10px auto",
                    padding:"20px",
                    textAlign : "center",
                    maxWidth : "400px",

                }}
            >
                <h2 id="create_post_title">Create a Post</h2>

                <input 
                    type="text" 
                    placeholder="Location"
                    value = {title}
                    required
                    onChange={(e)=>setTitle(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder="Caption"
                    value = {body}
                    required
                    onChange={(e)=>setBody(e.target.value)}    
                />
                    
                <div className="file-field input-field">
                    <div className="btn blue">
                        <span>Select Image</span>
                        <input type="file" required onChange={e=>setImage(e.target.files[0])}/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text"/>
                    </div> 
                </div>
                
                <button className="btn btn-login" onClick={()=>postDetails()}>
                        Upload
                </button>
            </div>
        )
    
}

export default CreatePost
