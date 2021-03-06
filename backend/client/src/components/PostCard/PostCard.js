import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './PostCard.css'
 function PostCard ({item}) {
        const {state,dispatch} = useContext(UserContext);
        const {PostedBy,body,photoURL,title,_id,likes,comments} = item
        
        const [noOfLike, setNoOfLike] = useState([]);
        const [commentsArr, setCommentsArr] = useState([]);

        useEffect(()=>{
            setNoOfLike(likes)
            setCommentsArr(comments)
        },[])

        //function to handle like and unlike //=> axios.put(url,body,headers)
        const likePost = (postID)=>{
            axios.put('/api/post/like',
            {
                postID : postID
            },{
                headers : {
                    'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
                }
            }
            )
            .then(res=>{
                // console.log(res.data)
                setNoOfLike(res.data.likes)
            })
            .catch(err=>{
                console.log(err)
            })
        }

        //function to make comments on a post //=> axios.put(url,body,headers)
        const makeComment = (text,postID)=>{

            axios.put('/api/post/comment',{
                text,
                postID
            },{
                headers : {
                    'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
                }
            }
            )
            .then(res=>{
                // console.log(res.data)
                setCommentsArr(res.data.comments)
                let commentform = document.getElementById('comment_box')
                commentform.reset();
            })
            .catch(err=>{
                console.error(err)
            })
        }

        
        
        return (
           
            <article key={_id} className="homepage_article">
                <header className="postcard_user">
                    <div><img alt="userpost" src={PostedBy.dpURL}/></div>
                    <div style={{display:"flex",flexDirection:"column"}}>
                        <div id="postcard_name"><Link to={ PostedBy._id != state._id ? "/profile/"+PostedBy._id : "/profile"}>{PostedBy.name}</Link></div>
                        <div>{title}</div>
                    </div>
                </header>
                <div className="postcard_img">
                    <img alt="picture_posted" src={photoURL}/>
                    <p>{body}</p>
                </div>
                <div className="postcard_footer">
                    <section className="post_interaction_wrapper">
                        <button onClick={()=>{likePost(_id)}}><svg aria-label="Like" fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg></button>
                        <button ><svg aria-label="Comment" fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path clip-rule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fill-rule="evenodd"></path></svg></button>
                        <button><svg aria-label="Share Post" fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path></svg></button>
                    </section>
                    <section className="no_of_likes_wrapper">
                        <p>{noOfLike.length } likes</p>
                    </section>
                    <section className="comments_wrapper">
                        { commentsArr.length ? commentsArr.map(item=><p><span>{item.postedBy.name}</span> {item.text}</p>) : "" }
                    </section>
                    <section>
                        <div className="postcard_comment_wrapper">
                            <form id="comment_box" className="comment_box" onSubmit={(e)=>{
                                e.preventDefault();
                                makeComment(e.target[0].value,_id)
                            }}>
                                <input className="comment_input" type="text" placeholder="Add a comment..."/> 
                                <button  type="submit">Post</button>
                            </form>
                        </div>
                    </section>
                </div>
            </article>
        )
    
}

export default PostCard
