import React from "react"
import _ from "lodash"
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


export const UdisChart = props => {

    const {
        data
    } = props

    const usd_values = []
    const udis_value = []
    const udis_usd_value = []

    data.forEach(item => {
        usd_values.push([item.timestamp, item.usd])
        udis_value.push([item.timestamp, item.udis])
        udis_usd_value.push([item.timestamp, item.udis_usd])
    });

    const options = {
        title: {
            text: "Valor de la UDIS y el dólar"
        },
        chart: {
            type: 'line'
        },
        credits: {
            enabled: false
        },
        series: [
            { name: "Dólar", data: usd_values },
            { name: "UDIS", data: udis_value },
            { name: "UDIS en Dólar", data: udis_usd_value }
        ],
        xAxis: {
            startOnTick: false,
            endOnTick: true,
            ordinal: false,
            type: "datetime",
        },
        tooltip: {
            dateTimeLabelFormats :{
                day: "%e %b %Y"
            },
            shared: true,
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: false
                },
                enableMouseTracking: true
            }
        },

    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    )
}
