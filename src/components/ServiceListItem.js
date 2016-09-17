import React from 'react'

export default class ServiceListItem extends React.Component {
    render() {
        return (
            <li className="service-list-item">
                <a href="#">{this.props.service}</a>
            </li>
        )
    }
}