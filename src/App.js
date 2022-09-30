import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import Register from "./componentes/views/Auth/Register";
import Login from "./componentes/views/Auth/Login/Login";
import Tasks from "./componentes/views/Tasks/Tasks";
import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense } from "react";
import Registered from "./componentes/views/Registered";
import {Catalog} from "./componentes/prueba screening/prueba";

const Error404 = lazy(()=> import("./componentes/views/Error404"))

const RequireAuth = ({ children }) => {
  /* la prop children es el componente que va a envolver, como lo es
  en el caso de tasks, entonces si token está returna children es decir al componente 
  Tasks */
 
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  return children;
};

const pageTransition = {
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

function App() {

  const location =useLocation()

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathName}>
        <Route
          path="/"
          element={
            <RequireAuth>
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                <Tasks />
              </motion.div>
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/login"
          element={[
            <motion.div
              className="page"
              initial="out"
              animate="in"
              exit="out"
              variants={pageTransition}
            >
              <Login  />
            </motion.div>,
          ]}
        ></Route>
        <Route
          path={`/registered/:teamID`}
          element={[
            <motion.div
              className="page"
              initial="out"
              animate="in"
              exit="out"
              variants={pageTransition}
            >
              <Registered  />
            </motion.div>,
          ]}
        ></Route>
        <Route
          path="/register"
          element={[
            <motion.div
              className="page"
              initial="out"
              animate="in"
              exit="out"
              variants={pageTransition}
            >
              <Register  />
            </motion.div>,
          ]}
        ></Route>
        <Route
          path="*"
          element={[
            <motion.div
              className="page"
              initial="out"
              animate="in"
              exit="out"
              variants={pageTransition}
            >
              <Suspense fallback={<>...</>}>
              <Error404  />
              </Suspense>
            </motion.div>,
          ]}
        ></Route>

<Route
          path="/prueba"
          element={[
            <motion.div
              className="page"
              initial="out"
              animate="in"
              exit="out"
              variants={pageTransition}
            >
              <Suspense fallback={<>...</>}>
              <Catalog/>
              </Suspense>
            </motion.div>,
          ]}
        ></Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
