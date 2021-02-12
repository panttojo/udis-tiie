import React from "react"

import _ from "lodash"
import {
    Table
} from "reactstrap"
import NumberFormat from 'react-number-format';

// components
import { IconBigLoading } from "../../../components/Icons"


export let TableStats = props => {

    const {
        loading,
        usd,
        udis
    } = props

    return (
        <Table striped hover bordered responsive size="sm">
            <thead>
                <tr>
                    <th></th>
                    <th className="text-center">Mínimo</th>
                    <th className="text-center">Promedio</th>
                    <th className="text-center">Máximo</th>
                </tr>
            </thead>
            <tbody>
                {loading ? <tr><td colSpan="4"><IconBigLoading /></td></tr> :
                    !_.isEmpty(udis) &&
                    <React.Fragment>
                        <tr>
                            <td className="text-center"><span className="badge badge-info">UDIS</span></td>
                            <td className="text-right">
                                <NumberFormat
                                    value={udis.min}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                    decimalScale="4"
                                />
                            </td>
                            <td className="text-right">
                                <NumberFormat
                                    value={udis.avg}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                    decimalScale="4"
                                />
                            </td>
                            <td className="text-right">
                                <NumberFormat
                                    value={udis.max}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                    decimalScale="4"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="text-center"><span className="badge badge-success">USD</span></td>
                            <td className="text-right">
                                <NumberFormat
                                    value={usd.min}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                    decimalScale="4"
                                />
                            </td>
                            <td className="text-right">
                                <NumberFormat
                                    value={usd.avg}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                    decimalScale="4"
                                />
                            </td>
                            <td className="text-right">
                                <NumberFormat
                                    value={usd.max}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                    decimalScale="4"
                                />
                            </td>
                        </tr>
                    </React.Fragment>
                }
            </tbody>
        </Table>
    )
}
