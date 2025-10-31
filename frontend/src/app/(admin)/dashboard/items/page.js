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

// 🔹 Custom Toolbar
function CustomToolbar() {
  return (
    <GridToolbarContainer style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
      <div className="d-flex gap-2">
        <button className="btn btn-sm btn-outline-secondary"><Eye size={16}/> Columns</button>
        <button className="btn btn-sm btn-outline-secondary"><ListFilter size={16}/> Filter</button>
        <button className="btn btn-sm btn-outline-secondary"><LayoutList size={16}/> Density</button>
        <button className="btn btn-sm btn-outline-secondary"><Download size={16}/> Export</button>
      </div>
      <GridToolbarQuickFilter placeholder="Search…" />
    </GridToolbarContainer>
  );
}

const Items = () => {
  const [items, setItems] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({ item_name: '', sub_id: '', status: '1' });
  const [editId, setEditId] = useState(null);

  // Fetch items + subcategories
  useEffect(() => {
    fetchItems();
    fetchSubcategories();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/items/index`, { withCredentials: true });
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching items:', err);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/subcategory`, { withCredentials: true });
      setSubcategories(res.data);
    } catch (err) {
      console.error('Error fetching subcategories:', err);
    }
  };

  // 🔹 DataGrid Columns
  const columns = [
    { field: 'id', headerName: '#', width: 70 },
    { field: 'item_name', headerName: 'Item Name', flex: 1 },
    { field: 'sub_name', headerName: 'Subcategory', flex: 1 },
    { field: 'status', headerName: 'Status', width: 120 },
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
          <IconButton color="error" onClick={() => handleDelete(params.row.item_id)}>
            <Trash2 size={18} />
          </IconButton>
        </Box>
      ),
    },
  ];

  // 🔹 Rows
  const rows = items.map((item, index) => ({
    id: index + 1,
    item_id: item.item_id,
    item_name: item.item_name,
    sub_name: item.sub_name || '-', // join from backend
    status: item.item_status === 1 ? "Active" : "Inactive",
    item_status: item.item_status,
    sub_id: item.sub_id
  }));

  // 🔹 Handlers
  const handleAddItem = () => {
    setFormData({ item_name: '', sub_id: '', status: '1' });
    setShowAddModal(true);
  };

  const handleEdit = (row) => {
    setFormData({
      item_name: row.item_name,
      sub_id: row.sub_id,
      status: row.item_status.toString(),
    });
    setEditId(row.item_id);
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      await axios.delete(`${apiUrl}/api/items/${id}`, { withCredentials: true });
      fetchItems();
      Swal.fire({ icon: 'success', title: 'Deleted!', text: 'Item deleted successfully', timer: 1500, showConfirmButton: false });
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleSave = async (type) => {
    try {
      if (type === 'add') {
        await axios.post(`${apiUrl}/api/items/add`, formData, { withCredentials: true });
        Swal.fire({ icon: 'success', title: 'Item Added!', timer: 1500, showConfirmButton: false });
      } else {
        await axios.put(`${apiUrl}/api/items/${editId}`, formData, { withCredentials: true });
        Swal.fire({ icon: 'success', title: 'Item Updated!', timer: 1500, showConfirmButton: false });
      }
      fetchItems();
      setShowAddModal(false);
      setShowEditModal(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
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
          <li className="breadcrumb-item active">Items</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Items</h3>
        <button className="btn btn-primary d-flex align-items-center gap-1" onClick={handleAddItem}>
          <Plus size={18}/> Add Item
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

      {/* Add Modal */}
      {showAddModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Item</h5>
                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Subcategory</label>
                  <select
                    className="form-select"
                    value={formData.sub_id}
                    onChange={(e) => setFormData({ ...formData, sub_id: e.target.value })}
                    required
                  >
                    <option value="">Select Subcategory</option>
                    {subcategories.map((sub) => (
                      <option key={sub.sub_id} value={sub.sub_id}>{sub.sub_name}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Item Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.item_name}
                    onChange={(e) => setFormData({ ...formData, item_name: e.target.value })}
                    required
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
                <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={() => handleSave('add')}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Item</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Subcategory</label>
                  <select
                    className="form-select"
                    value={formData.sub_id}
                    onChange={(e) => setFormData({ ...formData, sub_id: e.target.value })}
                    required
                  >
                    <option value="">Select Subcategory</option>
                    {subcategories.map((sub) => (
                      <option key={sub.sub_id} value={sub.sub_id}>{sub.sub_name}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Item Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.item_name}
                    onChange={(e) => setFormData({ ...formData, item_name: e.target.value })}
                    required
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

export default Items;
