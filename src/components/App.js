/* eslint-disable */

import React, {Component} from 'react';
import RouteCalculator from './RouteCalculator';
import Dashboard from './Dashboard';

export default class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            solution: {},
            error: {}
        };

        this.handleSolutionChange = this.handleSolutionChange.bind(this);
    }

    handleSolutionChange (solution) {
        this.setState({ solution });
    }

    render () {
        return (
            <div>
                <Dashboard routesSolution={this.state.solution} />
                <RouteCalculator handleSolutionChange={this.handleSolutionChange} solution={this.state.solution} error={this.state.error} />
            </div>
        );
    }
}
