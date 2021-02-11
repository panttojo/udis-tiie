import React from 'react'

import {
    Row, Col
} from 'reactstrap'


export const IconLoading = props => {
    const { size } = props
    return <i className={`fa fa-spinner fa-spin fa-${size ? size : 'lg'}`} />
}

export const IconBigLoading = props => (
    <Row>
        <Col className="text-center">
            <div className="spinner-border text-info m-1" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </Col>
    </Row>
)
