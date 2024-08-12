import { Component, ReactNode, CSSProperties } from 'react'
import "./loginCSS.css"
import { Navigate } from 'react-router-dom';

const css : CSSProperties = {
  backgroundColor: "white",
  display: 'flex',
  flexDirection: 'column',
  width: '400px',
  height: 'max-content',
  gap: '16px',
  padding: "16px",
  borderRadius: "12px",
}

const input: CSSProperties = {
  backgroundColor: 'white',
  color: 'black',
  padding: '8px',
  borderRadius: '6px'
}

interface Props {}

export interface CurrentUser {
  username: string;
  password: string;
}

interface State {
  username: string;
  password: string;
  isLoggedIn: boolean
}

class Login extends Component<Props,State> {
  constructor(props: Props) {
    super(props);
    const jsonUser: string | null = localStorage.getItem("isLoggedIn");
    const user: CurrentUser = jsonUser !== null && JSON.parse(jsonUser); 

    this.state = {
      username: "",
      password: "",
      isLoggedIn: user.username === "admin" && user.password === "123"
    };
  }

  usernameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ 
      username: e.target.value });
    };

  passwordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ 
      password: e.target.value });
    };
      
  handleLogin = () => {
    if (this.state.username === "admin" && this.state.password === "123") {
      const user: CurrentUser = {
        username: this.state.username,
        password: this.state.password,
      };
      console.log(user);
      localStorage.setItem("isLoggedIn", JSON.stringify(user));
      this.setState({ isLoggedIn: true });
      return;
    }
    alert("Thông tin đăng nhập chưa đúng!");
  };

  render(): ReactNode {
    return this.state.isLoggedIn ? (
      <Navigate to={"pages"} />
    ) : (
      <div className="containerLogin" style={css}>
          <h1 style={{textAlign: "center", margin: "30px 0px"}}> Đăng Nhập</h1>
          <div style={{ display:"flex", flexDirection: "column"}}> 
            <label htmlFor="name" style={{marginBottom: "12px"}}><b>Tên Đăng Nhập</b></label>
            <input 
            id ="name"
            value={this.state.username}
            onChange={(e) => this.usernameInput(e)}
            type="text" placeholder='Username' style={input}/>
          </div>
          <div style={{display:"flex", flexDirection: "column", marginBottom: "25px"}}>
            <label htmlFor="pass" style={{marginBottom: "12px"}}><b>Mật Khẩu</b></label>
            <input 
            id="pass"
            value={this.state.password}
            onChange={(e) => this.passwordInput(e)}
            type="password" placeholder='Password' style={input}/>
          </div>
          <button style={{backgroundColor: 'blue', color:"white", marginBottom: "20px"}} onClick={this.handleLogin}>Đăng Nhập</button>
      </div>
    )
  }
  
}

export default Login
