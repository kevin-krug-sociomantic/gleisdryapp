import React from 'react';
import _ from 'lodash';
import { Grid, Row, Col, Panel, ButtonGroup, Button } from 'react-bootstrap';
import { getStringHourMinute } from '../utils/timeUtils';
import Chart from 'chart.js';
import { toggleItemInArray } from '../utils';
import { selectedStyle, temperatureBoxStyle, rainBoxStyle } from '../styles';
import PropTypes from 'prop-types';

const HOURS_PER_DATAPOINT = 3;
const DEFAULT_HOUR_RANGE = 72; // hours in 3 days
const DEFAULT_ACTIVE_DATA = [ 'T', 'P' ];
const DEFAULT_MAX_CELSIUS = 30;
const DEFAULT_MAX_FAHRENHEIT = 90; // 32,2 Celsius

class TemperaturePlot extends React.Component
{
    constructor()
    {
        super();
        _.bindAll( this, [ 'updateXAxis', 'toggleData' ] );
        this.state = {
            activeData : DEFAULT_ACTIVE_DATA,
            activeXAxis : DEFAULT_HOUR_RANGE,

        };
    }

    componentWillReceiveProps()
    {
        this.propsChange = true;
    }

    componentDidMount()
    {
       this.renderPlot();
       this.updateXAxis( this.state.activeXAxis );
       this.toggleData( this.state.activeData );
    }

    componentDidUpdate()
    {
        this.propsChange && this.renderPlot();
        this.updateXAxis( this.state.activeXAxis );
        this.toggleData( this.state.activeData );
        this.propsChange = false;
    }

    renderPlot()
    {
        const forecast = this.props.forecast;

        let timeData = _.map( forecast, listItem =>
        {
            return getStringHourMinute( listItem.timestamp );
        } );
        let temperatureData = _.map( forecast, listItem =>
        {
            return listItem.temperature;
        } );
        let precipitationData = _.map( forecast, listItem =>
        {
            return listItem.rain;
        } );

        const minTemperature = Math.min( ...temperatureData, 0 );
        const defaultMaxTemperature = this.props.unit === 'C' ? DEFAULT_MAX_CELSIUS : DEFAULT_MAX_FAHRENHEIT; 
        const maxTemperature = Math.max( ...temperatureData, defaultMaxTemperature );
        const maxPercipitation = Math.max( ...( precipitationData.filter( value => value !== undefined ) ), 7 );

        this.timeData = timeData;
        this.plotData =
        {
            precipitationData,
            temperatureData
        };

        let temperatureCanvas = document.getElementById( "temperature-plot" );

        let chartController = temperatureCanvas && new Chart( temperatureCanvas,
        {
            type : 'bar',
            data :
            {
                labels   : timeData,
                datasets :
                [
                    {
                        yAxisID         : 'P',
                        data            : precipitationData,
                        backgroundColor : 'rgba(51, 122, 183, 1)',
                        borderColor     : 'rgba(51, 122, 183, 1)'
                    },
                    {
                        yAxisID         : 'T',
                        data            : temperatureData,
                        backgroundColor : 'rgba(255, 243, 204, 1)',
                        type            : 'line',
                        borderColor     : 'rgba(255, 204, 0, 1)'
                    }
                ]
            },
            options :
            {
                scales :
                {
                    yAxes :
                    [
                        {
                            id        : 'T',
                            type      : 'linear',
                            position  : 'left',
                            gridLines : { display : false },
                            scaleLabel :
                            {
                                display : false
                            },
                            ticks     :
                            {
                                min : minTemperature,
                                max : maxTemperature
                            }
                        },
                        {
                            id        : 'P',
                            type      : 'linear',
                            position  : 'right',
                            gridLines : { display : false },
                            scaleLabel : { display : false },
                            ticks :
                            {
                                beginAtZero : true,
                                max : maxPercipitation
                            }
                        }
                    ],
                    xAxes:
                    [
                        {
                            categoryPercentage : 1.0,
                            barPercentage : 1.0,
                            ticks :
                            {
                                maxTicksLimit : 12
                            },
                            gridLines : { display : false }
                        }
                    ]
                },
                elements :
                {
                    point :
                    {
                        radius : 0
                    },
                    line :
                    {
                        borderWidth : 1
                    }
                },
                legend : { display: false }
            }
        } );

        this.chartController = chartController;
    }

