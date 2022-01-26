import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import { publicRequest } from "./requestMethods";
import { loginSuccess } from "./redux/userRedux";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";

const App = () => {
  const [values, setValues] = useState({
    mobileNo: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "mobileNo",
      type: "text",
      placeholder: "Mobile number",
      errorMessage: "mobile number should be 10 digits and no more characters",
      label: "Mobile Number",
      pattern: "[1-9]{1}[0-9]{9}",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    delete values["confirmPassword"];
    try {
      const res = await publicRequest.post("auth/register", values);
      dispatch(loginSuccess(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (e) => {
    console.log(e);
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/products/:category">
          <ProductList />
        </Route>
        <Route path="/product/:id">
          <Product />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? (
            <Redirect to="/" />
          ) : (
            <div className="app">
              <form className="Appform" onSubmit={handleSubmit}>
                <h1>Register</h1>
                {inputs.map((input) => (
                  <Register
                    key={input.id}
                    {...input}
                    value={values[input.name]}
                    onChange={onChange}
                  />
                ))}
                <button className="submitbutton">Submit</button>
              </form>
            </div>
          )}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
