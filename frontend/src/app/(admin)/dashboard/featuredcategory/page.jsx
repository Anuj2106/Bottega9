'use client';
import { useState, useEffect } from 'react';
import { Home, Edit, Trash2, Plus, ImageIcon } from 'lucide-react';
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import Swal from 'sweetalert2';
import axios from 'axios';
import { IconButton, Box } from '@mui/material';

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_LINK;

// 🔹 Custom Toolbar
function CustomToolbar() {
  return (
    <GridToolbarContainer style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
      <div className="d-flex gap-2">
        <button className="btn btn-sm btn-outline-secondary"><ImageIcon size={16}/> Columns</button>
      </div>
      <GridToolbarQuickFilter placeholder="Search…" />
    </GridToolbarContainer>
  );
}

const FeaturedCategory = () => {
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({ cat_id: '', image: null });
  const [editId, setEditId] = useState(null);

  // 🔹 Fetch categories & featured categories
  useEffect(() => {
    fetchCategories();
    fetchFeatured();
  }, []);

  const fetchCategories = () => {
    axios.get(`${apiUrl}/api/category`, { withCredentials: true })
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  };

  const fetchFeatured = () => {
    axios.get(`${apiUrl}/api/featured-category/index`, { withCredentials: true })
      .then(res => setFeatured(res.data))
      .catch(err => console.error(err));
  };

  // 🔹 Columns
  const columns = [
    { field: 'id', headerName: '#', width: 70 },
    { field: 'cat_name', headerName: 'Category', flex: 1 },
   { 
  field: 'image', 
  headerName: 'Image', 
  flex: 1, 
  renderCell: (params) => (
    params.value 
      ? <img 
          src={`${apiUrl}/${params.value}`} 
          alt="" 
          style={{ width: 80, height: 50, objectFit: 'cover' }} 
        /> 
      : 'No Image'
  ) 
},

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
          <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
            <Trash2 size={18} />
          </IconButton>
        </Box>
      ),
    },
  ];

  const rows = featured.map((item, index) => ({
    id: item.id,
    cat_id: item.cat_id,
    cat_name: item.cat_name,
    image: item.image_url
  }));

  // 🔹 Handlers
  const handleAdd = () => {
    setFormData({ cat_id: '', image: null });
    setShowAddModal(true);
  };

  const handleEdit = (row) => {
    setFormData({ cat_id: row.cat_id, image: null });
    setEditId(row.id);
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    if (!confirm('Are you sure you want to delete this featured category?')) return;
    axios.delete(`${apiUrl}/api/featured-category/${id}`, { withCredentials: true })
      .then(() => fetchFeatured())
      .catch(err => console.error(err));
  };

  const handleSave = (type) => {
    const payload = new FormData();
    payload.append('cat_id', formData.cat_id);
    if (formData.image) payload.append('image', formData.image);

    const request = type === 'add'
      ? axios.post(`${apiUrl}/api/featured-category/add`, payload, { withCredentials: true })
      : axios.put(`${apiUrl}/api/featured-category/${editId}`, payload, { withCredentials: true });

    request
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: type === 'add' ? 'Featured Category Added!' : 'Featured Category Updated!',
          timer: 1500,
          showConfirmButton: false
        });
        fetchFeatured();
        setShowAddModal(false);
        setShowEditModal(false);
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response?.data?.error || 'Something went wrong!'
        });
      });
  };

  return (
    <div className="container py-3">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="#"><Home size={16} /></a></li>
          <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
          <li className="breadcrumb-item active">Featured Categories</li>
        </ol>
      </nav>

      {/* Header + Add Button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Featured Categories</h3>
        <button className="btn btn-primary d-flex align-items-center gap-1" onClick={handleAdd}>
          <Plus size={18}/> Add Featured
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

      {/* 🔹 Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{showAddModal ? 'Add Featured Category' : 'Edit Featured Category'}</h5>
                <button type="button" className="btn-close" onClick={() => { setShowAddModal(false); setShowEditModal(false); }}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Select Category</label>
                  <select className="form-select"
                    value={formData.cat_id}
                    onChange={(e) => setFormData({ ...formData, cat_id: e.target.value })}
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat.cat_id} value={cat.cat_id}>{cat.cat_name}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Image</label>
                  <input type="file" className="form-control"
                    onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => { setShowAddModal(false); setShowEditModal(false); }}>Cancel</button>
                <button className="btn btn-primary" onClick={() => handleSave(showAddModal ? 'add' : 'edit')}>
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

export default FeaturedCategory;
