import {Dispatch} from 'redux';
import {UserAction, UserActionType} from '../../types/store/actions/UserActionTypes';
import {Student} from '../../types/model/Student';
import {LS_STORAGE_KEY} from './AuthActions';
import index from 'react-big-calendar';

const requestUser = (): UserAction => ({
    type: UserActionType.REQUEST_USER
});

const receiveUser = (user: Student[]): UserAction => ({
    type: UserActionType.RECEIVE_USER,
    payload: user
});

const userError = (message: string): UserAction => ({
    type: UserActionType.USER_ERROR,
    payload: message
});

export const updateUser = (user: Student) => async (dispatch: Dispatch<any>) => {
    dispatch(requestUser());

    const token = localStorage.getItem(LS_STORAGE_KEY);

    if (token === null) {
        dispatch(userError('No token, have you authenticated?'));
        return;
    }

    const userResponse = await fetch('api/students', {
        method: 'PUT',
        headers: new Headers({
            'Authorization': `Bearer ${token}`,
            'content-type': 'application/json'
        }),
        body: JSON.stringify(user)
    });

    const userResult = await userResponse.json();

    if (!userResponse.ok || !userResult.id || !userResult.name) {
        dispatch(userError(userResult.message ? userResult.message : 'Update request failed'));
        return;
    }

    const student = userResult as Student;

    dispatch(receiveUser([student]));
};

export const retrieveUser = (isAdmin: boolean) => async (dispatch: Dispatch<any>) => {
    dispatch(requestUser());

    const token = localStorage.getItem(LS_STORAGE_KEY);

    if (token === null) {
        dispatch(userError('No token, have you authenticated?'));
        return;
    }

    const userResponse = await fetch('api/students', {
        headers: new Headers({
            'Authorization': `Bearer ${token}`
        })
    });

    const userResult = await userResponse.json();

    if (!userResponse.ok || !userResult.id || !userResult.name) {
        dispatch(userError(userResult.message ? userResult.message : 'Retrieve user request failed'));
        return;
    }

    const student = userResult as Student;

    if (isAdmin) {
        // TODO - Update mock server to handle this
        let dummyStudents: Student[] = Array(10).fill(student);
        dummyStudents = dummyStudents.map((dummyStudent, currentIndex) => ({
            ...dummyStudent,
            id: currentIndex
        }));
        dispatch(receiveUser(dummyStudents));
    }

    dispatch(receiveUser([student]));
};