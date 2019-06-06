import moment from 'moment';

export function getStringHourMinute( timestamp )
{
    return moment.unix( timestamp ).format( 'HH:mm' );
}

export function getWeekDay( timestamp )
{
    return moment.unix( timestamp ).day();
}

export function parseTimestampToLocalTime( timeStamp )
{
    return new Date( timeStamp ).toLocaleTimeString();
}
