
import unitConversionMap from './temperatureUtils';
import { getStringHourMinute, getWeekDay, parseTimestampToLocalTime } from './timeUtils';

function toggleItemInArray( array, item )
{
	const index = array.indexOf( item );
	if( index !== -1 )
	{
		let returnArray = [ ...array ];
		returnArray.splice( index, 1 );
		return returnArray;
	}
	else
	{
		return [ ...array, item ];
	}
}

export {
	toggleItemInArray,
	unitConversionMap,
	getStringHourMinute,
	getWeekDay,
	parseTimestampToLocalTime
}
