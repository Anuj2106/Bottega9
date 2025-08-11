'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { Home, Plus, Share2, Download } from 'lucide-react';
const apiUrl = process.env.NEXT_PUBLIC_BACKEND_LINK;


const UsersTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/users`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.error('Error fetching users:', err));
  }, []);

  const handleToggleStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;

    try {
      const res = await axios.put(`${apiUrl}/api/users/status/${userId}`, {
        status: newStatus,
      });

      if (res.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.user_id === userId ? { ...user, user_status: newStatus } : user
          )
        );
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <main className="app-main">
      <div className="app-content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <h3 className="mb-0">Users</h3>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-end">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  User
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="app-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="card-title">Users List</h3>
                    
                </div>

                <div className="card-body">
                  <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover" role='table'>

                      <thead className="bg-light">
                        <tr>
                             <th scope="col">S.No</th>
    <th scope="col">User</th>
    <th scope="col">Role</th>
    <th scope="col">Status</th>
                     
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user, index) => (
                          <tr key={user.user_id}>
                            <td>{index + 1}</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="ms-3">
                                  <p className="fw-bold mb-1">{user.user_name}</p>
                                  <p className="text-muted mb-0">{user.user_email}</p>
                                </div>
                              </div>
                            </td>
                            <td>{user.role_name}</td>
                            <td>
                              <button
                                className={`btn btn-sm toggle-status ${
                                  user.user_status ==  1 ? 'btn-success' : 'btn-danger'
                                }`}
                                onClick={() => handleToggleStatus(user.user_id, user.user_status)}
                              >
                                <p className="mb-0">
                                  {user.user_status == 1 ? 'Active' : 'Inactive'}
                                </p>
                              </button>
                            </td>
                          
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UsersTable;
