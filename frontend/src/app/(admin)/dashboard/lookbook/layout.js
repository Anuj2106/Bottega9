'use client';
import { useState, useEffect } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { IconButton, Box } from '@mui/material';
import { Plus, Trash2, Edit } from 'lucide-react';
import Swal from 'sweetalert2';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_LINK;

// Custom Toolbar
function CustomToolbar({ onAdd }) {
  return (
    <GridToolbarContainer style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
      <button className="btn btn-sm btn-primary d-flex align-items-center gap-1" onClick={onAdd}>
        <Plus size={16} /> Add Lookbook
      </button>
      <GridToolbarQuickFilter placeholder="Search…" />
    </GridToolbarContainer>
  );
}

const Lookbook = () => {
  const [lookbooks, setLookbooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({ title: '', page: '', category: '' });
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const hardcodedPages = [
    { label: 'Home', value: 'home' },
    { label: 'About', value: 'about' }
  ];

  // Fetch lookbooks
  const fetchLookbooks = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/lookbook`);
      setLookbooks(res.data.lookbooks || []);
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: 'error', title: 'Error', text: err.message || 'Failed to fetch lookbooks' });
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/category/active`);
      setCategories(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLookbooks();
    fetchCategories();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      setFile(null);
      Swal.fire({ icon: 'error', title: 'Only PDF allowed' });
    }
  };

  const handleAdd = () => {
    setFormData({ title: '', page: '', category: '' });
    setFile(null);
    setEditId(null);
    setShowModal(true);
  };

  const handleEdit = (row) => {
    setFormData({ title: row.title, page: row.page, category: row.category });
    setEditId(row.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this lookbook?')) return;
    try {
      await axios.delete(`${apiUrl}/api/lookbook/delete/${id}`);
      Swal.fire({ icon: 'success', title: 'Deleted!' });
      fetchLookbooks();
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err.message });
    }
  };

  const handleSave = async () => {
    if (!formData.page || (!formData.category && formData.page !== 'home' && formData.page !== 'about')) {
      Swal.fire({ icon: 'error', title: 'Page or category is required' });
      return;
    }
    if (!file && !editId) {
      Swal.fire({ icon: 'error', title: 'Please select a PDF file' });
      return;
    }

    const payload = new FormData();
    payload.append('lookbook_pdf', file);
    payload.append('title', formData.title);
    payload.append('page', formData.page);
    if (formData.category) payload.append('category', formData.category);

    try {
      setLoading(true);
      if (editId) {
        await axios.put(`${apiUrl}/api/lookbook/${editId}`, payload, { headers: { 'Content-Type': 'multipart/form-data' } });
        Swal.fire({ icon: 'success', title: 'Updated!' });
      } else {
        await axios.post(`${apiUrl}/api/lookbook/upload`, payload, { headers: { 'Content-Type': 'multipart/form-data' } });
        Swal.fire({ icon: 'success', title: 'Uploaded!' });
      }
      setShowModal(false);
      fetchLookbooks();
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err.response?.data?.message || err.message });
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: 'id', headerName: '#', width: 70 },
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'page', headerName: 'Page', flex: 1 },
    { field: 'category', headerName: 'Category', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
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
      )
    }
  ];

  const rows = lookbooks.map((lb, idx) => ({
    id: lb.id,
    title: lb.title,
    page: lb.page,
    category: lb.category_name || '',
  }));

  return (
    <div style={{ height: 500, width: '100%', padding: 16 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5,10,20]}
        disableRowSelectionOnClick
        autoHeight
        components={{ Toolbar: () => <CustomToolbar onAdd={handleAdd} /> }}
      />

      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editId ? 'Edit Lookbook' : 'Add Lookbook'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Page / Category</label>
                  <select
                    className="form-select"
                    value={formData.page}
                    onChange={(e) => setFormData({ ...formData, page: e.target.value })}
                  >
                    <option value="">Select Page</option>
                    {hardcodedPages.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                    {categories.map(c => <option key={c.cat_id} value={c.slug}>{c.cat_name}</option>)}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">PDF</label>
                  <input type="file" className="form-control" accept="application/pdf" onChange={handleFileChange} />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSave} disabled={loading}>
                  {loading ? 'Saving...' : editId ? 'Update' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lookbook;
