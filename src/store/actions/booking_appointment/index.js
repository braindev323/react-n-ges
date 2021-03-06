/**
 * Description: Booking appointment Actions.
 * Date: 4/3/2019
 */

import * as Utils from 'utils/api';

export const APPOINTMENT_REQUEST = '[BOOKING APPOINTMENT] REQUEST';
export const APPOINTMENT_SUCCESS = '[BOOKING APPOINTMENT] SUCCESS';
export const APPOINTMENT_FAILED  = '[BOOKING APPOINTMENT] FAILED';

export function getAppointment(data) {
    // const request = Utils.xapi().post('booking/dashboard/timelineday', data);
    const request = Utils.xapi().post('booking/dashboard/timeline', data);

    return (dispatch) => {
        dispatch({
            type: APPOINTMENT_REQUEST
        })
        request.then((response) =>
            dispatch({
                type    : APPOINTMENT_SUCCESS,
                payload : response.data
            })
        ).catch((error) => {
            dispatch({
                type    : APPOINTMENT_FAILED,
                payload : error
            })
        });
    }
}

export const BREAK_SUCCESS = '[BOOKING APPOINTMENT] BREAK SUCCESS';
export const BREAK_FAILED  = '[BOOKING APPOINTMENT] BREAK FAILED';

export function setBreak(data, root) {
    const request = root === 'time'? Utils.xapi().post('booking/dashboard/break', data) : Utils.xapi().post('booking/dashboard/dayoff', data);

    return (dispatch) => {
        request.then((response) =>
            dispatch({
                type    : BREAK_SUCCESS,
                payload : response.data
            })
        ).catch((error) => {
            dispatch({
                type    : BREAK_FAILED,
                payload : error
            })
        });
    }
}

export const DELETE_EVENT_SUCCESS = '[BOOKING APPOINTMENT] DELETE SUCCESS';
export const DELETE_EVENT_FAILED  = '[BOOKING APPOINTMENT] DELETE FAILED';

export function deleteBookingEvent(data) {
    const request = Utils.xapi().post('booking/dashboard/delete', data);
    
    return (dispatch) => {
        request.then(() =>
            dispatch({
                type    : DELETE_EVENT_SUCCESS,
                payload : data.bookingId
            })
        ).catch((error) => {
            dispatch({
                type    : DELETE_EVENT_FAILED,
                payload : error
            })
        });
    }
}

export const UPDATE_EVENT_SUCCESS = '[BOOKING APPOINTMENT] UPDATE SUCCESS';
export const UPDATE_EVENT_FAILED  = '[BOOKING APPOINTMENT] UPDATE FAILED';

export function updateBookingEvent(data) {
    const request = Utils.xapi().post('booking/dashboard/update', data);
    
    return (dispatch) => {
        request.then((response) =>
            dispatch({
                type    : UPDATE_EVENT_SUCCESS,
                payload : response.data
            })
        ).catch((error) => {
            dispatch({
                type    : UPDATE_EVENT_FAILED,
                payload : error
            })
        });
    }
}