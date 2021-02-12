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
import udisActions from "../../store/udis/actions"

// components
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { TableStats, UdisChart } from "./components"
import { IconLoading } from "../../components/Icons";


let Dashboard = props => {

    const {
        getAll,
        data,
        loading,
        errors
    } = props

    const [startAt, setStartAt] = useState()
    const [endAt, setEndAt] = useState()

    const getUdis = () => {
        getAll({
            start_at: startAt ? moment(startAt).format("YYYY-MM-DD") : null,
            end_at: endAt ? moment(endAt).format("YYYY-MM-DD") : null
        })
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>

                    <Breadcrumbs title="Dashboard" breadcrumbItem="Dashboard" />

                    <Card>
                        <CardBody>
                            <Row className="mt-3">
                                <Col>
                                    <FormGroup>
                                        <Label htmlFor="fecha_inicio">Fecha de inicio <span className="text-danger">*</span></Label>
                                        <InputGroup>
                                            <DatePicker
                                                className="form-control"
                                                selectsStart
                                                locale="es"
                                                dateFormat="d MMMM yyyy"
                                                selected={startAt}
                                                onChange={setStartAt}
                                                endDate={endAt}
                                                maxDate={endAt || new Date()}
                                                showMonthDropdown
                                                showYearDropdown
                                            />
                                        </InputGroup>
                                        {errors && errors.error_type === "ValidationError" && errors.errors.find(error => error.field === 'start_at') && (
                                            <FormText color="danger">
                                                {errors.errors.find(error => error.field === 'start_at').message}
                                            </FormText>
                                        )}
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label htmlFor="fecha_fin">Fecha de fin <span className="text-danger">*</span></Label>
                                        <InputGroup>
                                            <DatePicker
                                                className="form-control"
                                                selectsEnd
                                                locale="es"
                                                dateFormat="d MMMM yyyy"
                                                selected={endAt}
                                                onChange={setEndAt}
                                                startDate={startAt}
                                                minDate={startAt}
                                                maxDate={new Date()}
                                                showMonthDropdown
                                                showYearDropdown
                                            />
                                        </InputGroup>
                                        {errors && errors.error_type === "ValidationError" && errors.errors.find(error => error.field === 'end_at') && (
                                            <FormText color="danger">
                                                {errors.errors.find(error => error.field === 'end_at').message}
                                            </FormText>
                                        )}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button disabled={loading} color="info" block onClick={getUdis}>
                                        {loading ? <IconLoading /> : <i className="fa fa-filter" />} Aplicar
                                    </Button>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>

                    {!_.isEmpty(data) &&
                        <Card>
                            <CardHeader>
                                <i className="fa fa-file-invoice-dollar" /> Estadísticas
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col md={{ offset: 3, size: 6 }}>
                                        <TableStats
                                            udis={_.get(data, "udis")}
                                            usd={_.get(data, "usd")}
                                            loading={loading}
                                        />
                                    </Col>
                                </Row>

                                <hr />

                                <Row>
                                    <Col>
                                        <UdisChart
                                            data={_.get(data, "data")}
                                        />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    }

                </Container>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    const {
        udis: {
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


export default Dashboard = connect(mapStateToProps, {
    getAll: udisActions.getAllRequest
})(Dashboard);
