import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/RegisterPage";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import { asyncUnsetAuthUser } from "./states/authUser/action";
import HomePage from "./pages/HomePage";
import { useEffect } from "react";
import { asyncPreloadProcess } from "./states/isPreload/action";

function App() {
  const { authUser = null } = useSelector((states) => states);
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);
  if (authUser === null) {
    return (
      <>
        <main className=" min-h-screen  bg-yellow-300 flex justify-center items-center ">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/*" element={<LoginPage />} />
          </Routes>
        </main>
      </>
    );
  }
  return (
    <>
      <header>
        <Navbar authUser={authUser} signOut={signOut} />
      </header>
      <main className=" min-h-screen  bg-yellow-300 flex justify-center items-center">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
