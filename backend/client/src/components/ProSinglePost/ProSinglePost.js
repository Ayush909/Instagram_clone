import M from 'materialize-css'
import React, { useEffect,useState } from 'react'
import axios from 'axios'
import './ProSinglePost.css'

 function ProSinglePost ({item,deletePost,otherUser}) {
        const {photoURL,title,_id,likes,comments,PostedBy,body} = item;

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
              startingTop: "4%",
              endingTop: "10%"
            };
      
             
            var elems = document.querySelectorAll('.modal');
            var instances = M.Modal.init(elems, options);
            
      
          },[])

          return (
            <div className="pro_single_post ">
            {otherUser ? "" : <i className="material-icons  red-text" onClick={()=>deletePost(_id)}>delete</i>}
                <a class="modal-trigger" href={`#${_id}`}>
                    <img alt={title} src={photoURL}/>
                </a>
                
               
                <div id={_id} class="modal">
                    <div class="modal-content" id="modal-image-content">
                        <img className="modal-image" alt={title} src={photoURL}/>
                        <div className="modal-image-content-right">
                            <p>{PostedBy.name}</p>
                            <p>{body}</p>
                            <section className="no_of_likes_wrapper">
                                <p>{likes.length} likes</p>
                            </section>
                            <section className="comments_wrapper">
                            { comments.length>0 ? comments.map(item=><p><span>{item.postedBy.name}</span> {item.text}</p>) : "" }
                            </section>
                        </div>
                    </div>
                    <div class="modal-footer">
                    <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
                    </div>
                </div>
            </div>
        )
    
}

export default ProSinglePost
