import {Student} from '../model/Student';
import { Search } from 'history';

export interface UserStateProps {
    authenticated: boolean
    student?: Student[]
    error?: string
    loading: boolean
}

export interface UserDispatchProps {
    loadUserDetails: () => void
    updateUser: (user: Student) => void
    submit: () => void
    loadAllUsers: () => void
}

export interface UserState {
    loadAllUsers: Student
    searchTerm: any
}

export interface UserProps extends UserStateProps, UserDispatchProps {

}

