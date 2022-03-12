const LOGGED_USER = 'user/LOGGED_USER';
const LOGGED_IN = 'user/LOGGED_IN';
const ACTIVE_PAGE = 'user/ACTIVE_PAGE';

export const setLoggedUser = (data) => {
    return {
        type: LOGGED_USER,
        payload: data
    }
}
export const setLoggedIn = () => {
    return {
        type: LOGGED_IN
    }
}
export const setActivePage = (page) => {
    return {
        type: ACTIVE_PAGE,
        payload: page
    }

}

const initialState = {
    loggedUser: {
        username: '',
        imageUrl: '',
        token: ''
    },
    loggedIn: false,
    activePage: null,
}
export default function userReducer(state=initialState, action){
    switch(action.type){
        case LOGGED_USER:
            return {...state, loggedUser: action.payload}
        case LOGGED_IN:
            return {...state, loggedIn: !state.loggedIn}
        case ACTIVE_PAGE:
            return {...state, activePage: action.payload}
        default: 
            return state;
    }
}

