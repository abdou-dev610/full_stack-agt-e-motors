const CONFIG = {
  BACKEND_URL: (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:5000'
    : 'https://backend-agt-e-motors.onrender.com',
  API_URL: (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:5000/api'
    : 'https://backend-agt-e-motors.onrender.com/api'
};
