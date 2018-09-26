/* eslint-disable */

import React, {Component} from 'react';
import exampleVisits from './../sampleData/locationData'
import vehicles from './../sampleData/vehicleData'
import exampleResponse from './../sampleData/exampleResponse'
import PropTypes from 'prop-types';
// import Geocode from 'react-geocode';
import AddPoint from './AddPoint/AddPoint'
import AddVehicle from './AddVehicle/AddVehicle'
import EditPoint from './EditPoint'
import PointController from './PointController'
import VehicleController from './VehicleController'

const Routific = require('routific');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjlkMmRkMTI5OWI4ZTFiZDViNjhjMDQiLCJpYXQiOjE1MzcwMzA1NTR9.nlj-qQ-ormqW9mD0JNebnRpQKqtsE0U3E-KmmLJu73c';
const options = { token: token };
const client = new Routific.Client(options);
const vrp = new Routific.Vrp();

export default class RouteCalculator extends Component {
    static timeConvert (minutes) {
        let hours = (minutes / 60);
        let rhours = Math.floor(hours);
        let rminutes = Math.round((hours - rhours) * 60);
        return `${rhours} h ${rminutes} m.`;
    }

    constructor (props) {
        super(props);
        this.state = {
            solution: this.props.solution,
            error: this.props.error,
            points: exampleVisits,
            vehicles: vehicles
        };

        this.handleCalculations = this.handleCalculations.bind(this);
        this.handlePointAdd = this.handlePointAdd.bind(this);
        this.handleVehicleAdd = this.handleVehicleAdd.bind(this);
        this.handlePointEdit = this.handlePointEdit.bind(this);
        this.handleVehicleEdit = this.handleVehicleEdit.bind(this);
        this.handlePointDelete = this.handlePointDelete.bind(this);
        this.handleVehicleDelete = this.handleVehicleDelete.bind(this);
    }

    componentDidMount () {
        this.state.points.map((visit) => {
            vrp.addVisit(visit.id, visit);
        });
        this.state.vehicles.map((vehicle) => {
            vrp.addVehicle(vehicle.id, vehicle);
        });

        vrp.addOption('traffic', 'fast');
    }

    getSolutionRoutes (solution) {
        return solution.map((point, index) =>
            <div key={`${point.location_id}-${index}`} className='solution-point'>
                <div className='solution-point-name'>{point.location_name}</div>
                <div className='description'>Arrival time: {point.arrival_time}</div>
                {point.finish_time ? <div className='description'>Finish time: {point.finish_time}</div> : null}
            </div>
        );
    }

    getSolution () {
        if (this.props.solution) {
            const { status, total_travel_time, total_working_time, solution } = this.props.solution;
            console.log(status);
            if (!solution) {
                return null;
            }
            return (
                <div>
                    <ul>
                        {solution && Object.entries(solution).map(([ solutionKey, solutionValue ]) =>
                            <li key={solutionKey} className='vehicle-item'>
                                {solutionKey}
                                {this.getSolutionRoutes(solutionValue)}
                            </li>
                        )}
                    </ul>
                    <div>Total travel time: {RouteCalculator.timeConvert(total_travel_time)}</div>
                    <div>Total working time: {RouteCalculator.timeConvert(total_working_time)}</div>
                </div>
            );
        }
    }

    handleCalculations () {
        // this.props.handleSolutionChange(exampleResponse)

        client.route(vrp, (err, solution) => {
            if (err) {
                console.error('An error occurred');
            } else if (solution.status === 'success') {
                this.props.handleSolutionChange(solution)
            }
        });
    }

    handlePointAdd (point) {
        let points = this.state.points;
        points.push(point);
        vrp.addVisit(point.id, point);
        this.setState({ points });
    }

    handleVehicleAdd (vehicle) {
        let vehicles = this.state.vehicles;
        vehicles.push(vehicle);
        vrp.addVehicle(vehicle.id, vehicle);
        this.setState({ vehicles });
    }

    handlePointEdit (point) {

    }

    handlePointDelete (pointId) {

    }

    handleVehicleEdit (vehicle) {

    }

    handleVehicleDelete (vehicleId) {

    }

    render () {
        return (
            <div className='container'>
                <div className='button-container'>
                    <button type='button' className='button--basic' onClick={this.handleCalculations}>
                        Calculate routes
                    </button>
                </div>
                <VehicleController vehicles={this.state.vehicles} handleVehicleEdit={this.handleVehicleEdit}
                    handleVehicleDelete={this.handleVehicleDelete} />
                <AddVehicle handleVehicleAdd={this.handleVehicleAdd} />
                <PointController points={this.state.points} handlePointEdit={this.handlePointEdit}
                    handlePointDelete={this.handlePointDelete} />
                {/*{this.getSolution()}*/}
                <AddPoint handlePointAdd={this.handlePointAdd} />
            </div>
        );
    }
}

RouteCalculator.propTypes = {
    handleSolutionChange: PropTypes.func.isRequired
};