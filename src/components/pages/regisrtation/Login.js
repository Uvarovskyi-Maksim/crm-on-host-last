import { useState } from "react";

const RegistrationPage = () => {

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const userRole = await getUserRole(loginData.email);
        const redirectPath = userRole === 'admin' ? `/admin` : '/manager';
        window.location.href = redirectPath;

      } else {
        alert('Login failed. Please check your credentials and try again.');
        const userRole = await getUserRole(loginData.email);
        console.log(userRole);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const getUserRole = async (email) => {
    try {
      const roleResponse = await fetch(`/api/userRole?email=${email}`);
      const { role, key, manID, manKey, nameUser } = await roleResponse.json();

      localStorage.setItem('adminKey', key);
      localStorage.setItem('managerID', manID)
      localStorage.setItem('managerKey', manKey)

      localStorage.setItem('userName', email)
      localStorage.setItem('userRole', role)
      localStorage.setItem('user', nameUser)

      console.log(key, role, manID, manKey, nameUser);
      return role;
    } catch (error) {
      console.error('Error during getUserRole:', error);
      return null;
    }
  };

  return (
    <div >
      <div className="login_form">
      {/* <h2>Login</h2>
      <form>
        <label>Email:</label>
        <input type="email" name="email" value={loginData.email} onChange={handleLoginChange} required />

        <label>Password:</label>
        <input type="password" name="password" value={loginData.password} onChange={handleLoginChange} required />

        <button type="button" onClick={handleLogin}>Login</button>
      </form> */}
      <h3 style={{textAlign:"center"}}>Войти</h3>
      <form class="form-horizontal">
      <div class="form-group">
          <label for="inputPassword" class="control-label col-xs-2">Email</label> <br />
          <div style={{marginTop:"10px"}} class="col-xs-10">
            <input type="text" name="email" value={loginData.email} onChange={handleLoginChange} class="form-control" id="inputPassword" placeholder="Email"/>
          </div>
        </div>
        <div style={{marginTop:"20px"}} class="form-group">
          <label for="inputPassword" class="control-label col-xs-2">Пароль</label>
          <div style={{marginTop:"10px"}} class="col-xs-10">
            <input type="password" name="password" value={loginData.password} onChange={handleLoginChange} class="form-control" id="inputPassword" placeholder="Пароль"/>
          </div>
        </div>
        
        <div style={{marginTop:"10px"}} class="form-group">
          <div class="col-xs-offset-2 col-xs-10">
            <button type="button" onClick={handleLogin} class="register">Войти</button>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
};

export default RegistrationPage;
