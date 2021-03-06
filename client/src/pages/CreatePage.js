import React, {useState, useContext, useEffect} from 'react'
import { AuthContext } from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'
import {useNavigate} from 'react-router-dom';

export const CreatePage = () => {
    const history = useNavigate()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [link,setLink] = useState('')

    useEffect(() => {
        window.M.updateTextFields()
    },[])
    const pressHandler = async event => {
        if (event.key === 'Enter') {
          try {
            const data = await request('/api/link/generate',  'POST', {from: link}, {
                Authorization: `Bearer ${auth.token}`
              })
              history(`/detail/${data.link._id}`, { replace: true })
            } catch (error) {
                console.log(error);                
            }
        }
    }
    return (
        <div className="row">
            <div className="col s8 offset-s2 create-page">            
            <div className="input-field">
            <input
            placeholder="Enter link" id="link" type="text"             
            value={link}
            onChange={e => setLink(e.target.value)}
            onKeyPress={pressHandler}
            />
            <label htmlFor="link">Enter link</label>
         </div> 

            </div>          
        </div>
    )
} 