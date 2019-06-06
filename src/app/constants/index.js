/*
 * constants
 */

import SPOT_IMAGES from './spotimages';

const SPOTS =
{
  GLEIS    : 'GLEIS',
  DOG_SHIT : 'DOG_SHIT',
  ZARAUTZ  : 'ZARAUTZ'
}

const MENU_ITEM_COPIES =
{
    [ SPOTS.GLEIS ]    : 'Gleisdreick Pools',
    [ SPOTS.DOG_SHIT ] : 'Dogshit DIY',
    [ SPOTS.ZARAUTZ ]  : 'Zarautz Bowl'
}

const COORDINATES_MAP =
{
    [ SPOTS.GLEIS ] :
    {
        lon : 13.3724696,
        lat : 52.4968102
    },
    [ SPOTS.DOG_SHIT ] :
    {
        lon : 13.4464827,
        lat : 52.5076834
    },
    [ SPOTS.ZARAUTZ ] :
    {
        lon : -2.1652273,
        lat : 43.2885242
    }
}

const COUNTRY_CODE = 'DE';

const API_KEY = '0f7c8fd0c3c6d2c364849bf2301eb283';

const EMOJIS =
{
    [ SPOTS.GLEIS ]    : String.fromCodePoint( '0x1F689' ), // train emoji
    [ SPOTS.DOG_SHIT ] : String.fromCodePoint( '0x1F4A9' ), // poo emoji,
    [ SPOTS.ZARAUTZ ]  : String.fromCodePoint( '0x1F30A'), // wave emoji
    'SUNSET'           : String.fromCodePoint( '0x1F305' ),
    'SUNRISE'          : String.fromCodePoint( '0x1F307' ),
    'CLOCK'            : String.fromCodePoint( '0x23F0'),
    'ARROW'            : String.fromCodePoint( '0x2B06' ),
    'SKATEBOARD'       : String.fromCodePoint( '0x1F6F9' ),
    'DESERT'           : String.fromCodePoint( '0x1F3DC' ),
    'DROP'             : String.fromCodePoint( '0x1F4A7' ),
    'THERMOMETER'      : String.fromCodePoint( '0x1F321' )
}

const WEATHER_EMOJIS =
{
    '01d' : String.fromCodePoint( '0x2600'), // clear sky
    '01n' : String.fromCodePoint( '0x1F311'),
    '02d' : String.fromCodePoint( '0x26C5'), // few clouds
    '02n' : String.fromCodePoint( '0x2601'),
    '03d' : String.fromCodePoint( '0x2601'), // scattered clouds
    '03n' : String.fromCodePoint( '0x2601'),
    '04d' : String.fromCodePoint( '0x2601'), // broken clouds
    '04n' : String.fromCodePoint( '0x2601'),
    '09d' : String.fromCodePoint( '0x1F327' ), // shower rain
    '09n' : String.fromCodePoint( '0x1F326' ),
    '10d' : String.fromCodePoint( '0x1F326' ), // rain
    '10n' : String.fromCodePoint( '0x1F326' ),
    '11d' : String.fromCodePoint( '0x1F329' ), // thunderstorm
    '11n' : String.fromCodePoint( '0x1F329' ),
    '13d' : String.fromCodePoint( '0x1F328' ), // snow
    '13n' : String.fromCodePoint( '0x1F328' ),
    '50d' : String.fromCodePoint( '0x1F32B' ), // mist
    '50n' : String.fromCodePoint( '0x1F32B' )
}

const WEEKDAYS =
[
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

const UNITS =
{
    MS : 'm/s'
}

const ROUTES =
{
    HOME : '/',
    UPLOADS : '/uploads/'
}

export { SPOTS, MENU_ITEM_COPIES, SPOT_IMAGES, COORDINATES_MAP, COUNTRY_CODE, API_KEY, EMOJIS, WEATHER_EMOJIS, WEEKDAYS, UNITS, ROUTES };
