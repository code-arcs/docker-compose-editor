import React from 'react'
import ServiceListItem from './ServiceListItem';

export default class ServiceList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {services: ['a', 'b']};
    }

    render() {
        const services = this.state.services.map((s, idx) => {
            console.log(idx);
            return (
                <ServiceListItem key={idx} service={s}/>
            )
        });
        return (
            <ul className="service-list">
                {services}
            </ul>
        )
    }
}