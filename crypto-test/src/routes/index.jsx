import React, { lazy, Suspense } from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";

function RoutePath() {
  const Login = lazy(() => import("../pages/student_login"));
  const Register = lazy(() => import("../pages/student_register"));
  const Layout = lazy(() => import("../container/layout"));
  const Dashboard = lazy(() => import("../pages/student_dashboard"));
  const PageNotFound = lazy(() => import("../pages/pagenotfound"));
  const StudentUpload1 = lazy(() => import("../pages/student-upload-l1"));
  const StudentUpload2 = lazy(() => import("../pages/student-upload-l2"));
  const RewardDocUpload = lazy(() => import("../pages/reward-doc-upload"));
  const LoanInformation = lazy(() => import("../pages/loan-info"));
  const L1verification = lazy(() => import("../pages/l1-verification"));
  const L2verification = lazy(() => import("../pages/l2-verification"));
  const Reward = lazy(() => import("../pages/reward"));
  const Loader = lazy(() => import("../components/loader"));

  const Guest = (props) => {
    const user = localStorage.getItem("user");
    return !!user ? <Navigate to="/user/dashboard" replace /> : <Outlet />;
  };

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
        <Route path="/" element={<Guest />}>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/student_upload_1" element={<StudentUpload1 />} />
          <Route path="/student_upload_2" element={<StudentUpload2 />} />
          <Route path="/reward_docs_upload" element={<RewardDocUpload />} />
          <Route path="/load_info" element={<LoanInformation />} />
          <Route path="/l1_verification" element={<L1verification />} />
          <Route path="/l2_verification" element={<L2verification />} />
          <Route path="/rewards" element={<Reward />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default RoutePath;
