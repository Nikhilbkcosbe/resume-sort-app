
import { Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { LoginEmailAction } from '../redux/actions'
import { useDispatch } from 'react-redux'
import  decodeCookie from './decodeCookie.js'


function ProtectedRoute({ path, children }) {

    const [authenticated, setAuthenticated] = useState(!!decodeCookie())
    const dispatch = useDispatch()
    if (authenticated) {
        dispatch(LoginEmailAction(authenticated?.email))
    }


    return authenticated ? (
        children
    ) : (
        <Navigate to={'/login'} />
    )
}

export default ProtectedRoute
