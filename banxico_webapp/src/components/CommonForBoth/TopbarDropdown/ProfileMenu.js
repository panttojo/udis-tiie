
import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom';
import { connect } from "react-redux"

// users
import avatar from '../../../assets/images/profile.png';

let ProfileMenu = props => {

    const {
        username
    } = props

    const [showMenu, setShowMenu] = useState(false)


    return (
        <React.Fragment>
            <Dropdown isOpen={showMenu} toggle={() => setShowMenu(!showMenu)} className="d-inline-block" >
                <DropdownToggle className="btn header-item waves-effect" id="page-header-user-dropdown" tag="button">
                    <img className="rounded-circle header-profile-user" src={avatar} alt="Header Avatar" />
                    <span className="d-none d-xl-inline-block ml-2 mr-1">
                        {username}
                    </span>
                    <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                </DropdownToggle>
                <DropdownMenu right>
                    <Link to="/logout" className="dropdown-item">
                        <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger"></i>
                        <span>Logout</span>
                    </Link>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    )
}

const mapStatetoProps = state => {
    const {
        data: {
            username
        }
    } = state.auth;

    return {
        username
    }
}

export default withRouter(connect(mapStatetoProps, {})(ProfileMenu));
