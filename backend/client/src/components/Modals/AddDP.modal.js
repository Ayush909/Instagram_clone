import M from 'materialize-css'
import React, { useEffect,useState } from 'react'
import axios from 'axios'

 function AddDpModal({setUser}){

    const [displayImg, setDisplayImg] = useState("");
    const [dpURL,setDpURL] = useState("");
    const [uploading,setUploading] = useState(false);

    useEffect(()=>{
      const options = {
        onOpenStart: () => {
          console.log("Open Start");
        },
        onOpenEnd: () => {
          console.log("Open End");
        },
        onCloseStart: () => {
          console.log("Close Start");
        },
        onCloseEnd: () => {
          console.log("Close End");
        },
        inDuration: 250,
        outDuration: 250,
        opacity: 0.5,
        dismissible: false,
        startingTop: "4%",
        endingTop: "10%"
      };

       
      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems, options);
      

    },[])

    
    useEffect(()=>{
      if(dpURL){
        const elem = document.getElementById('modal1')
        const instance = M.Modal.init(elem)
          axios.put('http://localhost:5000/api/user/dpupload',{

              dpURL : dpURL
              },{
                  headers : {
                      'authorization' : 'Bearer ' + localStorage.getItem('jwt')
                  }
              })
              .then((result)=>{
                  setUploading(false);
                  console.log(result );
                  setUser(result.data.updatedUser)
                  instance.close();
              })
              .catch(err=>{
                  console.log(err);
              })
      }
    },[dpURL])

    

      const uploadPicture = ()=>{
          setUploading(true);
          const data = new FormData();
          data.append('file',displayImg);
          data.append('upload_preset','insta-clone')
          data.append('cloud_name','ayush-instaclone')
          fetch("https://api.cloudinary.com/v1_1/ayush-instaclone/image/upload",{
              method : "POST",
              body : data
          })
          .then((res)=>res.json())
          .then(data=>{
              console.log(data)
              setDpURL(data.url)                    
          })
          .catch(err=>{
              console.log('Error in uploading the image : ' + err)
          })            
      }

      
        return (
            <div>
                <a className="modal-trigger"  data-target="modal1">
                  <button style={{cursor:"pointer"}} id="dp_button">Edit Profile</button> 
                </a>
                
                <div id="modal1" className="modal">
                                
                    <div className="modal-content" >
                      <div id="modal-dp-content"> 
                        <h5>Change profile image</h5>

                        {uploading ? 
                          <div className="preloader-wrapper small active">
                          <div className="spinner-layer spinner-green-only">
                            <div className="circle-clipper left">
                              <div className="circle"></div>
                            </div><div className="gap-patch">
                              <div className="circle"></div>
                            </div><div className="circle-clipper right">
                              <div className="circle"></div>
                            </div>
                          </div>
                        </div>
                        :
                        " "
                        }
                        

                      </div>

                      <div className="file-field input-field">
                          <div className="btn">
                              <span>Select Image</span>
                              <input type="file" onChange={(e)=>setDisplayImg(e.target.files[0])}/>
                          </div>
                          <div className="file-path-wrapper">
                              <input className="file-path validate" type="text"/>
                          </div> 
                      </div>
                        <button className="btn btn-login" onClick={()=>uploadPicture()}>
                          Upload
                        </button>
                    </div>

                    {!uploading ? 
                      <div class="modal-footer">
                        <a className="modal-close waves-effect waves-red btn-flat">
                        Close
                        </a>                         
                      </div>
                    :
                    " "
                    }
                    
        
                </div>
            </div>
        )
    
}

export default AddDpModal


