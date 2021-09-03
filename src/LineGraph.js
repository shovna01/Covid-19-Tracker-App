import React, {useState, useEffect} from "react";
import {Line} from "react-chartjs-2";
import numeral from "numeral";
import "./LineGraph.css";

const options = {
    legend: {
        display : false,
    },
    elements : {
        point : {
            readius : 0,
            pointStyle : "false",
        },
    },
    maintainAspectRatio : false,
    tooltips : {
        mode : "index",
        intersect : false,
        callbacks : {
            label : function(tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales : {
        xAxes : [
            {
                type : "time",
                time : {
                    format : "MM/DD/YY",
                    tooltipFormat : "ll",
                },
            },
        ],
        yAxes : [
            {
                gridLines : {
                    display : false,
                },
                ticks : {
                    callback : function(value, index, values){
                        return numeral(value).format("0a");
                    },
                    beginAtZero: true,
                    // steps: 10,
                    // stepValue: 500,
                    min: 0,
                    max: 10000,
                },
            },
        ],
    },
};

    // https://disease.sh/v3/covid-19/historical/all?lastdays=120

    const buildChartData = (data, casesType) => {
            let chartData = [];
            let lastDataPoint;

            for(let date in data.cases) {
                if(lastDataPoint){
                    const newDatapoint = {
                        x : date,
                        y : data[casesType][date] - lastDataPoint,
                    };
                    chartData.push(newDatapoint);
                }
                lastDataPoint = data[casesType][date];
            }
            return chartData;
        };


function LineGraph({casesType, ...props}) {
    const [data, setData] = useState({});
        
    // https://disease.sh/v3/covid-19/historical/all?lastdays=120  


    useEffect(() => {
        const fetchData = async() => {
        await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then (response => response.json())
        .then(data => {
            // console.log(data);
            let chartData = buildChartData(data, casesType);
            setData(chartData);
        });
    };

    fetchData();
 }, [casesType]);

    

    return (
        <div className = {props.className}>
            {/* <h3>I am a Graph</h3> */}
            {data?.length > 0 && (
            <Line
                canvas height = "250%"
                data = {{
                    datasets : [
                        {
                            backgroundColor : "rgba(204, 16, 52, 0.5)",
                            fill : "origin",
                            borderColor : "#CC1034",
                            label : casesType,
                            height : "150px",
                            data : data
                        },
                    ] ,
                }}
                options = {options}
            />
            )}
        </div>
    );
}

export default LineGraph;



