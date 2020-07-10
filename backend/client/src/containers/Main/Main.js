import React, { useContext } from 'react'
import './Main.css'
import Stories from '../../components/Stories/Stories'
import Contents from '../Contents/Contents'
import {UserContext} from '../../App'
function Main () {
    const {state,dispatch} = useContext(UserContext)

        return (
            
            
            <div className="main-wrapper">
                { state ?
                    state.following.length > 0 ?
                        <div>
                            <Stories/>
                            <Contents/>
                        </div>
                        : 
                        <h4>Follow someone to see their posts</h4>
                    :
                    <div class="preloader-wrapper small active" id="spinner_loader">
                        <div class="spinner-layer spinner-green-only">
                        <div class="circle-clipper left">
                            <div class="circle"></div>
                        </div><div class="gap-patch">
                            <div class="circle"></div>
                        </div><div class="circle-clipper right">
                            <div class="circle"></div>
                        </div>
                        </div>
                    </div>    
                }
                
            </div>
        )
    
}

export default Main
