import React, {useState, useEffect} from 'react';
import {login} from '../services/Authentication/login.js'

export const AuthenticationContext = React.createContext({token:null, infoUser:null})

export function AuthenticationContextProvider({ children }) {
    const [auth, setAuth] = useState({token:null, infoUser:null})
    const [loading, setLoading] = useState(false)

    //check if user is already authenticated with token in localstorage
    useEffect(() => {
        setAuth((prev) => ({prev, token:localStorage.getItem('token')}))
    },[])

    function handleLogin({email, pass, callback}){
        setLoading(true)
        login({email:email, pass:pass})
        .then(token => {
            localStorage.setItem('token', token)
            setAuth((prev) => ({prev, token:token}))
            return callback('ok')
        })
        .catch(error => {
            return callback(error)
        })
        .finally(()=> setLoading(false))
    }

    function handleLogout(callback){
        localStorage.removeItem('token')
        setAuth((prev) => ({prev, token:null, infoUser:null}))
        return callback()
    }

    return <AuthenticationContext.Provider value = {{auth, handleLogin, loading, handleLogout}}>
        {children}
    </AuthenticationContext.Provider>
}

export default AuthenticationContext