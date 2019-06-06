
import { COORDINATES_MAP, API_KEY } from '../constants';

/*
 * action types
 */

export const SET_SPOT                 = 'SET_SPOT';
export const SET_UI_DISPLAYED_TIME    = 'SET_UI_DISPLAYED_TIME';
export const SET_TEMPERATURE_UNIT     = 'SET_TEMPERATURE_UNIT';
export const REQUEST_CURRENT_WEATHER  = 'REQUEST_CURRENT_WEATHER';
export const RECEIVE_CURRENT_WEATHER  = 'RECEIVE_CURRENT_WEATHER';
export const REQUEST_WEATHER_FORECAST = 'REQUEST_WEATHER_FORECAST';
export const RECEIVE_WEATHER_FORECAST = 'RECEIVE_WEATHER_FORECAST';
export const UPLOAD_IMAGE             = 'UPLOAD_IMAGE';
export const UPLOAD_IMAGE_FAILURE     = 'UPLOAD_IMAGE_FAILURE';
export const FETCH_WEATHER_FAILURE    = 'FETCH_WEATHER_FAILURE';
export const FETCH_IMAGES_FAILURE     = 'FETCH_IMAGES_FAILURE';
export const REQUEST_IMAGES           = 'REQUEST_IMAGES';
export const RECEIVE_IMAGES           = 'RECEIVE_IMAGES';
export const SHOW_ALERT               = 'SHOW_ALERT';
export const REMOVE_ALERT             = 'REMOVE_ALERT';

const HOST = 'https://gleisdryappserver.herokuapp.com';
/*
 * action creators
 */
export function setUIdisplayTime( time )
{
    return {
        type : SET_UI_DISPLAYED_TIME,
        time
    }
};

export function setTemperatureUnit( unit )
{
    return {
        type : SET_TEMPERATURE_UNIT,
        unit
    }
};

export function setSpot( spot )
{
  return {
        type : SET_SPOT,
        spot
    }
};

function requestWeather( spot, currentOrForecast )
{
    const TYPE = currentOrForecast === 'current' ? REQUEST_CURRENT_WEATHER :
        REQUEST_WEATHER_FORECAST;
    return {
        type : TYPE,
        spot
  }
}

function receiveWeather( spot, json, currentOrForecast )
{
    const TYPE = currentOrForecast === 'current' ? RECEIVE_CURRENT_WEATHER :
        RECEIVE_WEATHER_FORECAST;
    return {
        type       : TYPE,
        spot,
        json       : json,
        receivedAt : Date.now()
    }
}

function uploadImage( spot )
{
    return {
        type : UPLOAD_IMAGE,
        spot
    }
}

function uploadImageFailure( spot )
{
    return {
        type : UPLOAD_IMAGE_FAILURE,
        spot
    }
}

function fetchWeatherFailure( spot )
{
    return {
        type : FETCH_WEATHER_FAILURE,
        spot
    }
}

function fetchImagesFailure( spot )
{
    return {
        type : FETCH_IMAGES_FAILURE,
        spot
    }
}

function requestImages( spot )
{
    return {
        type : REQUEST_IMAGES,
        spot
    }
}

function receiveImages( spot, json )
{
    return {
        type       : RECEIVE_IMAGES,
        spot,
        json,
        receivedAt : Date.now()
    }
}

function showAlert( message )
{
    return {
        type : SHOW_ALERT,
        message
    }
}

export function removeAlert()
{
    return {
        type : REMOVE_ALERT
    }
}

// @param {String} spot
// @param {String} currentOrForecast - 'current' or 'forecast'
export function fetchWeather( spot, currentOrForecast )
{
    return dispatch =>
    {
        const CURRENT_OR_FORECAST = currentOrForecast === 'current' ? 'weather' :
            'forecast';
        const BASE_URL    = `https://api.openweathermap.org/data/2.5/${CURRENT_OR_FORECAST}`;
        const COORDINATES = COORDINATES_MAP[ spot ];
        const URL         = `${BASE_URL}?lat=${COORDINATES.lat}&lon=${COORDINATES.lon}&APPID=${API_KEY}`;

        dispatch( requestWeather( spot, currentOrForecast ) );
        return fetch( URL, { method : 'GET' } )
            .then( response => response.json() )
            .then( json => dispatch( receiveWeather( spot, json, currentOrForecast ) ) )
            .catch( error => {
                dispatch( fetchWeatherFailure( spot ) );
                dispatch( showAlert( error.message ) ); 
                console.error( 'weather request failed with error:' + error ); 
            } );
    }
}

function shouldFetchWeather( state, spot, currentOrForecast )
{
    let spotWeather;
    let fetchCondition;

    if( currentOrForecast === 'current' )
    {
        spotWeather = state.weatherBySpot[ spot ] && state.weatherBySpot[ spot ].currentWeather;
        fetchCondition = !spotWeather || !Object.keys( spotWeather ).length;
    }
    else
    {
        spotWeather = state.weatherBySpot[ spot ].forecast;
        fetchCondition = !spotWeather.length;
    }

    if ( fetchCondition )
    {
        return true
    }
    else if ( spotWeather.isFetching )
    {
        return false
    }
    return false;
}

function shouldFetchUploads( state, spot )
{
    const spotUploads = state.uploadsBySpot[ spot ];

    if ( !spotUploads || !spotUploads.uploads.length )
    {
        return true
    }
    else if ( spotUploads.isFetching )
    {
        return false
    }
    return false;
}

export function fetchWeatherIfNeeded( spot, currentOrForecast )
{
    return ( dispatch, getState ) =>
    {
        if ( shouldFetchWeather( getState(), spot, currentOrForecast ) )
        {
            return dispatch( fetchWeather( spot, currentOrForecast ) )
        }
    }
}


export function fetchUploadsIfNeeded( spot )
{
    return ( dispatch, getState ) =>
    {
        if ( shouldFetchUploads( getState(), spot ) )
        {
            return dispatch( fetchImages( spot ) )
        }
    }
}

export function fetchImages( spot )
{
    return dispatch =>
    {
        const URL = `${ HOST }/images?spot=${ spot }`;

        dispatch( requestImages( spot ) );
        return fetch( URL, { method : 'GET' } )
            .then( response => response.json() )
            .then( json => dispatch( receiveImages( spot, json ) ) )
            .catch( error => {
                dispatch( fetchImagesFailure( spot ) );
                dispatch( showAlert( error.message ) );
            } );
    }
}

export function postImage( fileName, fileType, dataUri, spot, sendAt )
{
    return dispatch =>
    {
        let formData = new FormData();
        let xhr      = new XMLHttpRequest();

        formData.append( 'file', dataUri );
        formData.append( 'fileName', fileName );
        formData.append( 'fileType', fileType );
        formData.append( 'spot', spot );
        formData.append( 'sendAt', sendAt );

        dispatch( uploadImage( spot ) );
        xhr.open( 'POST', `${ HOST }/upload`, true);

        xhr.onreadystatechange = function()
        {
            if ( xhr.readyState === XMLHttpRequest.DONE )
            {
                if (  xhr.status === 200 )
                {
                    let json = JSON.parse( xhr.responseText );
                    dispatch( removeAlert() );
                    dispatch( receiveImages( spot, json ));
                }
                else
                {
                    let errorMessage = xhr.statusText;
                    let errorCode    = xhr.status;
                    errorMessage = errorMessage || 'Image post failed. May be a problem with your connection';
                    console.error( errorCode, errorMessage );
                    dispatch( uploadImageFailure( spot ) );
                    dispatch( showAlert( errorMessage ) );
                }
            }

        };

        xhr.send( formData );
    }
}
