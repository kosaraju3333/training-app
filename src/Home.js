import "./Home.css";
import { useState } from "react";

function Home() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    // 🔴 Password validation (frontend only)
    if (!validatePassword(formData.password)) {
      alert(
        "Password must be 8+ chars and include uppercase, lowercase, number & special character"
      );
      return;
   }

    const response = await fetch(
        "/api/register",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }
    );

    const data = await response.json();

    alert(data.message);
  };


  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return regex.test(password);
  };

  return (
    <div className="container">
      <div className="overlay">
        <div className="card">
          <h1>Student Registration</h1>
          <p>Fill in your details to access the training environment</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              onChange={handleChange}
              required
            />

	    <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              onChange={handleChange}
              required
            />

	    <input
  	      type="password"
  	      name="password"
  	      value={formData.password}
  	      onChange={handleChange}
              placeholder="Set Password"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              required
            />

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
