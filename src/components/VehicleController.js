/* eslint-disable */

import React, {Component} from 'react';
import PropTypes from 'prop-types'

export default class VehicleController extends Component {
    constructor (props) {
        super(props);

        this.handleVehicleEdit = this.handleVehicleEdit.bind(this);
        this.handleVehicleDelete = this.handleVehicleDelete.bind(this);
    }

    handleVehicleEdit (event) {
        console.log('edit vehicle')
    }

    handleVehicleDelete (event) {
        console.log('delete vehicle')
    }

    render () {
        const vehicleItems = this.props.vehicles.map((vehicle) => {
            return <div key={vehicle.id} className='table-item'>
                {vehicle.id}
                <div className='table-item-controls-container'>
                    <button className='table-item-control button--basic' type='button'
                        onClick={this.handleVehicleEdit}>Edit
                    </button>
                    <button className='table-item-control button--basic' type='button'
                        onClick={this.handleVehicleDelete}>Delete
                    </button>
                </div>
            </div>
        });

        return (
            <div className='table'>
                <h2>Vehicles</h2>
                <div className='table-inner'>
                    {vehicleItems}
                </div>
            </div>
        );
    }
}

VehicleController.propTypes = {
    handleVehicleEdit: PropTypes.func.isRequired,
    handleVehicleDelete: PropTypes.func.isRequired,
    vehicles: PropTypes.array
};