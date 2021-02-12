import React from "react"

import _ from "lodash"
import {
    Table
} from "reactstrap"
import NumberFormat from 'react-number-format';
import Moment from "react-moment"
import moment from "moment"

// components
import { IconBigLoading } from "../../../components/Icons"
import { DATE_FMT } from "../../../helpers/dates"


export let TableResume = props => {

    const {
        data
    } = props

    const length = data[0]["data"].length
    const dates = data[0]["data"].slice(length - 3, length)

    return (
        <Table striped hover bordered responsive size="sm">
            <thead>
                <tr>
                    <th></th>
                    <th>Por ciento anual</th>
                    <th className="text-center">{moment.utc(dates[0][0]).format(DATE_FMT)}</th>
                    <th className="text-center">{moment.utc(dates[1][0]).format(DATE_FMT)}</th>
                    <th className="text-center">{moment.utc(dates[2][0]).format(DATE_FMT)}</th>
                </tr>
            </thead>
            <tbody>
                {data.map(item => {
                    let day_1 = item.data.find(i => i[0] === dates[0][0]) || ""
                    let day_2 = item.data.find(i => i[0] === dates[1][0]) || ""
                    let day_3 = item.data.find(i => i[0] === dates[2][0]) || ""
                    return (
                        <tr key={item.key}>
                            <td></td>
                            <td>{item.name}</td>
                            <td>{day_1[1]}</td>
                            <td>{day_2[1]}</td>
                            <td>{day_3[1]}</td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}
