import {Student} from '../../model/Student';

export interface UserState {
    isLoading: boolean,
    students?: Student[]
    error?: string
}