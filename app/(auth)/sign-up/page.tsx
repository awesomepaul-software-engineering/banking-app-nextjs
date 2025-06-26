import React from 'react'

const SignUp = () => {
  return (
    <div className="auth-form">
      <div className="text-center mb-8">
        <h1 className="text-30 font-semibold text-gray-900 mb-2">Create Account</h1>
        <p className="text-16 text-gray-600">Join Horizon Banking today!</p>
      </div>
      
      <div className="form-item">
        <label className="form-label">Full Name</label>
        <input 
          type="text" 
          className="input-class w-full p-3" 
          placeholder="Enter your full name"
        />
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
          placeholder="Create a password"
        />
      </div>
      
      <button className="form-btn w-full p-3 mt-6">
        Create Account
      </button>
      
      <p className="text-center mt-4">
        Already have an account? <a href="/sign-in" className="form-link">Sign in</a>
      </p>
    </div>
  )
}

export default SignUp
