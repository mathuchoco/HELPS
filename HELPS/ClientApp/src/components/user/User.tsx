import {connect} from 'react-redux';
import * as React from 'react';
import {Component} from 'react';
import {
    UserDispatchProps,
    UserProps,
    UserState,
    UserStateProps
} from '../../types/components/UserTypes';
import {AppState} from '../../types/store/StoreTypes';
import {retrieveUser, updateUser} from '../../store/actions/UserActions';
import UserDetailsForm from './UserDetailsForm';
import Button from 'react-bootstrap/Button';
import {submit} from 'redux-form';
import {ThunkDispatch} from 'redux-thunk';

class User extends Component<UserProps, UserState> {

    constructor(props: UserProps) {
        super(props);
        this.state = {
            searchTerm: ''
        };
    }

    componentDidMount() {
        if (this.props.authenticated) {
            //this.props.loadUserDetails();
        }
        this.props.loadAllUsers();
    }
    
    SelectedStudent(){
        retrieveUser;
    }

    render() {
        let allUsers = this.props.students;
        let Search = this.state.searchTerm;
    
        if (Search.length > 0) {
            allUsers = allUsers.filter(student1 => student1.name == Search.toLowerCase() || student1.id.toString); {
                return ;
            };
        }
        return (
            <div className='row h-100 overflow-auto'>
                {this.props.error && <p>{this.props.error}</p>}
                <div className='col-lg-2 border-right m-3'>
                    {this.getDisclaimer()}
                    <Button className='w-100'
                            disabled={this.props.loading}
                            onClick={this.props.submit}>
                        Save
                    </Button>
                </div>
                <div className='col m-3'>
                    {this.getUserDetails()}
                </div>
                <div>
                    <input
                        type="text"
                        value={this.state.searchTerm}
                        ref="Search"
                        onChange={(e) => console.log(e.target.value)}
                        placeholder="Search..."
                    />
                    <button onClick={this.SelectedStudent}></button>

                </div>
                <ul>
                    {allUsers.map(user => <li>{`${user.name} [${user.id}]`}</li>)}
                </ul>
            </div>

        );

    }

    private getDisclaimer() {
        return (
            <div>
                <p>
                    The collected information (after removing any of your personal details) may also
                    be used to:
                </p>
                <ul>
                    <li>
                        analyse demographics of HELPS students and the use of HELPS programs in
                        order to find better ways to assist you; and/or,
                    </li>
                    <li>
                        report to the University community on how HELPS programs are utilised
                    </li>
                </ul>
                <p>
                    Please be advised that any information you provide:</p>
                <ul>
                    <li>
                        will be kept in the system for the purposes outlined above; and
                    </li>
                    <li>
                        will not be disclosed unless required or permitted by law.
                    </li>
                </ul>

            </div>
        );
    }

    private getUserDetails() {
        if (this.props.authenticated && this.state.selectedStudent) {
            return (
                <div className='bg-white'>
                    <UserDetailsForm onSubmit={this.props.updateUser}
                                     initialValues={this.state.selectedStudent}/>
                </div>
            );
        }

        return (
            <p>Cannot retrieve user, not authenticated...</p>
        );
    }
}

const mapStateToProps = (state: AppState): UserStateProps => ({
    authenticated: state.auth.authenticated,
    students: state.user.students,
    error: state.user.error,
    loading: state.user.isLoading
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): UserDispatchProps => ({
    loadUserDetails: () => dispatch(retrieveUser(false)),
    updateUser: student => dispatch(updateUser(student)),
    submit: () => dispatch(submit('user_details')),
    loadAllUsers: () => dispatch(retrieveUser(true))
});

export default connect<UserStateProps, UserDispatchProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(User);

