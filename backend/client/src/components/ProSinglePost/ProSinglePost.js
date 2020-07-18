import M from 'materialize-css'
import React, { useEffect } from 'react'
import './ProSinglePost.css'

 function ProSinglePost ({item,deletePost,otherUser}) {
        const {photoURL,title,_id,likes,comments,PostedBy,body} = item;

        useEffect(()=>{
            // const options = {
            //   onOpenStart: () => {
            //     console.log("Open Start");
            //   },
            //   onOpenEnd: () => {
            //     console.log("Open End");
            //   },
            //   onCloseStart: () => {
            //     console.log("Close Start");
            //   },
            //   onCloseEnd: () => {
            //     console.log("Close End");
            //   },
            //   inDuration: 250,
            //   outDuration: 250,
            //   opacity: 0.5,
            //   startingTop: "4%",
            //   endingTop: "10%"
            // };
      
             
            var elems = document.querySelectorAll('.modal');
            // var instances = M.Modal.init(elems, options);
            var instances = M.Modal.init(elems);
            
      
          },[])

          return (
            <div className="pro_single_post ">
            {otherUser ? "" : <i className="material-icons  red-text" onClick={()=>deletePost(_id)}>delete</i>}
                <a className="modal-trigger" href={`#${_id}`}>
                    <img alt={title} src={photoURL}/>
                </a>
                
               
                <div id={_id} className="modal">
                    <div className="modal-content" id="modal-image-content">

                        <img className="modal-image" alt={title} src={photoURL}/>

                        <div className="modal-image-content-right">

                            <div className="xyz1">
                                <img alt="userdp" className="user_dp_side" src={PostedBy.dpURL}/>
                                <p>{PostedBy.name}</p>
                            </div>

                            <div>
                                <p><span style={{fontWeight:"bold"}}>Caption </span>{body}</p>
                                                               
                                <section className="xyz4">
                                { comments.length>0 ? comments.map(item=><p><span>{item.postedBy.name}</span> {item.text}</p>) : "" }
                                </section>
                            </div>
                            
                            <section className="xyz5">
                                <p>{likes.length} likes</p>
                            </section>
                            
                        </div>
                    </div>
                    {/* <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat">Close</a>
                    </div> */}
                </div>
            </div>
        )
    
}

export default ProSinglePost
