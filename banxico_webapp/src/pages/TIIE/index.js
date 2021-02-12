import React, { useState, useEffect } from "react"
import { connect } from 'react-redux';
import _ from "lodash"
import {
    Row,
    Col,
    Container,
    Media,
    Card,
    CardTitle,
    CardBody,
    FormGroup,
    Label,
    InputGroup,
    Button,
    FormText,
    CardHeader,
    Table,
} from "reactstrap"
import DatePicker from "react-datepicker"
import moment from 'moment';

// actions
import tiieActions from "../../store/tiie/actions"

// components
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { IconBigLoading } from "../../components/Icons";
import { TiieChart, TableResume } from "./components"


let TIIE = props => {

    const {
        getAll,
        data,
        loading,
        errors
    } = props

    useEffect(() => {
        getAll()
    }, [])

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>

                    <Breadcrumbs title="TIIE" breadcrumbItem="Tasas de Interés Interbancarias" />

                    <Card>
                        <CardHeader>
                            <i className="fa fa-percentage" /> Tasas de Interés Interbancarias - (CF111)
                            </CardHeader>
                        <CardBody>
                            <Row>
                                <Col className="text-center">
                                    {loading ? <IconBigLoading /> : !_.isEmpty(data) && <TableResume data={data} />}
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader>
                            <i className="fa fa-percentage" /> Tasas de Interés Interbancarias - (CF111)
                            </CardHeader>
                        <CardBody>
                            <Row>
                                <Col className="text-center">
                                    {loading ? <IconBigLoading /> : !_.isEmpty(data) && <TiieChart data={data} />}
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>

                </Container>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    const {
        tiie: {
            data,
            loading,
            errors
        }
    } = state

    return {
        data,
        loading,
        errors
    }
}


export default TIIE = connect(mapStateToProps, {
    getAll: tiieActions.getAllRequest
})(TIIE);
