const lightYellow = 'rgba(255, 243, 204, 1)'
const darkYellow = 'rgba(255, 204, 0, 1)'
const lightblue = 'rgba(51, 122, 183, 1)'
const darkblue = 'rgba(51, 122, 183, 1)';

const temperatureBorder = darkYellow;
const temperatureBG = lightYellow;
const rainBorder = darkblue;
const rainBG = lightblue;

export const legendBoxStyle = {
  width : '12px', 
  height : '12px', 
  display : 'inline-block',
  marginRight: '5px'
};

export const temperatureBoxStyle = Object.assign( {}, legendBoxStyle, {
  border : `1px solid ${ temperatureBorder }`,
  backgroundColor : temperatureBG,
} );

export const rainBoxStyle = Object.assign( {}, legendBoxStyle, {
  border : `1px solid ${ rainBorder }`,
  backgroundColor : rainBG,
} );

export const selectedStyle = {
  fontWeight : 'bold'
}

export const colors =
{
  red  : '#dd4b39',
  blue : '#1878f0'
}