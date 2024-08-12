// import { CSSProperties, useState } from "react";
// import { Link, Outlet } from "react-router-dom";
import Header from "./component/Header/Header";
import BodyApp from "./component/Body/BodyApp";
import { Component, ReactNode } from "react";
import { Navigate } from "react-router-dom";
//import { Navigate } from "react-router-dom";

interface Props {}

interface State {
  isLoggedIn: boolean;
}

export interface CurrentUser {
  username: string;
  password: string;
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const jsonUser: string | null = localStorage.getItem("isLoggedIn");
    const user: CurrentUser = jsonUser !== null && JSON.parse(jsonUser);

    this.state = {
      isLoggedIn: user.username === "admin" && user.password === "123"
    };
  }

  render(): ReactNode {
    return this.state.isLoggedIn ? (
      <div className="Container">
        <header>
          <Header />
        </header>
        <aside style={{marginTop: "100px", height:"100%"}}>
          <BodyApp />
        </aside>
      </div>
    ) : (
      <Navigate to="/" />
    )
    
  }
  
}
  
  export default App;
  