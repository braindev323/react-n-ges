/**
 * Description: Reducer of the checklist
 * Date: 1/4/2019
 */

import * as Actions from '../actions';

const initialState = {
    employees: []
};

const employees = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_EMPLOYEES:
        {
            return {
                employees: action.employees
            };
        }
        case Actions.UPDATE_EMPLOYEE:
        {
            return {
                services: state.employees
            };
        }
        case Actions.DELETE_SERVICE:
        {
            return {
                services: state.employees
            };
        }
        default:
        {
            return state
        }
    }
};

export default employees;