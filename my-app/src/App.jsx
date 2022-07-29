import './Layout.scss';
import './crud.scss';
import './App.scss';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useNavigate,
  
} from "react-router-dom";
import Front from './Components/Front/Front';
import Back from './Components/Back/Back';
import { useEffect, useState } from 'react';
import { login, logout, authConfig } from './Functions/auth';
import axios from 'axios';


function App() {
  return (
    <BrowserRouter>
    <Routes> 
        <Route path="/" element={<Front/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/admin" element={<RequireAuth role="admin"><Back show="admin" /></RequireAuth>} />
        <Route path="/admin/products" element={<RequireAuth role="admin"><Back show="products" /></RequireAuth>} />
        <Route path="/admin/cats" element={<RequireAuth role="admin"><Back show="cats" /></RequireAuth>} />
    </Routes>
        
    </BrowserRouter>
)
}

function RequireAuth({ children, role }) {
    const [view, setView] = useState(<h2>Please wait...</h2>);
  
    useEffect(() => {
      axios.get('http://localhost:3003/login-check?role=' + role, authConfig())
        .then(res => {
          if ('ok' === res.data.msg) {
            setView(children);
          } else {
            setView(<Navigate to="/login" replace />);
          }
        })
  
    }, [children, role]);
  

    return view;
  }

 function LoginPage() {
    const navigate = useNavigate();
  
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
  
    const doLogin = () => {
      axios.post('http://localhost:3003/login', { user, pass })
        .then(res => {
          console.log(res.data);
          if ('ok' === res.data.msg) {
            login(res.data.key);
            navigate('/', { replace: true });
          }
        })
    }
    return (
        <div className="container login-container">
        <div className="row">
          <div className="col-12 login-form">
            <h2>Welcome to Siuvykla App</h2>
        <div className="login">
          <div>Username: <input className="input" type="text" value={user} onChange={e => setUser(e.target.value)}></input></div>
          <div>Password: <input className="input" type="password" value={pass} onChange={e => setPass(e.target.value)}></input></div>
          <button className="btn buttons" onClick={doLogin}>Log in</button>
          <small>name: admin,  password: 123</small><br></br>
          <small>name: user,  password: 123</small><br></br>
          </div>
        </div>
        </div>
        </div>
      );
    }
  function LogoutPage() {
    useEffect(() => logout(), []);
    return (
      <Navigate to="/login" replace />
    )
  }










  
export default App;