'use client';
import { useState, useEffect } from 'react';
import { Home, Edit, Trash2, Eye, ListFilter, Download, LayoutList, Plus } from 'lucide-react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import Swal from 'sweetalert2';

import axios from 'axios';
import { IconButton, Box } from '@mui/material';

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_LINK;

// 🔹 Custom Toolbar with Lucide Icons
function CustomToolbar() {
  return (
    <GridToolbarContainer style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
      {/* Left: Buttons */}
      <div className="d-flex gap-2">
        <button className="btn btn-sm btn-outline-secondary"><Eye size={16}/> Columns</button>
        <button className="btn btn-sm btn-outline-secondary"><ListFilter size={16}/> Filter</button>
        <button className="btn btn-sm btn-outline-secondary"><LayoutList size={16}/> Density</button>
        <button className="btn btn-sm btn-outline-secondary"><Download size={16}/> Export</button>
      </div>
      {/* Right: Search */}
      <GridToolbarQuickFilter placeholder="Search…" />
    </GridToolbarContainer>
  );
}

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({ cat_name: '', status: 'Active' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/category`, { withCredentials: true });
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // 🔹 Columns
  const columns = [
    { field: 'id', headerName: '#', width: 70 },
    { field: 'cat_name', headerName: 'Name', flex: 1 },
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
          <IconButton color="error" onClick={() => handleDelete(params.row.cat_id)}>
            <Trash2 size={18} />
          </IconButton>
        </Box>
      ),
    },
  ];

  // 🔹 Rows
// 🔹 Rows (show Active/Inactive in table)
const rows = categories.map((cat, index) => ({
  id: index + 1,
  cat_id: cat.cat_id,
  cat_name: cat.cat_name,
  status: cat.cat_status === 1 ? "Active" : "Inactive", 
  cat_status: cat.cat_status // keep raw value too 👈
}));


  // 🔹 Add/Edit Handlers
  const handleAddCategory = () => {
    setFormData({ cat_name: '', status: 'Active' });
    setShowAddModal(true);
  };

  const handleEdit = (row) => {
    setFormData({ cat_name: row.cat_name, status: row.cat_status });
    setEditId(row.cat_id);
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      await axios.delete(`${apiUrl}/api/category/${id}`, { withCredentials: true });
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

 const handleSave = async (type) => {
  try {
    if (type === 'add') {
      await axios.post(`${apiUrl}/api/category/add`, formData, { withCredentials: true });
      Swal.fire({
        icon: 'success',
        title: 'Category Added!',
        text: 'The category has been added successfully.',
        timer: 1500,
        showConfirmButton: false
      });
    } else {
      await axios.put(`${apiUrl}/api/category/${editId}`, formData, { withCredentials: true });
      Swal.fire({
        icon: 'success',
        title: 'Category Updated!',
        text: 'The category has been updated successfully.',
        timer: 1500,
        showConfirmButton: false
      });
    }

    fetchCategories();
    setShowAddModal(false);
    setShowEditModal(false);
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.response?.data?.error || 'Something went wrong!',
    });
  }
};


  return (
    <div className="container py-3">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="#"><Home size={16} /></a></li>
          <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
          <li className="breadcrumb-item active">Category</li>
        </ol>
      </nav>

      {/* Header + Add Button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Categories</h3>
        <button className="btn btn-primary d-flex align-items-center gap-1" onClick={handleAddCategory}>
          <Plus size={18}/> Add Category
        </button>
      </div>

      {/* DataGrid */}
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          disableRowSelectionOnClick
          autoHeight
          components={{ Toolbar: CustomToolbar }}
        />
      </div>

      {/* 🔹 Add Category Modal */}
      {showAddModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Category</h5>
                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Category Name</label>
                  <input type="text" className="form-control"
                    value={formData.cat_name}
                    onChange={(e) => setFormData({ ...formData, cat_name: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select className="form-select"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={() => handleSave('add')}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 Edit Category Modal */}
      {showEditModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Category</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Category Name</label>
                  <input type="text" className="form-control"
                    value={formData.cat_name}
                    onChange={(e) => setFormData({ ...formData, cat_name: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select className="form-select"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button className="btn btn-success" onClick={() => handleSave('edit')}>Update</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Category;
