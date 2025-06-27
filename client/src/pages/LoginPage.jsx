import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const LoginPage = () => {
  const [currState, setCurrState] = useState('login')
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', bio: '' })
  const [isDataSubmitted, setIsDataSubmitted] = useState(false)
  const { login } = useContext(AuthContext)

  const onSubmitHandler = (event) => {
    event.preventDefault()
    if (currState === 'Sign up' && !isDataSubmitted) {
      setIsDataSubmitted(true)
      return;
    }
    login(currState === 'Sign up' ? 'signup' : 'login', formData)
  }
  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>

      {/* -----------left------------ */}
      <img src={assets.logo_big} className='w-[min(30vw,250px)]' alt="" />

      {/* -------------right------------------ */}
      <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg' action="">
        <h2 className='font-medium text-2xl flex justify-between items-center'>
          {currState}
          {isDataSubmitted && <img onClick={() => { setIsDataSubmitted(false) }}
            src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' />
          }
        </h2>

        {currState === 'Sign up' && !isDataSubmitted && (

          <input
            value={formData.fullName}
            onChange={(e) => {
              setFormData((prev) => {
                return { ...prev, fullName: e.target.value }
              })
            }}
            placeholder='Full Name' type="text" className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' required />
        )}        {!isDataSubmitted && (

          <>
            <input
              value={formData.email}
              onChange={(e) => {
                setFormData((prev) => {
                  return { ...prev, email: e.target.value }
                })
              }} type="email" placeholder='Email Address' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' />
            <input
              value={formData.password}
              onChange={(e) => {
                setFormData((prev) => {
                  return { ...prev, password: e.target.value }
                })
              }} type="password" placeholder='Password' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' />

          </>
        )}
        {
          currState === 'Sign up' && isDataSubmitted && (
            <textarea
              rows={4}
              value={formData.bio}
              onChange={(e) => {
                setFormData((prev) => {
                  return { ...prev, bio: e.target.value }
                })
              }} placeholder='Provide a short bio....' required className='p-2 
                border border-gray-500 rounded-md focus:outline-none 
                focus:ring-2 focus:ring-indigo-500' />



          )
        }
        <button type='submit' className='py-3 bg-gradient-to-r from-purple-400 to violet-600 text-white rounded-md cursor-pointer'>
          {currState == 'Sign up' ? "Create Account" : 'Login Now'}
        </button>
        <div className=' flex items-center gap-2 text-sm text-gray-500'>
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy</p>
        </div>

        <div className='flex flex-col gap-2'>
          {currState === 'Sign up' ? (
            <p className='text-sm text-gray-600 '>Already have an account?
              <span onClick={() => {
                setCurrState('Login')
                setIsDataSubmitted(false)
              }}
                className='font-medium text-violet-500 cursor-pointer'>
                {' '}Login here
              </span>
            </p>
          ) : (

            <p className='text-sm text-gray-600 '>Create an account
              <span onClick={() => {
                setCurrState('Sign up')
                setIsDataSubmitted(false)
              }}
                className='font-medium text-violet-500 cursor-pointer'>
                Click here
              </span>
            </p>
          )}

        </div>
      </form>
    </div>

  )
}

export default LoginPage