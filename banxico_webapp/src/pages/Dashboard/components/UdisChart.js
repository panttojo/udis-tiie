import React from "react"
import _ from "lodash"
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


export const UdisChart = props => {

    const {
        data
    } = props

    const usd_prices = []
    const udis_mxn_price = []
    const udis_usd_price = []

    data.forEach(item => {
        usd_prices.push([item.timestamp, item.usd_price])
        udis_mxn_price.push([item.timestamp, item.udis_mxn_price])
        udis_usd_price.push([item.timestamp, item.udis_usd_price])
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
            { name: "Dólar", data: usd_prices },
            { name: "UDIS", data: udis_mxn_price },
            { name: "UDIS en Dólar", data: udis_usd_price }
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
