import React, { Component } from 'react'
import Main from '../../containers/Main/Main'
import RightSidebar from '../../containers/RightSidebar/RightSidebar'
import './HomePage.css'

export class HomePage extends Component {
    render() {
        return (
            <main>
                <section className="container homepage-section">
                    <Main/>
                    <RightSidebar/>
                </section>
            </main>
        )
    }
}

export default HomePage
