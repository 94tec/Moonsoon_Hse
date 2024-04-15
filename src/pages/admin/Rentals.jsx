// Rentals.js
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RentalList from './RentalList';
import RentalDetails from './RentalDetails';

const Rentals = () => {
    return (
        <div>
            <h2>Rentals</h2>
            <Switch>
                <Route path="/rentals" exact component={RentalList} />
                <Route path="/rentals/:id" component={RentalDetails} />
            </Switch>
        </div>
    );
};

export default Rentals;
