import React from "react";
import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/home";

// const Home = lazy(()=>import("../pages/home"));
const Loading = lazy(()=>import("../components/loading"));
const PageNotFound = lazy(()=>import("../pages/pagenotfound"));
const CreateProposal = lazy(()=>import("../pages/createproposal"));
const About = lazy(()=>import("../pages/about"));
const Layout = lazy(()=>import("../container/layout"));
const Detail = lazy(()=>import("../pages/proposalDetail"));

const RoutePath = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
            <Route path="*" element={<Layout ><PageNotFound /></Layout>} />
            <Route path="/"  element={<Navigate to="proposals" replace />}/>
            <Route path="/proposals" element={<Layout > <Home /> </Layout>} />
            <Route path="/createproposal" element={<Layout > <CreateProposal /> </Layout>} />
            <Route path="/about" element={<Layout > <About /> </Layout>} />
            <Route path="/proposaldetail" element={<Layout > <Detail /> </Layout>} />
        {/* </Route> */}
      </Routes>
    </Suspense>
  )
}

export default RoutePath;