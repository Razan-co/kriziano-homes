import React from 'react'

import HomePage from '../components/Homepage'
import GetStarted from '../components/GetStarted'
import { useAuthStore } from '../store/authUser'

const HomeSreen = () => {
  const { user } = useAuthStore()

  return (
    <div>
          {user ? <HomePage/> : <HomePage/>}
    </div>
  )
}

export default HomeSreen
