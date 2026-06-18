import "./Admin.css";
import { Navigate } from "react-router-dom";


import { useEffect, useState } from "react";

function Admin() {


  const [requests, setRequests] = useState([]);

  useEffect(() => {

    fetch("/api/requests")
      .then(response => response.json())
      .then(data => setRequests(data));

  }, []);

  const approveRequest = async (id) => {

  await fetch(`/api/approve/${id}`, {
    method: "PUT"
  });

  window.location.reload();

  };


  const rejectRequest = async (id) => {

  await fetch(`/api/reject/${id}`, {
    method: "PUT"
  });

  window.location.reload();

  };


  const deleteUser = async (id) => {

  await fetch(`/api/delete/${id}`, {
    method: "PUT"
  });

  window.location.reload();

 }; 


  // Check if user is logged in
  if (localStorage.getItem("isLoggedIn") !== "true") {
    return <Navigate to="/login" />;
  }


  return (

    <div className="admin-container">

  	<h1 className="admin-title">
    		Student Registration Requests
  	</h1>

	<button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            window.location.href = "/login";
          }}
       >
        Logout
      </button>


  <table className="request-table">

    <thead>
      <tr>
        <th>ID</th>
        <th>Full Name</th>
        <th>Username</th>
        <th>Email</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>

      {requests.map((request) => (

        <tr key={request.id}>

          <td>{request.id}</td>
          <td>{request.full_name}</td>
          <td>{request.user_name}</td>
          <td>{request.email}</td>

          <td>
            <span className={request.status.toLowerCase()}>
              {request.status}
            </span>
          </td>

          <td>
	    {request.status === "Pending" ? (
  	    <>
            <button 
	      className="approve-btn"
	      onClick={() => approveRequest(request.id)}
	      >
              Approve
            </button>

            <button 
	      className="reject-btn"
	      onClick={() => rejectRequest(request.id)}
	      >
              Reject
            </button>
	    </>
	  ):(
	    <span> No Action</span>
	   )}
          </td>

	 <td>

        {
          request.status === "Approved" && (
            <button
              className="delete-btn"
              onClick={() => deleteUser(request.id)}
            >
              Delete User
            </button>
          )
        }

         </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>


  );

}

export default Admin;
