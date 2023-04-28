import React, { lazy, Suspense } from 'react'
import { Route, Routes, Navigate, Outlet } from 'react-router-dom'


function RoutePath() {

    const Login = lazy(() => import('../pages/student_login'))
    const Register = lazy(() => import('../pages/student_register'))
    const Guest = (props) => { 
        const user = localStorage.getItem('user');
        return (
            !!user? <Navigate to="/user/dashboard"  replace /> : <Outlet /> 
          );
    }

    // const ProtectedRoute = (props) => {
    //     const user = localStorage.getItem('user');
    //     return (
    //       !!user
    //         ? <Outlet /> 
    //         : <Navigate to="/login"  replace />
    //     );
    //   }
  return (
    <Suspense >
      <Routes>
      {/* <Route path='/home' element={<Login />} /> */}
        <Route path='/' element={<Guest />}>
              <Route path="/" element={<Navigate to='/login' replace />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
        </Route>
        {/* <Route element={<ProtectedRoute />} >
            <Route path='/dashboard' element={<About />} />
        </Route> */}
      </Routes >
    </Suspense>
  )
}

export default RoutePath