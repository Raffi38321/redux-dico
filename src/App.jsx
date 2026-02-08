import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/RegisterPage";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import { asyncUnsetAuthUser } from "./states/authUser/action";
import HomePage from "./pages/HomePage";
import { useEffect } from "react";
import { asyncPreloadProcess } from "./states/isPreload/action";
import Footer from "./components/Footer";
import CreateThreadsPage from "./pages/CreateThreadsPage";
import LeaderBoardPage from "./pages/LeaderBoardPage";
import DetailedThreadPage from "./pages/DetailedThreadPage";
import Loading from "./components/Loading";

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
      <div>
        <Loading />

        <main className=" min-h-screen  bg-yellow-300 flex justify-center items-center ">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/*" element={<LoginPage />} />
          </Routes>
        </main>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-yellow-300 flex flex-col">
      <Loading />
      <Navbar authUser={authUser} signOut={signOut} />

      <main className="flex-1 flex justify-center">
        <div className="w-full max-w-5xl px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-thread" element={<CreateThreadsPage />} />
            <Route path="/leaderboards" element={<LeaderBoardPage />} />
            <Route path="/threads/:id" element={<DetailedThreadPage />} />
            <Route path="/*" element={<HomePage />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
