import "./Admin.css";

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


  return (

    <div className="admin-container">

  <h1 className="admin-title">
    Student Registration Requests
  </h1>

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

        </tr>

      ))}

    </tbody>

  </table>

</div>


  );

}

export default Admin;
