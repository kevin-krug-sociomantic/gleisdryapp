import React from 'react';
import { connect } from 'react-redux';
import { NavDropdown, MenuItem } from 'react-bootstrap';
import { SPOTS, MENU_ITEM_COPIES, ROUTES } from '../constants';
import { setSpot, fetchWeatherIfNeeded, fetchUploadsIfNeeded } from '../actions';
import PropTypes from 'prop-types';

class SpotDropdown extends React.Component
{
     constructor()
    {
        super();
        _.bindAll( this, [ 'onSelect' ] );
    }

    onSelect( spot )
    {
        this.props.dispatch( setSpot( spot ) );

        if( this.props.path === ROUTES.UPLOADS )
        {
            this.props.dispatch( fetchUploadsIfNeeded( spot ) );
        }
        else
        {
            this.props.dispatch( fetchWeatherIfNeeded( spot, 'current' ) );
            this.props.dispatch( fetchWeatherIfNeeded( spot, 'forecast' ) );
        }
    }

    render()
    {
        let menuItems = [];
        for( let spot in MENU_ITEM_COPIES )
        {
            menuItems.push( <MenuItem key={ spot } eventKey={ spot }>{ MENU_ITEM_COPIES[ spot ] }</MenuItem> );
        }

        return (
            <NavDropdown title='Check Spot' id='select-spot' onSelect={ this.onSelect }>
                { menuItems }
            </NavDropdown>
        );
    }
}

SpotDropdown.propTypes =
{
    dispatch : PropTypes.func,
    path     : PropTypes.string
}

export default connect()(SpotDropdown); // adds dispatch to props
