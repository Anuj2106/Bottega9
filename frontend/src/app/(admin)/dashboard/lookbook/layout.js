'use client';
import { useState, useEffect } from 'react';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { IconButton, Box } from '@mui/material';
import { Plus, Trash2, Download } from 'lucide-react';
import Swal from 'sweetalert2';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_LINK;

const Lookbook = () => {
  const [lookbooks, setLookbooks] = useState([]);
  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch Lookbooks
  const fetchLookbooks = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/lookbook/all`);
      setLookbooks(res.data.lookbooks || []);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message || 'Failed to fetch lookbooks',
      });
    }
  };

  useEffect(() => {
    fetchLookbooks();
  }, []);

  // ✅ Handle File Change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      setFile(null);
      Swal.fire({ icon: 'error', title: 'Only PDF files are allowed' });
    }
  };

  // ✅ Open Modal
  const handleAdd = () => {
    setFile(null);
    setShowModal(true);
  };

  // ✅ Upload Lookbook
  const handleSave = async () => {
    if (!file) {
      Swal.fire({ icon: 'error', title: 'Please select a PDF file' });
      return;
    }

    const formData = new FormData();
    formData.append('lookbook_pdf', file);

    try {
      setLoading(true);
      await axios.post(`${apiUrl}/api/lookbook/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Swal.fire({ icon: 'success', title: 'Uploaded successfully!' });
      setShowModal(false);
      fetchLookbooks();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.message || err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Lookbook
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This lookbook will be deleted permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });
    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${apiUrl}/api/lookbook/delete/${id}`);
      Swal.fire({ icon: 'success', title: 'Deleted successfully!' });
      fetchLookbooks();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.message || err.message,
      });
    }
  };

  // ✅ Table Columns
  const columns = [
    { field: 'id', headerName: '#', width: 70 },
    { field: 'file_name', headerName: 'File Name', flex: 1 },
   ,
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            color="primary"
            component="a"
            href={`${apiUrl}/uploads/lookbooks/${params.row.file_name}`}
            target="_blank"
          >
            <Download size={18} />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
            <Trash2 size={18} />
          </IconButton>
        </Box>
      ),
    },
  ];

  // ✅ Format Rows
  const rows = lookbooks.map((lb, idx) => ({
    id: lb.id,
    file_name: lb.file_name,
    uploaded_at: lb.uploaded_at,
  }));

  return (
    <div style={{ width: '100%', padding: 16 }}>
      {/* Add Lookbook Button at Top */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Lookbooks</h3>
        <button className="btn btn-primary d-flex align-items-center gap-1" onClick={handleAdd}>
          <Plus size={16} /> Add Lookbook
        </button>
      </div>

      {/* DataGrid with Search */}
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          disableRowSelectionOnClick
          autoHeight
          components={{
            Toolbar: () => <GridToolbarQuickFilter placeholder="Search…" />,
          }}
        />
      </div>

      {/* Modal for Upload */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Upload Lookbook PDF</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Select PDF File</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="application/pdf"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? 'Uploading...' : 'Upload'}
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
