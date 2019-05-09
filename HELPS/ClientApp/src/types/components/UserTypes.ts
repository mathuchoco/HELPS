import {Student} from '../model/Student';

export interface UserStateProps {
    authenticated: boolean
    student?: Student
    students: Student[]
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
    searchTerm: string
}

export interface UserProps extends UserStateProps, UserDispatchProps {

}

