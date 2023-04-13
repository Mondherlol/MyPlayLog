import React, { Suspense, useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import colors from '../../utils/style/colors'
import axios from 'axios'
import { toast } from 'react-toastify'

import { useNavigate } from 'react-router-dom'

import { LoginContext } from '../../Helper/Context'
import BgImg from '../../assets/images/background/bg_02.gif'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.background};
  background-image: url(${BgImg});
  background-size: cover;
  background-position: center;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`

const Login = () => {
  const { t } = useTranslation()
  document.title = 'MyPlayLog - ' + t('login')

  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  //useContext Logged
  const { loggedIn, setLoggedIn } = useContext(LoginContext)

  //navigate
  const navigate = useNavigate()

  // if logged in redirect to Home
  useEffect(() => {
    console.log('logged in=' + loggedIn)
    if (loggedIn) {
      navigate('/')
    }
  }, [loggedIn])

  function handleClick() {
    window.location.href = `${process.env.REACT_APP_IP_ADRESS}/api/user/auth/google/`
  }

  const login = () => {
    axios({
      method: 'post',
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: `${process.env.REACT_APP_IP_ADRESS}/api/user/login`,
    })
      .then((res) => {
        console.log(res)
        if (res.data.message === 'Successfully Authenticated') {
          console.log(res.data)
          setLoggedIn(true)
          navigate(0)
        } else if (res.data.message === 'No User Exists') {
          toast.error('Username or password incorrect', {
            position: toast.POSITION.BOTTOM_RIGHT,
            theme: 'dark',
          })
        }
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: 'dark',
        })
      })
  }

  return (
    <Wrapper>
      <div
        style={{ backgroundColor: 'rgb(8, 7, 27,.95)' }}
        className=" rounded-lg flex flex-col min-w-72 lg:w-2/5 h-fit "
      >
        <h1 className="text-center mt-10 text-3xl">{t('login')}</h1>

        <input
          placeholder="username"
          style={{ border: 'transparent' }}
          className="mt-10 ml-10 mr-10 rounded-md p-2 backdrop-blur-sm bg-white/30 text-white font-bold"
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        {/* <input placeholder='password' style={{border:'transparent'}} className='mt-10 ml-10 mr-10 rounded-md p-2 backdrop-blur-sm bg-white/30 text-white font-bold' onChange={(e)=>setLoginPassword(e.target.value)} /> */}
        <div className="relative flex flex-row">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="password"
            style={{ border: 'transparent' }}
            className="mt-10 ml-10 mr-10 rounded-md p-2 flex-1 backdrop-blur-sm bg-white/30 text-white font-bold"
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-8 top-10 h-8 w-16 bg-transparent border-none text-white"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row mt-10 ml-10 mr-10 lg:space-x-2">
          <button
            style={{ border: 'transparent', backgroundColor: colors.primary }}
            className="lg:flex-1 p-2 rounded-md font-bold cursor-pointer"
            onClick={login}
          >
            {t('login')}
          </button>
          {/* <button style={{border:'transparent'}} className='flex-1 p-2 rounded-md items-center' > <a  className='font-bold ' style={{color:colors.backgroundDerivation}} href='http://localhost:8000/api/user/auth/google/'>   <svg className="mr-2 -ml-1 w-4 h-4 mt-2 " aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg> Sign in with Google</a> </button>  */}
          {/* <a  className='flex-1 p-2 rounded-md font-bold bg-white' style={{color:colors.backgroundDerivation, justifyContent: 'center',alignItems: 'center'}} href='http://localhost:8000/api/user/auth/google/'>   <svg className="mr-2 -ml-1 w-4 h-4 mt-2 " aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg> Sign in with Google</a> */}
          {/* <a className='lg:flex-1 p-2 font-bold bg-white hover:bg-gray-200 justify-center  rounded-md mt-5 lg:mt-0' style={{color:colors.backgroundDerivation, display: 'flex', alignItems: 'center'}} href='http://localhost:8000/api/user/auth/google/' >
          <svg className=" w-4 h-4 mr-2 " aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg> 
          Sign in with Google
        </a> */}

          <button
            className="lg:flex-1 p-2 font-bold bg-white hover:bg-gray-200 justify-center rounded-md mt-5 lg:mt-0 "
            style={{
              color: colors.backgroundDerivation,
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={handleClick}
          >
            <svg
              className="w-4 h-4 mr-2"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Sign in with Google
          </button>
        </div>

        <p className="text-white  text-sm font-bold text-center mt-5 mb-6">
          You don't have an account{' '}
          <Link to="/signup">
            <span
              className=" text-normal p-1 cursor-pointer"
              style={{ color: colors.primary }}
            >
              Register?
            </span>
          </Link>{' '}
        </p>
      </div>
    </Wrapper>
  )
}

export default Login
