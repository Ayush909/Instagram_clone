import React from 'react'
import {Link} from 'react-router-dom'

function UserSuggest ({account}) {
        const {name,_id,dpURL} = account
        return (
            <div className="suggest_user">
                <img src={dpURL}/>
                <div className="suggest_user_username"><Link to={`/profile/${_id}`}>{name}</Link></div>
            </div>
        )
    
}

export default UserSuggest
