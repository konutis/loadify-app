/* eslint-disable */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Dashboard extends Component {
    getVehicleItems (items) {
        return items.map((item, index) => {
            return <div key={`solution-point-${index}`} className='solution-point'>
                <div className='solution-point-box'>
                    <div>Name: {item.location_name}</div>
                    <div>Arrival Time: {item.arrival_time}</div>
                    {item.finish_time ? <div>Finish Time: {item.finish_time}</div> : null}
                </div>
            </div>
        })

    }

    getSolutionBars () {
        const { solution } = this.props.routesSolution
        if (solution) {
            const solutionList = Object.entries(solution);
            return solutionList.map(([key, value], index) => {
                return (
                    <div key={`solution-vehicle-${index}`} className='solution-vehicle'>
                        <div className='solution-vehicle-name'>{key}</div>
                        {this.getVehicleItems(value)}
                    </div>
                )
            })
        } else {
            return null
        }
    }

    render () {
        if (!this.props.routesSolution.solution) {
            return null;
        }

        return (
            <div className='container'>
                <div className='solution-bars'>
                    {this.getSolutionBars()}
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    routesSolution: PropTypes.object
};