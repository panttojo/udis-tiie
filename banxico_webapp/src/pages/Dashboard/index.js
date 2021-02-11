import React from "react"
import {
    Row,
    Container,
} from "reactstrap"

import Breadcrumbs from "../../components/Common/Breadcrumb"


let Dashboard = props => {

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>

                    <Breadcrumbs title="Dashboard" breadcrumbItem="Dashboard" />

                    <Row></Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Dashboard;
