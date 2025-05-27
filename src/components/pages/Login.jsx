import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    onLogin();
    navigate("/");
  };

  return (
    <div className="container text-center mt-4">
      <h2>Iniciar Sesión</h2>
      <button className="btn btn-primary mt-2" onClick={handleLogin}>
        Ingresar
      </button>
    </div>
  );
};

export default Login;
