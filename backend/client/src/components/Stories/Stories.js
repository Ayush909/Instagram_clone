import React, { Component } from 'react'
import Story from './Story/Story'
import './Stories.css'

export class Stories extends Component {
    render() {
        return (
            <div className="stories-wrapper">
                <Story/>
                <Story/>
                <Story/>
                <Story/>
                <Story/>
                <Story/>
                <Story/>
                <Story/>
                <Story/>
                <Story/>
            </div>
        )
    }
}

export default Stories
