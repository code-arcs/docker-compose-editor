import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";

class LeftPanel extends React.Component {
    render() {
        return (
            <div className="left-panel">
                <div className="left-nav-panel">
                    <ul>
                        <li>
                            <Link to={"/env"} activeClassName="active">
                                <svg className="icon icon-nav">
                                    <use xlinkHref="#globe"/>
                                </svg>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/services"} activeClassName="active">
                                <svg className="icon icon-nav">
                                    <use xlinkHref="#services"/>
                                </svg>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default connect()(LeftPanel)