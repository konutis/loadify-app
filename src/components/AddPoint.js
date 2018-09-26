/* eslint-disable */

import React, {Component} from 'react';
import PropTypes from 'prop-types'

export default class AddPoint extends Component {
    constructor (props) {
        super(props);

        this.state = {
            lat: '',
            lng: '',
            pointName: '',
            pointStart: '',
            pointEnd: '',
            pointDuration: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePointAdd = this.handlePointAdd.bind(this);
    }

    generateID () {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    handleInputChange (event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [ name ]: value
        });
    }

    handlePointAdd (event) {
        event.preventDefault();

        let addedPoint = {
            id: this.generateID(),
            location: {
                name: this.state.pointName,
                lat: this.state.lat,
                lng: this.state.lng
            },
            start: this.state.pointStart,
            end: this.state.pointEnd,
            duration: this.state.pointDuration
        };

        this.props.handlePointAdd(addedPoint);
    }

    render () {
        return (
            <div className='form-container' onSubmit={this.handlePointAdd}>
                <form className='form'>
                    <input onChange={this.handleInputChange} className='form-input' type='text' id='pointName'
                        placeholder='NAME' name='pointName' value={this.state.pointName} />
                    <input onChange={this.handleInputChange} className='form-input' type='number' id='latitude'
                        placeholder='LATITUDE' name='lat' value={this.state.lat} />
                    <input onChange={this.handleInputChange} className='form-input' type='number' id='longitude'
                        placeholder='LONGITUDE' name='lng' value={this.state.lng} />
                    <div className='form-field'>
                        <input onChange={this.handleInputChange} className='form-input form-input-1-3' type='text'
                            id='point-start'
                            placeholder='START (08:00)' name='pointStart' value={this.state.pointStart} />
                        <input onChange={this.handleInputChange} className='form-input form-input-1-3' type='text'
                            id='point-end'
                            placeholder='END (17:00)' name='pointEnd' value={this.state.pointEnd} />
                        <input onChange={this.handleInputChange} className='form-input form-input-1-3' type='number'
                            id='point-duration'
                            placeholder='DURATION MIN (10)' name='pointDuration' value={this.state.pointDuration} />
                    </div>
                    <input className='form-submit' type='submit' value='ADD PICKUP' />
                </form>
            </div>
        );
    }
}

AddPoint.propTypes = {
    handlePointAdd: PropTypes.func.isRequired
};