    updateXAxis( hours )
    {
        this.dataPointLength = hours / HOURS_PER_DATAPOINT;

        if( this.chartController )
        {
            let chartData = this.chartController.chart.config.data;

            chartData.labels = this.timeData.slice( 0, this.dataPointLength );

            for( let dataSet of chartData.datasets )
            {
                const dataKey = this.getDataKey( dataSet.yAxisID );
                dataSet.data  = this.plotData[ dataKey ].slice( 0, this.dataPointLength );
            }

            this.chartController.update();
        }
    }

    toggleData( activeDataIDs )
    {
        if( this.chartController )
        {
            for( let dataID of [ 'T', 'P' ] )
            {
                let dataSetToToggle = this.chartController.chart.config.data.datasets.find( dataSet =>
                {
                    return dataSet.yAxisID === dataID;
                } );
                if( dataSetToToggle )
                {
                    const dataKey = this.getDataKey( dataID );
                    dataSetToToggle.data = activeDataIDs.indexOf( dataID ) === -1 ? [] : this.plotData[ dataKey ].slice( 0, this.dataPointLength );
                }
            }
            this.chartController.update();
        }
    }

    getDataKey( dataID )
    {
        return dataID === 'T' ? 'temperatureData' : 'precipitationData';
    }

    handleDataButtonClick( dataID )
    {
        let activeData = toggleItemInArray( this.state.activeData, dataID );
        this.setState( { activeData : activeData } );
    }

    handleXAxisButtonClick( hours )
    {
        this.setState( { activeXAxis : hours } );
    }

    render()
    {
        if( !this.props.forecast.length ) return null;

        return(
            <Row>
                <Col xs={12} sm={8}>
                    <Panel>
                        <ButtonGroup justified>
                            <Button href="#" style = { ( this.state.activeData.indexOf( 'T' ) !== -1 ) ? selectedStyle : {} } onClick = { () => this.handleDataButtonClick( 'T' ) }>
                                <span style={ temperatureBoxStyle }></span>
                                Temperature [°{ this.props.unit }]
                            </Button>
                            <Button href="#" style = { ( this.state.activeData.indexOf( 'P' ) !== -1 ) ? selectedStyle : {} } onClick = { () => this.handleDataButtonClick( 'P' ) }>
                                <span style={ rainBoxStyle }></span>
                                Rain [mm]
                            </Button>
                        </ButtonGroup>
                        <Row>
                            <Col xs={12} style={{ paddingTop : '15px'}}><canvas id="temperature-plot" width="400" height="300" style={{ pointerEvents : 'none' }}></canvas></Col>
                        </Row>
                        <ButtonGroup justified>
                            <Button href="#" style = { ( this.state.activeXAxis === 24 ) ? selectedStyle : {} } onClick = { () => this.handleXAxisButtonClick( 24 ) }>24h</Button>
                            <Button href="#" style = { ( this.state.activeXAxis === 48 ) ? selectedStyle : {} } onClick = { () => this.handleXAxisButtonClick( 48 ) }>48h</Button>
                            <Button href="#" style = { ( this.state.activeXAxis === 72 ) ? selectedStyle : {} } onClick = { () => this.handleXAxisButtonClick( 72 ) }>3 days</Button>
                        </ButtonGroup>
                    </Panel>
                </Col>
            </Row>
        );
    }
}

TemperaturePlot.propTypes =
{
    forecast : PropTypes.array,
    unit     : PropTypes.string
}

export default TemperaturePlot;
