import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Users() {
     const [users, setUser] = useState([]);

     useEffect(() => {
          axios.get('http://localhost:5050')
               .then(result => setUser(result.data))
               .catch(err => console.log(err))
     }, [])


 const handleDelete = (id) => {
  axios.delete('http://localhost:5050/deleteUser/' + id)
    .then(res => {
      setUser(users.filter(user => user._id !== id));  // update state without the deleted user
    })
    .catch(err => console.log(err));
}


     return (
          <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
               <div className="w-70 bg-white rounded p-3">
                    <div className="text-start">
                         <Link to="/create" className="btn btn-success mb-3">Add +</Link>
                    </div>
                    <table className="table">
                         <thead>
                              <tr>
                                   <th>Name</th>
                                   <th>Email</th>
                                   <th>Age</th>
                                   <th>Action</th>
                              </tr>
                         </thead>
                         <tbody>
                              {users.map((user, index) => {
                                   return (
                                        <tr key={user._id}>
                                             <td>{user.name}</td>
                                             <td>{user.email}</td>
                                             <td>{user.age}</td>
                                             <td>
                                                  <Link to={`/update/${user._id}`} className="btn btn-success mb-3 me-2">Update</Link>
                                                  <button className="btn btn-danger mb-3" 
                                                  onClick={(e)=> handleDelete(user._id) }  >Delete</button>
                                             </td>
                                        </tr>
                                   );
                              })}

                         </tbody>
                    </table>
               </div>
          </div>
     );
}

export default Users;
