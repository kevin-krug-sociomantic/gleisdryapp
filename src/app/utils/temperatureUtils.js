
function convertKelvinToCelsius( value )
{
    const ZeroKelvinInCelsius = -273.15;
    return roundToOneDecimal( value + ZeroKelvinInCelsius );
}

function convertKelvinToFahrenheit( value )
{
	const ZeroKelvinInFahrenheit = - 459.67;
	const ConversionFactor = 1.8;
	return roundToOneDecimal( value * ConversionFactor + ZeroKelvinInFahrenheit );
}

function roundToOneDecimal( number )
{
    return Math.round( number * 10 ) / 10;
}

const unitConversionMap = {
    'C' : convertKelvinToCelsius,
    'F' : convertKelvinToFahrenheit
}

export default unitConversionMap;