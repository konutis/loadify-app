/* eslint-disable */

import React, {Component} from 'react';
import PropTypes from 'prop-types'

export default class PointController extends Component {
    constructor (props) {
        super(props);

        this.handlePointEdit = this.handlePointEdit.bind(this);
        this.handlePointDelete = this.handlePointDelete.bind(this);
    }

    handlePointEdit (event) {
        console.log('edit point')
    }

    handlePointDelete (event) {
        console.log('delete vehicle')
    }

    render () {
        const pointItems = this.props.points.map((point) => {
            return <div key={point.id} className='table-item'>
                {point.location.name}
                <div className='table-item-controls-container'>
                    <button className='table-item-control button--basic' type='button'
                        onClick={this.handlePointEdit}>Edit
                    </button>
                    <button className='table-item-control button--basic' type='button'
                        onClick={this.handlePointDelete}>Delete
                    </button>
                </div>
            </div>
        });

        return (
            <div className='table'>
                <h2>Visits</h2>
                <div className='table-inner'>
                    {pointItems}
                </div>
            </div>
        );
    }
}

PointController.propTypes = {
    handlePointEdit: PropTypes.func.isRequired,
    handlePointDelete: PropTypes.func.isRequired,
    points: PropTypes.array
};