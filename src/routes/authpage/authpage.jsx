import { useState } from 'react'
import Image from '../../components/image/image'
import './authpage.css'
import axios from 'axios'
import { useNavigate } from 'react-router'
import useAuthStore from '../../utils/authStore'

const Authpage = () => {
    const [isRegister, setIsRegister] = useState(true)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { currentUser, setCurrentUser } = useAuthStore()


    const hanleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData)
        try {
            const res = await axios.post(`https://nestjs-peach.vercel.app/auth/${isRegister ? 'login' : 'register'}`,
                data,
                { headers: { 'Access-Control-Allow-Origin': '*' } }
            )
            //setCurrentUser({username: 'user1'})
            setCurrentUser(res.data)
            navigate('/')
        } catch (err) {
            console.log(err);
            setError(err.message)
        }
    }

    return (
        <div className="authPage">
            <div className="authContainer">
                <Image path='/general/logo.png' w={36} h={36} alt='' />
                <h1>{isRegister ? 'Create an account' : 'Login to your account'}</h1>
                {!isRegister ? (
                    <form key='register' onSubmit={hanleSubmit}>
                        <div className="formGroup">
                            <label htmlFor=''>Username</label>
                            <input type="text" placeholder='Username' required name='username' id='username' />
                        </div>
                        <div className="formGroup">
                            <label htmlFor=''>Displayname</label>
                            <input type="text" placeholder='Displayname' required name='displayname' id='displayname' />
                        </div>
                        <div className="formGroup">
                            <label htmlFor=''>Email</label>
                            <input type="text" placeholder='Email' required name='email' id='email' />
                        </div>

                        <div className="formGroup">
                            <label htmlFor=''>Password</label>
                            <input type="text" placeholder='Password' required name='password' id='password' />
                        </div>

                        <button type='submit'>Register</button>
                        <p onClick={() => setIsRegister(true)}>
                            have account:  Login
                        </p>
                        {error && <p className='error'>{error}</p>}
                    </form>
                ) : (
                    <form key='LoginForm' onSubmit={hanleSubmit}>
                        <div className="formGroup">
                            <label htmlFor=''>Username</label>
                            <input type="text" placeholder='Username' required name='username' id='username' />
                        </div>

                        <div className="formGroup">
                            <label htmlFor=''>Password</label>
                            <input type="text" placeholder='Password' required name='password' id='password' />
                        </div>

                        <button type='submit'>Login</button>
                        <p onClick={() => setIsRegister(false)}>
                            Don&apos;t have account:  Register
                        </p>
                        {error && <p className='error'>{error}</p>}
                    </form>
                )
                }
            </div>
        </div>
    )
}

export default Authpage;