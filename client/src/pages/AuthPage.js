import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading,request, error,clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    },[error,message,clearError])

    useEffect(() => {
        window.M.updateTextFields()
    },[])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]:event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
            console.log("data",data)
        } catch (error) {
            console.log("qwe",error)
        }
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (error) {
            
        }
    }
    return (
        <div className="row">            
            <div className="col s6 offset-s3">
                    <h1>Authorisation form</h1>
                    <div className="card blue darken-1">
                    <div className="card-content white-text">
                      <span className="card-title">Authorisation</span>
                      <div>

                        <div className="input-field">
                            <input
                            placeholder="Enter e-mail" id="email" type="text" name="email"
                            className="yellow-input"
                            value={form.email}
                            onChange={changeHandler}
                             />
                            <label htmlFor="email">Email</label>
                         </div> 

                         <div className="input-field">
                            <input
                            value={form.password}
                            placeholder="Enter password" id="password" type="password" name="password" className="yellow-input"
                            onChange={changeHandler}
                            />
                         <label htmlFor="email">Password</label>
                      </div>
                      </div>
                    </div>
                    <div className="card-action">
                        <button className="btn yellow darken-4 enter" onClick={loginHandler} disabled={loading}>Login</button>
                        <button className="btn grey lighten-1 black-text" onClick={registerHandler} disabled={loading}>Registration</button>
                    </div>
                  </div>
            </div>
        </div>
    )
} 