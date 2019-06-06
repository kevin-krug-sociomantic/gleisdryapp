import React from 'react';
import { EMOJIS } from '../../constants';
import styles from './loader.css';
import { CSSTransitionGroup } from 'react-transition-group';
import { Row, Col } from 'react-bootstrap';

class Loader extends React.Component
{
    render()
    {
        let spot      = this.props.spot;
        let isLoading = this.props.isLoading;
        let emoji     = EMOJIS[ spot ];

        const loader = (
            <Row>
                <Col xs={12} sm={8}>
                    <div className= { styles.loader } >{ emoji }</div>
                    <h3 className ={ styles.dots}>loading<span>.</span><span>.</span><span>.</span></h3>
                </Col>
            </Row>
        );

        return (
        <CSSTransitionGroup
            transitionName="crossfade"
            transitionAppear={true}
            transitionAppearTimeout={5000}
            transitionEnterTimeout={5000}
            transitionLeaveTimeout={3000}>
            { isLoading ? loader : this.props.children }
        </CSSTransitionGroup> );
    }
}

export default Loader;
