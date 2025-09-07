import EventForm from "./components/EventForm.jsx";
import EventRegistrations from "./components/Registrations.jsx";
import FormBuilder from "./components/FormBuilder.jsx";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Components
import NavBar from "./components/Header.jsx"; // public header
import AdminHeader from "./components/AdminHeader.jsx"; // admin header
import Home from "./pages/Home.jsx";
import EventDetails from "./components/EventDetails.jsx";
import EventRegister from "./components/EventRegister.jsx";
import Login from "./components/Login.jsx";
import Completed from "./components/Completed.jsx";
import Contact from "./pages/Contact.jsx";
import Admin from "./pages/Admin.jsx";
import Footer from "./components/Footer.jsx";
import { Scroll } from "lucide-react";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ErrorPage from "./components/ErrorPage.jsx";

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

// Layouts
const PublicLayout = ({ children }) => (
  <>
    <NavBar />
    {children}
    <Footer/>
  </>
);

const AdminLayout = ({ children }) => (
  <>
    <AdminHeader />
    {children}
  </>
);

const App = () => {

  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />
        <Route
          path="/events/:id"
          element={
            <PublicLayout>
              <EventDetails />
            </PublicLayout>
          }
        />
        <Route
          path="/events/:id/register"
          element={
            <PublicLayout>
              <EventRegister />
            </PublicLayout>
          }
        />
        <Route
          path="/completed"
          element={
            <PublicLayout>
              <Completed />
            </PublicLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <PublicLayout>
              <Contact />
            </PublicLayout>
          }
        />

        {/* Admin / Dashboard protected routes */}
        <Route
          path="/login"
          element={
            // <ProtectedRoute>
                <Login />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Admin />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/events/new"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <EventForm />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/events/:id/edit"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <EventForm />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/events/:id/registrations"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <EventRegistrations />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/events/:id/form"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <FormBuilder />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
    </div>
  );
};

export default App;
