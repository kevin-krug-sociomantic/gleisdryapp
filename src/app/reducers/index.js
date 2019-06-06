import { combineReducers } from 'redux';
import { SPOTS } from '../constants';
import {
    SET_SPOT,
    SET_TEMPERATURE_UNIT,
    SET_UI_DISPLAYED_TIME,
    REQUEST_CURRENT_WEATHER,
    RECEIVE_CURRENT_WEATHER,
    REQUEST_WEATHER_FORECAST,
    RECEIVE_WEATHER_FORECAST,
    UPLOAD_IMAGE,
    UPLOAD_IMAGE_FAILURE,
    FETCH_WEATHER_FAILURE,
    FETCH_IMAGES_FAILURE,
    REQUEST_IMAGES,
    RECEIVE_IMAGES,
    SHOW_ALERT,
    REMOVE_ALERT
} from '../actions';
import { parseTimestampToLocalTime } from '../utils';
import _ from 'lodash';
import { getStringHourMinute } from '../utils/timeUtils';

// state shape
//
// {
//     spot          : SPOTS.GLEIS,
//     uiState       :
//     {
//         displayedTime : 0,
//         displayedUnit : C,
//     },
//     weatherBySpot :
//     {
//         GLEIS :
//         {
//             isFetching     : false,
//             currentWeather :
//             {
//                 temperature : 0,
//                 humidity    : 0,
//                 description : '',
//                 iconID      : '',
//                 sunrise     : 0,
//                 sunset      : 0,
//                 timestamp   : 0
//             },
//             forecast : []

//         },
//         DOG_SHIT :
//         {
//             isFetching     : false,
//             currentWeather :
//             {
//                 temperature : 0,
//                 humidity    : 0,
//                 description : '',
//                 iconID      : '',
//                 sunrise     : 0,
//                 sunset      : 0,
//                 timestamp   : 0
//             },
//             forecast : []
//         }
//     },
//     uploadsBySpot :
//     {
//         GLEIS    :
//         {
//             isFetching   : false,
//             isUploading  : false,
//             uploads      : []
//         },
//         DOG_SHIT :
//         {
//             isFetching   : false,
//             isUploading  : false,
//             uploads      : []
//         }
//     }
// }

function updateCurrentWeather( state = {
    isFetching     : false,
    currentWeather : {},
    forecast       : []
}, action )
{
    switch ( action.type )
    {
        case FETCH_WEATHER_FAILURE :
            return Object.assign( {}, state,
            {
                isFetching : false
            } );
        case REQUEST_CURRENT_WEATHER :
            return Object.assign( {}, state,
            {
                isFetching : true
            } );

        case RECEIVE_CURRENT_WEATHER :
            return Object.assign( {}, state,
            {
                isFetching     : false,
                currentWeather :
                {
                    temperature    : action.json.main.temp,
                    minTemperature : action.json.main.temp_min,
                    maxTemperature : action.json.main.temp_max,
                    humidity       : action.json.main.humidity,
                    description    : action.json.weather[ 0 ].description,
                    iconID         : action.json.weather[ 0 ].icon,
                    sunrise        : getStringHourMinute( action.json.sys.sunrise ),
                    sunset         : getStringHourMinute( action.json.sys.sunset ),
                    windSpeed      : action.json.wind.speed,
                    windDeg        : action.json.wind.deg,
                    timestamp      : action.json.dt,
                    lastUpdated    : action.receivedAt
                }
            } );
    }
}

function updateUploads( state = {
    isFetching : false,
    isUploading : false,
    uploads    : []
}, action )
{
    switch ( action.type )
    {
        case UPLOAD_IMAGE :
            return Object.assign( {}, state,
            {
                isUploading : true
            } );

        case UPLOAD_IMAGE_FAILURE :
        case SHOW_ALERT :
            return Object.assign( {}, state,
            {
                isUploading  : false,
            } );

        case REQUEST_IMAGES :
            return Object.assign( {}, state,
            {
                isFetching : true
            } );
        case FETCH_IMAGES_FAILURE :
            return Object.assign( {}, state,
            {
                isFetching : false
            } );
        case RECEIVE_IMAGES :
        {
            const UPLOADS = action.json;
            return Object.assign( {}, state,
            {
                isFetching  : false,
                isUploading : false,
                uploads     : UPLOADS
            } );
        }
    }
    // return [ ...new Set( [ ...state, ...UPLOADS ] ) ];
}

function updateWeatherForecast( state = {
    isFetching     : false,
    currentWeather : {},
    forecast       : []
}, action )
{
    switch ( action.type )
    {
        case REQUEST_WEATHER_FORECAST :
            return Object.assign( {}, state,
            {
                isFetching : true
            } );

        case RECEIVE_WEATHER_FORECAST :
            const LIST              = action.json.list;
            const FORECAST          = LIST.map( listitem =>
            {
                return _.omit( {
                    timestamp      : listitem.dt,
                    humidity       : listitem.main.humidity,
                    temperature    : listitem.main.temp,
                    maxTemperature : listitem.main.temp_max,
                    minTemperature : listitem.main.temp_min,
                    rain           : listitem.rain && listitem.rain[ '3h' ],
                    iconID         : listitem.weather[ 0 ].icon,
                    weatherID      : listitem.weather[ 0 ].id,
                    description    : listitem.weather[ 0 ].description,
                    windSpeed      : listitem.wind.speed,
                    windDeg        : listitem.wind.deg
                }, _.isUndefined );
            } );

            return Object.assign( {}, state,
            {
                isFetching : false,
                forecast   : FORECAST
            } );
    }
}

function weatherBySpot( state = {}, action )
{
    switch ( action.type )
    {
        case FETCH_WEATHER_FAILURE :
        case REQUEST_CURRENT_WEATHER :
        case RECEIVE_CURRENT_WEATHER :
            return Object.assign( {}, state,
            {
                [ action.spot ] : updateCurrentWeather( state[ action.spot ], action )
            } )
        case REQUEST_WEATHER_FORECAST :
        case RECEIVE_WEATHER_FORECAST :
            return Object.assign( {}, state,
            {
                [ action.spot ] : updateWeatherForecast( state[ action.spot ], action )
            } )

        default :
            return state;
    }
}

function spot( state = 'GLEIS', action )
{
    switch ( action.type )
    {
        case SET_SPOT :
            return action.spot
        default :
            return state
    }
}

function uiState( state = { displayedUnit : 'C' }, action )
{
    switch ( action.type )
    {
        case SET_TEMPERATURE_UNIT :
            return Object.assign( {}, state, {
                displayedUnit : action.unit
            } );
        case SET_UI_DISPLAYED_TIME :
            return Object.assign( {}, state, {
                displayedTime : action.time
            } );
        default :
            return state;
    }
}

function uploadsBySpot( state = {}, action )
{
    switch( action.type )
    {
        case UPLOAD_IMAGE :
        case UPLOAD_IMAGE_FAILURE :
        case REQUEST_IMAGES :
        case RECEIVE_IMAGES :
        case FETCH_IMAGES_FAILURE :
            return Object.assign( {}, state,
            {
                [ action.spot ] : updateUploads( state[ action.spot ], action )
            } )
        default :
            return state;
    }
}

function alert( state = {}, action )
{
    switch( action.type )
    {
        case SHOW_ALERT :
            return Object.assign( {}, state, 
            {
                message : action.message
            } );
        case REMOVE_ALERT :
            return {};
        default :
            return state;
    }
}

const rootReducer = combineReducers(
{
    spot,
    uiState,
    weatherBySpot,
    uploadsBySpot,
    alert
} );



export default rootReducer
