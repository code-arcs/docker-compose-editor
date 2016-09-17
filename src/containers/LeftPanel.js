import React from 'react';
import ServiceList from '../components/ServiceList';

export default class LeftPanel extends React.Component {
    render() {
        return (
            <div className="left-pane">
                <ServiceList/>
            </div>
        )
    }
}