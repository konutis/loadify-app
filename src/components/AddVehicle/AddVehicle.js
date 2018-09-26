/* eslint-disable */

import React, {Component} from 'react';
import PropTypes from 'prop-types'

export default class AddVehicle extends Component {
    constructor (props) {
        super(props);

        this.state = {
            startName: '',
            startLat: '',
            startLng: '',
            endName: '',
            endLat: '',
            endLng: '',
            shiftStart: '',
            shiftEnd: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleVehicleAdd = this.handleVehicleAdd.bind(this);
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

    handleVehicleAdd (event) {
        event.preventDefault();

        let addedVehicle = {
            id: this.generateID(),
            start_location: {
                id: this.generateID(),
                // name: this.state.startName,
                lat: this.state.startLat,
                lng: this.state.startLng
            },
            end_location: {
                id: this.generateID(),
                // name: this.state.endName,
                lat: this.state.endLat,
                lng: this.state.endLng
            },
            'shift_start': this.state.shiftStart,
            'shift_end': this.state.shiftEnd
        };

        this.props.handleVehicleAdd(addedVehicle);
    }

    render () {
        return (
            <div className='form-container' onSubmit={this.handleVehicleAdd}>
                <form className='form'>
                    <input required onChange={this.handleInputChange} className='form-input' type='text' id='vehicle-name-add'
                        placeholder='NAME' name='vehicleName' value={this.state.vehicleName} />
                    <div className='form-field'>
                        <input required onChange={this.handleInputChange} className='form-input form-input-1-2' type='text'
                            id='vehicle-shift-start-add'
                            placeholder='SHIFT START (08:00)' name='shiftStart' value={this.state.shiftStart} />
                        <input required onChange={this.handleInputChange} className='form-input form-input-1-2' type='text'
                            id='vehicle-shift-end-add'
                            placeholder='SHIFT END (17:00)' name='shiftEnd' value={this.state.shiftEnd} />
                    </div>
                    <input required onChange={this.handleInputChange} className='form-input' type='text'
                        id='vehicle-start-name-add'
                        placeholder='START LOCATION NAME' name='startName' value={this.state.startName} />
                    <div className='form-field'>
                        <input required onChange={this.handleInputChange} className='form-input form-input-1-2' type='number'
                            id='vehicle-start-latitude-add'
                            placeholder='START LATITUDE' name='startLat' value={this.state.startLat} />
                        <input required onChange={this.handleInputChange} className='form-input form-input-1-2' type='number'
                            id='vehicle-start-longitude-add'
                            placeholder='START LONGITUDE' name='startLng' value={this.state.startLng} />
                    </div>
                    <input onChange={this.handleInputChange} className='form-input' type='text'
                        id='vehicle-end-name-add'
                        placeholder='END LOCATION NAME' name='endName' value={this.state.endName} />
                    <div className='form-field'>
                        <input onChange={this.handleInputChange} className='form-input form-input-1-2' type='number'
                            id='vehicle-end-latitude-add'
                            placeholder='END LATITUDE' name='endLat' value={this.state.endLat} />
                        <input onChange={this.handleInputChange} className='form-input form-input-1-2' type='number'
                            id='vehicle-end-longitude-add'
                            placeholder='END LONGITUDE' name='endLng' value={this.state.endLng} />
                    </div>
                    <input className='form-submit' type='submit' value='ADD VEHICLE' />
                </form>
            </div>
        );
    }
}

AddVehicle.propTypes = {
    handleVehicleAdd: PropTypes.func.isRequired
};