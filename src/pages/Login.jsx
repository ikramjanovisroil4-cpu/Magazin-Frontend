import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Yangi backend havolasi o'rnatildi
const API = window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://floor-do-kon.onrender.com';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API}/api/auth/login`, { username, password });
            
            // Token mavjudligini tekshirib keyin saqlash
            if (res.data && res.data.token) {
                localStorage.setItem('token', res.data.token);
                navigate('/');
            } else {
                alert('Xatolik: Serverdan token kelmadi.');
            }
        } catch (error) {
            console.error("Login error:", error);
            // Agar backenddan aniq xabar kelsa o'shani, aks holda default xabarni chiqaradi
            const errorMsg = error.response?.data?.message || 'Login yoki parol noto‘g‘ri';
            alert(`Xato: ${errorMsg}`);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Tizimga kirish</h2>
                <form onSubmit={handleLogin}>
                    <input 
                        type="text" 
                        placeholder="Login" 
                        className="input-field" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Parol" 
                        className="input-field" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                    <button type="submit" className="btn-primary" style={{marginTop: '20px'}}>Kirish</button>
                </form>
            </div>
        </div>
    );
};

export default Login;