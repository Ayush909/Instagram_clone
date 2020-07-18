import React, { useEffect,useState,useContext } from 'react'
import axios from 'axios'
import {UserContext} from '../../App'
import './ProfilePage.css'
import ProSinglePost from '../ProSinglePost/ProSinglePost'
import AddDpModal from '../Modals/AddDP.modal.js'
 function ProfilePage(){

        const {state,dispatch} = useContext(UserContext)
        const [user,setUser] = useState('');
        const [data,setData] = useState([]);

        useEffect(() => {

            const CancelToken = axios.CancelToken;
            const source = CancelToken.source();

            try{

                axios.get('/api/post/myposts',{
                    headers : {
                        'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
                    },
                    cancelToken: source.token
                })
                .then(result=>{
                     console.log(result.data)
                    setData(result.data.myposts)
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
                    
        }, [])

        useEffect(()=>{

            const CancelToken = axios.CancelToken;
            const source = CancelToken.source();

            try{

                axios.get('/api/user/myprofile',{
                    headers : {
                        'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
                    },
                    cancelToken: source.token
                })
                .then(result=>{
                    // console.log(result.data)
                    setUser(result.data.user)
                    
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
       

        return (
            <div>
            {user ? 
                <main>
                <div className="container profile_wrapper">
                    <header className="profile_header">
                        <div className="profile_header_left">
                            <img className="profile_user_dp" alt="user_dp" src={user.dpURL}/>
                        </div>
                        <section className="profile_header_right">
                            <div className="profile_username">
                            <p className="profile_fullname">{state ? state.name : "loading..."}</p>
                                {/* <p>ay_sh28</p> */}
                                {/* <a href="/accounts/edit">
                                    <button>Edit Profile</button>
                                </a> */}
                                <AddDpModal setUser={setUser}/>
                            </div>
                            <div className="profile_followers_wrapper">
                                <ul className="profile_followers">
                                    <li>{data.length} posts</li>
                                    <li>{user.followers.length} followers</li>
                                    <li>{user.following.length} following</li>
                                </ul>
                            </div>                            
                            <div className="bio_wrapper">
                                {/* <p className="profile_fullname">{state ? state.name : "loading..."}</p> */}
                                <span>
                                    This is my bio
                                </span>
                            </div>
                        </section>
                    </header>
                    <div className="profile_posts">
                        <p className="center">
                            <svg aria-label="Posts" className="_8-yf5 " fill="#262626" height="12" viewBox="0 0 48 48" width="12"><path clip-rule="evenodd" d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z" fill-rule="evenodd"></path></svg>
                            <span>POSTS</span>
                        </p>
                        <div className="pro_posts_wrapper">
                            {data.map(item=>(
                                <ProSinglePost key={item._id} item={item} deletePost={deletePost} />
                            ))}
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
            
            
            

            
            </div>
        )
    
}

export default ProfilePage
