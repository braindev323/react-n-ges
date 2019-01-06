/**
 * Description: User data actions
 * Date: 12/28/2018
 */

export const SET_USER_DATA = '[USER] SET DATA';
export const GET_USER_DATA = '[USER] GET DATA';
export const UPDATE_USER_WORKINGFORID = '[USER] UPDATE WORKINGFORID';

export function setUserData(user) {    
    let token = user.token;
    let workingFor = JSON.stringify(user.workingFor);
    localStorage.setItem('token', token);
    localStorage.setItem('workingFor', workingFor);
    
    return (dispatch) => {
        dispatch({
            type   : SET_USER_DATA,
            token,
            workingFor
        })
    }
}

export function getUserData() {
    let token = localStorage.token;
    let workingFor = localStorage.workingFor;
    let workingForId = localStorage.workingForId;
    
    return (dispatch) => {
        dispatch({
            type: GET_USER_DATA,
            token,
            workingFor,
            workingForId
        })
    }
}

export function updateWorkingForId(workingForId) {
    localStorage.setItem('workingForId', workingForId);

    return (dispatch) => {
        dispatch({
            type: UPDATE_USER_WORKINGFORID,
            workingForId
        })
    }
}