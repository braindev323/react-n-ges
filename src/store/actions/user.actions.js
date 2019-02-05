/**
 * Description: User data actions
 * Date: 12/28/2018
 */

export const SET_USER_DATA = '[USER] SET DATA';
export const GET_USER_DATA = '[USER] GET DATA';
export const UPDATE_USER_WORKINGFORID = '[USER] UPDATE WORKINGFORID';
export const UPDATE_USER_AVATAR = '[USER] UPDATE AVATAR';

export function setUserData(user) {  
    let token = user.token;
    let workingFor = JSON.stringify(user.workingFor);
    let name = user.employeeName;
    let avatar = user.avatar;
    localStorage.setItem('token', token);
    localStorage.setItem('workingFor', workingFor);
    localStorage.setItem('username', name);
    localStorage.setItem('avatar', avatar);
    
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
    let isEmployee = localStorage.isEmployee
    let avatar = localStorage.avatar
    
    return (dispatch) => {
        dispatch({
            type: GET_USER_DATA,
            token,
            workingFor,
            workingForId,
            isEmployee,
            avatar
        })
    }
}

export function updateWorkingForId(data) {
    localStorage.setItem('workingForId', Number(data.workingForId));
    localStorage.setItem('isEmployee', data.isEmployee);

    return (dispatch) => {
        dispatch({
            type: UPDATE_USER_WORKINGFORID,
            workingForId: data.workingForId,
            isEmployee: data.isEmployee
        })
    }
}

export function updateAvatar(img) {
    localStorage.setItem('avatar', img);

    return (dispatch) => {
        dispatch({
            type: UPDATE_USER_AVATAR,
            avatar: img
        })
    }
}