import React from 'react'

const SignIn = () => {
  return (
    <div className="auth-form">
      <div className="text-center mb-8">
        <h1 className="text-30 font-semibold text-gray-900 mb-2">Sign In</h1>
        <p className="text-16 text-gray-600">Welcome back! Please sign in to your account.</p>
      </div>
      
      <div className="form-item">
        <label className="form-label">Email</label>
        <input 
          type="email" 
          className="input-class w-full p-3" 
          placeholder="Enter your email"
        />
      </div>
      
      <div className="form-item">
        <label className="form-label">Password</label>
        <input 
          type="password" 
          className="input-class w-full p-3" 
          placeholder="Enter your password"
        />
      </div>
      
      <button className="form-btn w-full p-3 mt-6">
        Sign In
      </button>
      
      <p className="text-center mt-4">
        Don't have an account? <a href="/sign-up" className="form-link">Sign up</a>
      </p>
    </div>
  )
}

export default SignIn
