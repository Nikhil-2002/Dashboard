import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "./store/store";
import UserList from "./pages/UserList/UserList";
import CreateUser from "./pages/CreateUser/CreateUser";
import UserDetails from "./pages/UserDetails/UserDetails";
import EditUser from "./pages/EditUser/EditUser";
import Navbar from "./components/layout/Navbar";
import ErrorBoundary from "./components/common/ErrorBoundary";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <ErrorBoundary>
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Navigate to="/users" replace />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/users/create" element={<CreateUser />} />
                <Route path="/users/:id" element={<UserDetails />} />
                <Route path="/users/:id/edit" element={<EditUser />} />
                <Route path="*" element={<Navigate to="/users" replace />} />
              </Routes>
            </main>
          </ErrorBoundary>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
