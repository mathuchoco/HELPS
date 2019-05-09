import {Student} from '../model/Student';

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
    searchTerm: string
}

export interface UserProps extends UserStateProps, UserDispatchProps {

}

