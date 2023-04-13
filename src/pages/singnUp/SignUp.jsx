import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import colors from '../../utils/style/colors'
import axios from 'axios'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { LoginContext, LoginData } from '../../Helper/Context'

import { userSchema } from '../../Validation/UserValidation'
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
const InputText = styled.input``

const SignUp = () => {
  // const [signUpUsername,setSignUpUsername]=useState("")
  // const [signUpPassword,setSignUpPassword]=useState("")
  // const [signUpemail,setSignUpEmail]=useState("")
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)
  const [usernameExists, setUsernameExists] = useState(false)
  const { loggedIn, setLoggedIn } = useContext(LoginContext)
  document.title = 'MyPlayLog - ' + t('sign_up')

  const navigate = useNavigate()

  // if logged in redirect to Home
  useEffect(() => {
    console.log('logged in=' + loggedIn)
    if (loggedIn) {
      navigate('/')
    }
  }, [loggedIn])

  const register = async () => {
    let formData = {
      username: values.username,
      email: values.email,
      password: values.password,
    }

    const isValid = await userSchema.isValid(formData)
    console.log(isValid)
    if (isValid) {
      axios({
        method: 'post',
        data: formData,
        withCredentials: true,
        url: `${process.env.REACT_APP_IP_ADRESS}/api/user/register`,
      })
        .then((res) => {
          console.log(res.data)
          if (
            res.data.message === 'Username already exists' ||
            res.data.message === 'email already exists'
          ) {
            setUsernameExists(true)
            toast.error(res.data.message, {
              position: toast.POSITION.BOTTOM_RIGHT,
              theme: 'dark',
            })
          } else {
            setUsernameExists(false)
            if (res.data.message === 'User created successfully') {
              toast.success('User created successfully', {
                position: toast.POSITION.BOTTOM_RIGHT,
                theme: 'dark',
              })
              // navigate("/login")
            }
          }
        })
        .catch((err) => {
          toast.error(err.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            theme: 'dark',
          })
        })
    }
  }

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        username: '',
        email: '',
        password: '',
      },
      validationSchema: userSchema,
      onSubmit: register,
    })
  console.log(errors)

  return (
    <Wrapper>
      <div
        style={{ backgroundColor: 'rgb(8, 7, 27,.95)' }}
        className=" rounded-lg flex flex-col min-w-72 lg:w-2/5  "
      >
        <h1 className="text-center mt-10 text-3xl">Sign up</h1>
        {/* onChange={(e)=>setSignUpUsername(e.target.value)} onChange={(e)=>setSignUpEmail(e.target.value)}  onChange={(e) => setSignUpPassword(e.target.value)} */}
        <form onSubmit={handleSubmit}>
          <div className=" flex flex-col">
            <InputText
              placeholder="username"
              style={{
                border:
                  errors.username && touched.username
                    ? '1px solid red'
                    : 'transparent',
              }}
              className=" mt-6 ml-10 mr-10 rounded-md p-2 backdrop-blur-sm bg-white/30 text-white font-bold "
              id="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.username && touched.username && (
              <p className="text-red-700 ml-10">{errors.username}</p>
            )}
          </div>

          <div className=" flex flex-col">
            <InputText
              placeholder="email"
              style={{
                border:
                  errors.email && touched.email
                    ? '1px solid red'
                    : 'transparent',
              }}
              className="mt-6 ml-10 mr-10 rounded-md p-2 backdrop-blur-sm bg-white/30 text-white font-bold"
              id="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <p className="text-red-700 ml-10">{errors.email}</p>
            )}
          </div>

          <div className="relative flex flex-row">
            <InputText
              type={showPassword ? 'text' : 'password'}
              placeholder="password"
              style={{
                border:
                  errors.password && touched.password
                    ? '1px solid red'
                    : 'transparent',
              }}
              className="mt-6 ml-10 mr-10 rounded-md p-2 flex-1 backdrop-blur-sm bg-white/30 text-white font-bold"
              id="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <button
              onClick={(e) => {
                e.preventDefault()
                setShowPassword(!showPassword)
              }}
              className="absolute right-8 top-6 h-8 w-16 bg-transparent border-none text-white"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && touched.password && (
            <p className="text-red-700 ml-10">{errors.password}</p>
          )}

          {usernameExists && (
            <p className="text-white ml-10 font-bold text-center mt-5">
              Account already exists wanna{' '}
              <Link to="/login">
                <span
                  className=" text-lg cursor-pointer"
                  style={{ color: colors.primary }}
                >
                  Login?
                </span>
              </Link>{' '}
            </p>
          )}

          <div className="flex flex-col lg:flex-row mt-14 mb-10 ml-10 mr-10 lg:space-x-2">
            <button
              style={{ border: 'transparent', backgroundColor: colors.primary }}
              className="lg:flex-1 p-2 rounded-md font-bold cursor-pointer"
              type="submit"
            >
              Register
            </button>
            <a
              className="lg:flex-1 p-2 font-bold bg-white hover:bg-gray-200 justify-center  rounded-md mt-5 lg:mt-0"
              style={{
                color: colors.backgroundDerivation,
                display: 'flex',
                alignItems: 'center',
              }}
              href="http://localhost:8000/api/user/auth/google/"
            >
              <svg
                className=" w-4 h-4 mr-2 "
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
              Sign up with Google
            </a>
          </div>
        </form>
      </div>
    </Wrapper>
  )
}

export default SignUp
