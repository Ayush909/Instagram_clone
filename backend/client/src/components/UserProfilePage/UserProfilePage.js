import React, { useEffect,useState,useContext } from 'react'
import {useParams } from 'react-router-dom'
import axios from 'axios'
import {UserContext} from '../../App'
import ProSinglePost from '../ProSinglePost/ProSinglePost'
 function ProfilePage(){

        const [followers,setFollowers] = useState([])
        const [following,setFollowing] = useState([])
        const {state,dispatch} = useContext(UserContext)
        const [data,setData] = useState(null);
        const {userid} = useParams();


        useEffect(() => {
            axios.get(`/api/user/userProfile/${userid}`,{
                headers : {
                    'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
                }
            })
            .then(result=>{
                // console.log(result.data)
                setData(result.data)
                setFollowers(result.data.userFound.followers)
                setFollowing(result.data.userFound.following)
            })
            .catch(err=>{
                console.log(err)
            })
                    
        }, [])

        const deletePost = (postID)=>{
            axios.delete(`/api/post/deletepost/${postID}`,{
                headers : {
                    'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
                }
            })
            .then(res=>{
                console.log(res.data)
                const newdata = data.filter(item=>{
                    return item._id != res.data.result._id 
                })
                setData(newdata)
            })
            .catch(err=>{
                console.error(err)
            })
        }

        const followUser = (followID)=>{
            axios.put('/api/user/follow',{
                followID
            },{
                headers : {
                    'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
                }
            })
            .then(res=>{
                // console.log(res.data.result)
                dispatch({type: "UPDATE" , payload : {followers : res.data.result.followers, following : res.data.result.following}} )
                localStorage.setItem('user', JSON.stringify(res.data.result))
                
                setFollowers(prevstate=>{
                    return [...prevstate,res.data.result._id]
                })
            })
            .catch(err=>{
                console.error(err)
            })
        }
        const unfollowUser = (followID)=>{
            axios.put('/api/user/unfollow',{
                followID
            },{
                headers : {
                    'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
                }
            })
            .then(res=>{
                // console.log(res.data.result)
                dispatch({type: "UPDATE" , payload : {followers : res.data.result.followers, following : res.data.result.following}} )
                localStorage.setItem('user', JSON.stringify(res.data.result))
    
                setFollowers(followers.filter(item=>{
                    return item != res.data.result._id;
                }))
            })
            .catch(err=>{
                console.error(err)
            })
        }
        
        
        return (
            <>
            {data ? 

                <main>
                <div className="container profile_wrapper">
                    <header className="profile_header">
                        <div className="profile_header_left">
                            <img alt="userdp" className="profile_user_dp" src={data.userFound.dpURL}/>
                        </div>
                        <section className="profile_header_right">
                            <div className="profile_username">
                                <p className="profile_fullname">{data.userFound.name}</p>
                                
                            </div>
                            <div className="profile_followers_wrapper">
                                <ul className="profile_followers">
                                    <li>{data.PostsFound.length} posts</li>
                                    <li>{followers.length } followers</li>
                                    <li>{following.length} following</li>
                                </ul>
                            </div>
                            <div className="bio_wrapper">
                                
                                <span>
                                    This is my bio
                                </span>
                            </div>
                            <div  style={{display:"flex",justifyContent:"center",marginTop:"10px"}}>
                                {followers.includes(state._id)  ? <div className="btn blue" onClick={()=>unfollowUser(userid)}>UnFollow</div>
                                 :
                                 <div className="btn blue" onClick={()=>followUser(userid)}>Follow</div>
                                }
                            </div>
                        </section>
                    </header>
                    <div className="profile_posts">
                        <p className="center">
                            <svg aria-label="Posts" className="_8-yf5 " fill="#262626" height="12" viewBox="0 0 48 48" width="12"><path clip-rule="evenodd" d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z" fill-rule="evenodd"></path></svg>
                            <span>POSTS</span>
                        </p>
                        <div className="pro_posts_wrapper">
                            {data.PostsFound.length>0 
                            ?
                            data.PostsFound.map(item=>(
                                <ProSinglePost key={item._id} item={item} deletePost={deletePost} otherUser={true} />
                            ))
                            :
                            <h4>No Posts</h4>
                            }
                            
                        </div>
                    </div>
                </div>
                </main>
            
            : 

            <div className="preloader-wrapper small active" id="spinner_loader">
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
            
            }
            
            </>
        )
    
}

export default ProfilePage
