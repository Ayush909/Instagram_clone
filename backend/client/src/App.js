import React,{createContext,useReducer,useEffect,useContext} from 'react';
import { BrowserRouter as Router, Switch , Route ,useHistory} from "react-router-dom";
import './App.css';
import Navbar from './containers/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import CreatePost from './components/CreatePost/CreatePost';
import UserProfilePage from './components/UserProfilePage/UserProfilePage';
import {userReducer,initialState} from './reducers/user.reducer'

export const UserContext = createContext();

const Routing = ()=>{
  const history = useHistory();
  const {state,dispatch} = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if(user){
      dispatch({
        type : 'USER',
        payload :user
      })
      // history.push('/profile')
    }else{
      history.push('/signin')
    }
  }, [])
  
  return(
    <Switch>
          <Route path="/" exact component={HomePage} /> 
          <Route path="/profile" exact component={ProfilePage} />
          <Route path="/signin" component={SignIn}/>
          <Route path="/signup" component={SignUp}/> 
          <Route path="/create" component={CreatePost}/>
          <Route path="/profile/:userid" component={UserProfilePage}/>
    </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(userReducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <Router>
        <Navbar/>
        <Routing/>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
