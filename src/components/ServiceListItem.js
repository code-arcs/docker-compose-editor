import React from 'react'
import {Link} from 'react-router';

export default class ServiceListItem extends React.Component {
    render() {
        return (
            <li className="service-list-item">
                <Link to={"/service/" + this.props.service}>{this.props.service}</Link>
            </li>
        )
    }
}