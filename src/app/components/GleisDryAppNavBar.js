import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import SpotDropdown from './SpotDropdown';
import { Link } from 'react-router-dom';
import { fetchUploadsIfNeeded } from '../actions';
import { ROUTES } from '../constants';
import PropTypes from 'prop-types';

class GleisDryAppNavBar extends React.Component
{
    constructor()
    {
        super();
        _.bindAll( this, [ 'onUploadSelect'] );
    }

    onUploadSelect()
    {
        this.props.dispatch( fetchUploadsIfNeeded( this.props.spot ) );
    }

    render()
    {

        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand><Link to= { ROUTES.HOME }>GleisDryApp</Link></Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <li role="presentation">
                            <Link onClick={ this.onUploadSelect } to={ ROUTES.UPLOADS }>Upload Images</Link>
                        </li>
                        <SpotDropdown path = { this.props.path }/>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

GleisDryAppNavBar.propTypes =
{
    dispatch : PropTypes.func,
    spot     : PropTypes.string,
    path     : PropTypes.string
}

export default connect()(GleisDryAppNavBar); // adds dispatch to props
