import React, { Component } from 'react'
import user_dp from '../../../images/user_dp.jpg'
import './Story.css'

export class Story extends Component {
    render() {
        return (
            <div>
               <button className="story-button">
                   <div className="user_dp">
                       <img src={user_dp}/>
                   </div>
                   <div></div>
               </button>
            </div>
        )
    }
}

export default Story
