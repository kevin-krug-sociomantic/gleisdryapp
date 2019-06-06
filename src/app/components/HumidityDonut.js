import React from 'react';
import Chart from 'chart.js';
import { EMOJIS } from '../constants';
import PropTypes from 'prop-types';

class HumidityDonut extends React.Component
{
    componentDidMount()
    {
       this.renderDonut();
    }

    shouldComponentUpdate( nextProps )
    {
        return this.props.humidity !== nextProps.humidity;
    }

    componentDidUpdate()
    {
        // if( this.myDoughnutChart )
        // {
        //     this.myDoughnutChart.data.datasets[0].data =
        //         [ this.props.humidity, 100 - this.props.humidity ];
        // }
        this.renderDonut();
    }

    renderDonut()
    {
        var humidity = this.props.humidity || 0;
        var humidityCanvas  = document.getElementById( "humidity-donut" );
        var myDoughnutChart = new Chart( humidityCanvas,
        {
            type : 'doughnut',
            data :
            {
                labels: [ 'Humidity', '' ],
                datasets :
                [
                    {
                        data            :
                        [
                            humidity,
                            100 - humidity
                        ],
                        backgroundColor :
                        [
                            '#337ab7',
                            '#FFFFFF'
                        ]
                    }
                ]
            },
            options :
            {
                legend :
                {
                    display : false
                },
                tooltips :
                {
                    enabled : false
                },
                cutoutPercentage : 65

            }
        } );
    }

    render()
    {
        const canvasStyle =
        {
            maxWidth : 125 + 'px',
            pointerEvents : 'none'
        };
        const canvasWrapperStyle =
        {
            position : 'relative',
            display : 'flex',
            alignItems : 'center',
            justifyContent : 'center'
        };
        const humidityValueStyle =
        {
            margin : '0',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        };

        const dropEmoji = EMOJIS['DROP'];
        const humidityPercent = `${ this.props.humidity }%`;

        return(
            <div style={ canvasWrapperStyle }>
                <canvas id="humidity-donut" width="25" height="25"  style={canvasStyle}></canvas>
                <h4 style={ humidityValueStyle }>{ dropEmoji }{ humidityPercent }</h4>
            </div>
        );
    }
}

HumidityDonut.propTypes =
{
    humidity : PropTypes.number
}

export default HumidityDonut;

