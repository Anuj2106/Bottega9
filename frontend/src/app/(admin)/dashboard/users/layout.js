'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from '@mui/x-data-grid';

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_LINK;

// ✅ Custom Toolbar (replaces deprecated GridToolbar)
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <GridToolbarQuickFilter /> {/* 🔍 search box */}
    </GridToolbarContainer>
  );
}

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/users`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.error('Error fetching users:', err))
      .finally(() => setLoading(false));
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
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const columns = [
    { field: 'id', headerName: 'S.No', width: 80 },
    { field: 'user_name', headerName: 'Name', width: 200 },
    { field: 'user_email', headerName: 'Email', width: 250 },
    { field: 'role_name', headerName: 'Role', width: 150 },
    {
      field: 'user_status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <button
          className={`btn btn-sm ${
            params.value === 1 ? 'btn-success' : 'btn-danger'
          }`}
          onClick={() => handleToggleStatus(params.row.user_id, params.value)}
        >
          {params.value === 1 ? 'Active' : 'Inactive'}
        </button>
      ),
    },
  ];

  // ✅ Use backend `user_id` instead of index
  const rows = users.map((user, index) => ({
    id: user.user_id, // unique key
    ...user,
    serial: index + 1,
  }));

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
                  <div style={{ height: 500, width: '100%' }}>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      pageSize={5}
                      pagination
                      checkboxSelection
                      disableRowSelectionOnClick
                      slots={{ toolbar: CustomToolbar }} // ✅ new toolbar
                      loading={loading}
                    />
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
