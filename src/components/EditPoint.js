/* eslint-disable */

import React, {Component} from 'react';
import PropTypes from 'prop-types'

export default class EditPoint extends Component {
    constructor (props) {
        super(props);

        const { editPoint } = props;

        this.state = {
            lat: editPoint.location.lat,
            lng: editPoint.location.lng,
            pointName: editPoint.location.name,
            pointStart: editPoint.start,
            pointEnd: editPoint.end,
            pointDuration: editPoint.duration
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePointEdit = this.handlePointEdit.bind(this);
    }

    handleInputChange (event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [ name ]: value
        });
    }

    handlePointEdit (event) {
        event.preventDefault();
        const { editPoint } = this.props;

        if (!editPoint.id) {
            return;
        }

        const editedPoint = {
            id: this.props.editPoint.id,
            location: {
                name: this.state.pointName,
                lat: this.state.lat,
                lng: this.state.lng
            },
            start: this.state.pointStart,
            end: this.state.pointEnd,
            duration: this.state.pointDuration
        };

        this.props.handlePointEdit(editedPoint);
    }

    render () {
        return (
            <div className='container'>
                <div className='form-container' onSubmit={this.handlePointEdit}>
                    <form className='form'>
                        <input onChange={this.handleInputChange} className='form-input' type='text' id='edit-point-name'
                            placeholder='NAME' name='pointName' value={this.state.pointName} />
                        <input onChange={this.handleInputChange} className='form-input' type='number' id='edit-latitude'
                            placeholder='LATITUDE' name='lat' value={this.state.lat} />
                        <input onChange={this.handleInputChange} className='form-input' type='number'
                            id='edit-longitude'
                            placeholder='LONGITUDE' name='lng' value={this.state.lng} />
                        <div className='form-field'>
                            <input onChange={this.handleInputChange} className='form-input form-input-1-3' type='text'
                                id='edit-point-start'
                                placeholder='START (08:00)' name='pointStart' value={this.state.pointStart} />
                            <input onChange={this.handleInputChange} className='form-input form-input-1-3' type='text'
                                id='edit-point-end'
                                placeholder='END (17:00)' name='pointEnd' value={this.state.pointEnd} />
                            <input onChange={this.handleInputChange} className='form-input form-input-1-3' type='number'
                                id='edit-point-duration'
                                placeholder='DURATION MIN (10)' name='pointDuration' value={this.state.pointDuration} />
                        </div>
                        <input className='form-submit' type='submit' value='Save' />
                        <input className='form-submit' value='Cancel' />
                    </form>
                </div>
            </div>
        );
    }
}

EditPoint.propTypes = {
    handlePointEdit: PropTypes.func.isRequired,
    editPoint: PropTypes.object.isRequired
};