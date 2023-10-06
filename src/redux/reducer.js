import { combineReducers } from "@reduxjs/toolkit"

const initialState={
    loginEmail:'',
    projectDetails:'',
    profileDetails:'',
    language:'en'
}
const LoginEmailReducer = (state = initialState.loginEmail, action) => {
    switch (action.type) {
        case 'LoginEmail':
            return action.payload
        default:
            return state
    }
}
const ProjectDetailsReducer = (state = initialState.projectDetails, action) => {
    switch (action.type) {
        case 'ProjectDetails':
            return action.payload
        default:
            return state
    }
}
const ProfileDetailsReducer = (state = initialState.profileDetails, action) => {
    switch (action.type) {
        case 'ProfileDetails':
            return action.payload
        default:
            return state
    }
}
const LanguageChangeReducer = (state = initialState.language, action) => {
    switch (action.type) {
        case 'LANGUAGE_CHANGE':
            return action.payload
        default:
            return state
    }
}

const rootReducer = combineReducers({
    LoginEmailReduxState: LoginEmailReducer,
    ProjectDetailsReduxState: ProjectDetailsReducer,
    ProfileDetailsReduxState:ProfileDetailsReducer,
    LanguageChangeReduxState:LanguageChangeReducer

})
export default rootReducer