import React, {  useContext,useEffect } from 'react'
import InstaLogo from '../../images/instaLogo.png'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'
function Header () {
  const history = useHistory();
  const {state,dispatch} = useContext(UserContext);
  const renderList = ()=>{
    if(state){
      return [
        <li><Link to="/"><i className="material-icons">home</i></Link></li>,
        // <li><Link to="#"><i className="material-icons">chat</i></Link></li>,
        // <li><Link to="#"><i className="material-icons">explore</i></Link></li>,
        // <li><Link to="#"><i className="material-icons">favorite_border</i></Link></li>,
        <li><Link to="/create"><i className="material-icons">add_circle</i></Link></li>,
        <li><Link to="/profile"><i className="material-icons">account_circle</i></Link></li>,
        <li onClick={()=>{
          localStorage.clear();
          dispatch({type:'LOGOUT'})
          history.push('/signin')
        }}>
          <i className="material-icons black-text" style={{cursor:"pointer",padding:"0 10px"}}>exit_to_app</i>
        </li>
      ]
    }else{
      return [
        <li><Link to="/signup"><i className="material-icons">how_to_reg</i></Link></li>,
        <li><Link to="/signin"><i className="material-icons">assignment_ind</i></Link></li>
      ]
    }
  }

  const mobile_renderList = ()=>{
    if(state){
      return [
        <li><Link to="/">Home</Link></li>,
        // <li><Link to="#"><i className="material-icons">chat</i></Link></li>,
        // <li><Link to="#"><i className="material-icons">explore</i></Link></li>,
        // <li><Link to="#"><i className="material-icons">favorite_border</i></Link></li>,
        <li><Link to="/create">Create Post</Link></li>,
        <li><Link to="/profile">Profile</Link></li>,
        <li onClick={()=>{
          localStorage.clear();
          dispatch({type:'LOGOUT'})
          history.push('/signin')
        }}>
          <Link>Logout</Link>
        </li>
      ]
    }else{
      return [
        <li><Link to="/signup">Create Account</Link></li>,
        <li><Link to="/signin">Login</Link></li>
      ]
    }
  }


  useEffect(()=>{
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems)
    
  },[])

        return (
          <div>
          <div className="navbar-fixed">
            <nav className="white">
              <div className="nav-wrapper ">
                <div className="container">
                  <Link to={state ? "/" : "/signin"} className="brand-logo"><img src={InstaLogo}/></Link>
                  <a to="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                  <ul id="nav-mobile" className="right hide-on-med-and-down blue-text">
                    {renderList()}
                  </ul>
                </div>
              </div>
            </nav>            
          </div>

          <ul className="sidenav" id="mobile-demo">
            {/* <li><Link to="/">Home</Link></li>
            <li><Link to="/create">Create</Link></li>
            <li><Link to="#">Explore</Link></li>
            <li><Link to="#">Saved</Link></li>
            <li><Link to="/profile">Profile</Link></li> */}
            {mobile_renderList()}
          </ul>
          </div>
        )
    
}

export default Header
