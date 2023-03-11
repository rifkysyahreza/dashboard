import "./index.css";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, Redirect, Switch } from "react-router-dom";
import Baselayout from "./components/Baselayout";
import Home from "./pages/Home";
import Customer from "./pages/Customer";
import Inventory from "./pages/Inventory";
import Staff from "./pages/Staff";
import Login from "./pages/Login";
import { supabase } from "./supabaseClient";
import { route } from "./Route/Route";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="px-20">
      <Switch>
        <Route
          path={"/login"}
          render={() => {
            return <Login />;
          }}
        />
        <Route
          exact={true}
          path={"/"}
          render={() => {
            if (session) {
              return <Redirect to="/home" />;
            }

            document.title = `Login || Dashboard`;
            return <Login />;
          }}
        />

        {route ? (
          route.map((elements, index) => (
            <Route
              key={index}
              exact={elements.exact}
              path={elements.path}
              render={() => {
                if (!session) {
                  return (
                    <Redirect
                      to={{
                        pathname: "/login",
                        state: { returnUrl: window.location.pathname },
                      }}
                    />
                  );
                }
                return <Baselayout>{elements.return}</Baselayout>;
              }}
            />
          ))
        ) : (
          <h1>404 Not Found</h1>
        )}
      </Switch>
    </div>
  );
}

export default App;
