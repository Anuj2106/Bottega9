'use client';
import { useState, useEffect } from 'react';
import { Home, Edit, Trash2, Plus } from 'lucide-react';
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import Swal from 'sweetalert2';
import axios from 'axios';
import { IconButton, Box } from '@mui/material';

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_LINK;

// Custom Toolbar
function CustomToolbar() {
  return (
    <GridToolbarContainer style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
      <div className="d-flex gap-2">
        <button className="btn btn-sm btn-outline-secondary"><Edit size={16}/> Columns</button>
        <button className="btn btn-sm btn-outline-secondary"><Edit size={16}/> Filter</button>
      </div>
      <GridToolbarQuickFilter placeholder="Search…" />
    </GridToolbarContainer>
  );
}

const SubCategory = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({ sub_name: '', cat_id: '', status: '1' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/category/active`, { withCredentials: true });
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/subcategory`, { withCredentials: true });
      setSubCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    { field: 'id', headerName: '#', width: 70 },
    { field: 'sub_name', headerName: 'Sub Category', flex: 1 },
    { field: 'parent_cat', headerName: 'Category', flex: 1 },
    { field: 'status', headerName: 'Status', width: 120 },
    {
      field: 'actions',
      headerName: 'Action',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton color="primary" onClick={() => handleEdit(params.row)}>
            <Edit size={18} />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row.sub_id)}>
            <Trash2 size={18} />
          </IconButton>
        </Box>
      )
    }
  ];

  const rows = subCategories.map((sub, index) => ({
    id: index + 1,
    sub_id: sub.sub_id,
    sub_name: sub.sub_name,
    parent_cat: sub.cat_name,
    status: sub.sub_status === 1 ? 'Active' : 'Inactive',
    cat_id: sub.cat_id,
    sub_status: sub.sub_status
  }));

  const handleAdd = () => {
    setFormData({ sub_name: '', cat_id: '', status: '1' });
    setShowAddModal(true);
  };

  const handleEdit = (row) => {
    setFormData({
      sub_name: row.sub_name,
      cat_id: row.cat_id,
      status: row.sub_status.toString()
    });
    setEditId(row.sub_id);
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this sub-category?')) return;
    try {
      await axios.delete(`${apiUrl}/api/subcategory/${id}`, { withCredentials: true });
      fetchSubCategories();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (type) => {
    try {
      const payload = {
        sub_name: formData.sub_name,
        cat_id: formData.cat_id,
        sub_status: parseInt(formData.status, 10)
      };

      if (!payload.cat_id || !payload.sub_name) {
        Swal.fire({ icon: 'error', title: 'All fields are required' });
        return;
      }

      if (type === 'add') {
        await axios.post(`${apiUrl}/api/subcategory/add`, payload, { withCredentials: true });
        Swal.fire({ icon: 'success', title: 'SubCategory Added', timer: 1500, showConfirmButton: false });
      } else {
        await axios.put(`${apiUrl}/api/subcategory/${editId}`, payload, { withCredentials: true });
        Swal.fire({ icon: 'success', title: 'SubCategory Updated', timer: 1500, showConfirmButton: false });
      }

      fetchSubCategories();
      setShowAddModal(false);
      setShowEditModal(false);
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err.response?.data?.error || 'Something went wrong' });
    }
  };

  return (
    <div className="container py-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Sub Categories</h3>
        <button className="btn btn-primary d-flex align-items-center gap-1" onClick={handleAdd}>
          <Plus size={18}/> Add SubCategory
        </button>
      </div>

      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5,10,20]}
          disableRowSelectionOnClick
          autoHeight
          components={{ Toolbar: CustomToolbar }}
        />
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{showAddModal ? 'Add SubCategory' : 'Edit SubCategory'}</h5>
                <button type="button" className="btn-close" onClick={() => { setShowAddModal(false); setShowEditModal(false); }}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    value={formData.cat_id}
                    onChange={(e) => setFormData({ ...formData, cat_id: e.target.value })}
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat.cat_id} value={cat.cat_id}>{cat.cat_name}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">SubCategory Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.sub_name}
                    onChange={(e) => setFormData({ ...formData, sub_name: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => { setShowAddModal(false); setShowEditModal(false); }}>Cancel</button>
                <button className={`btn ${showAddModal ? 'btn-primary' : 'btn-success'}`} onClick={() => handleSave(showAddModal ? 'add' : 'edit')}>
                  {showAddModal ? 'Save' : 'Update'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubCategory;
