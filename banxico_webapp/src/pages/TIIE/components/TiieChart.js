import React from "react"
import _ from "lodash"
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

require("highcharts/modules/annotations")(Highcharts);


export const TiieChart = props => {

    const {
        data
    } = props

    const series = data.filter(item => item.key !== "SP74626")

    let SF331451_max = 0
    let SP74626_max = 0
    let SF43878_max = 0
    let SF111916_max = 0
    let SF43947_max = 0

    for (let i = 0; i < series.length; i++) {
        const max = _.maxBy(series[i].data, d => d[1])
        const indexOf = _.findIndex(series[i].data, s => s[0] === max[0])

        series[i]["data"][indexOf] = { x: max[0], y: max[1], id: series[i].key }

        switch (series[i].key) {
            case "SF331451":
                SF331451_max = max[1]
                break;
            case "SF43878":
                SF43878_max = max[1]
                break;
            case "SF111916":
                SF111916_max = max[1]
                break;
            case "SF43947":
                SF43947_max = max[1]
                break;

            default:
                break;
        }
    }

    const options = {
        title: {
            text: "Tasas de Interés Interbancarias - (CF111)"
        },
        chart: {
            type: 'line'
        },
        credits: {
            enabled: false
        },
        series: series,
        xAxis: {
            startOnTick: false,
            endOnTick: true,
            ordinal: false,
            type: "datetime",
        },
        tooltip: {
            dateTimeLabelFormats: {
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
        annotations: [
            {
                labels: [
                    {
                        point: "SF331451",
                        text: `${SF331451_max}`,
                        backgroundColor: "#50a5f1",
                        x: -30
                    },
                    {
                        point: "SF43878",
                        text: `${SF43878_max}`,
                    },
                    {
                        point: "SF111916",
                        text: `${SF111916_max}`,
                        backgroundColor: "#34c38f",
                        x: 30
                    },
                    {
                        point: "SF43947",
                        text: `${SF43947_max}`,
                        color: "#fff",
                        backgroundColor: "#f1b44c",
                    },
                ]
            }
        ]
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            constructorType={"chart"}
            options={options}
        />
    )
}
