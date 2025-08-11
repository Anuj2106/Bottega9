'use client';
import  { useState,useEffect } from 'react';
import axios from 'axios';  
import Link from 'next/link';
import { Plus, Share2, Download , Home} from 'lucide-react';
import Swal from 'sweetalert2';
const apiUrl = process.env.NEXT_PUBLIC_BACKEND_LINK;

const Lookbook = () => {
 const [lookbooks, setLookbooks] = useState([]); // State to manage lookbooks

  // State to manage file and messages
    const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const fetchLookbooks = async () => {
    try {
      const response = await axios.get(` ${apiUrl}/api/lookbook`);
      setLookbooks(response.data.lookbooks || []);
    } catch (error) {
      console.error('Error fetching lookbooks:', error);
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to fetch lookbooks',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };
  // Call fetchLookbooks when the component mounts
  useEffect(() => {
    fetchLookbooks();
  }, []);


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);

    } else {
    
      setFile(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      Swal.fire({
        title: 'Error!',
        text: 'Please select a PDF file.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    const formData = new FormData();
    formData.append('lookbook_pdf', file);

    try {
      setLoading(true);
      const res = await axios.post(`${apiUrl}/api/lookbook/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Swal.fire({
        title: 'Success!',
        text: res.data.message || 'Lookbook has been uploaded.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
     window.location.reload();
      // Refresh the lookbooks list
      fetchLookbooks();
      setFile(null);
    } catch (error) {

      console.error('Error uploading lookbook:', error);
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to upload lookbook',
        icon: 'error',
        confirmButtonText: 'OK'
      });
     
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/api/lookbook/delete/${id}`);

      Swal.fire({
        title: 'Deleted!',
        text: response.data.message || 'Lookbook has been deleted.',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      // Refresh the lookbooks list
      fetchLookbooks();
    } catch (error) {
      console.error('Error deleting lookbook:', error);
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to delete lookbook',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }
  return (
   <>
     <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
      <div className="d-block mb-4 mb-md-0">
        <nav aria-label="breadcrumb" className="d-none d-md-inline-block">
          <ol className="breadcrumb breadcrumb-dark breadcrumb-transparent">
            <li className="breadcrumb-item">
              <a href="#">
                <Home size={16} className="icon icon-xxs" />
              </a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Volt</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              LookBook
            </li>
          </ol>
        </nav>
        <h2 className="h1"> All LookBook</h2>
        <p className="mb-0">Your web analytics dashboard template.</p>
      </div>

      <div className="btn-toolbar mb-2 mb-md-0">
        <button  type="button"
  className="btn btn-dark"
  data-bs-toggle="modal"
  data-bs-target="#addLookBookModal">
          <Plus size={16} className="me-2" />
          Add LookBook
        </button>
        <div className="btn-group ms-2 ms-lg-3">
          <button type="button" className="btn btn-sm btn-success btn-outline-gray-600">
            <Share2 size={14} className="me-1" />
            Share
          </button>
          <button type="button" className="btn btn-sm btn-primary btn-outline-gray-600">
            <Download size={14} className="me-1" />
            Export
          </button>
        </div>
      </div>
    </div>

    <div className="card border-0 shadow mb-4">
      <div className="card-header">
        <h5 className="card-header-title">LookBook List</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-centered table-nowrap mb-0" role='table'>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">File Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {lookbooks.map((lookbook, index) => (
                  <tr key={lookbook.id}>
                    <td>{index + 1}</td>
                    <td>{lookbook.file_name}</td>
                    <td>
                      <Link href={`${apiUrl}/uploads/lookbooks/${lookbook.file_name}`} target="_blank" className="btn btn-sm btn-primary">
                        View
                      </Link>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(lookbook.id)}>
                        Delete
                      </button>
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          
        </div>
        </div>

    <div className="modal fade" id="addLookBookModal" tabIndex="-1" aria-labelledby="addLookBookModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addLookBookModalLabel">Add LookBook</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
         <div className="modal-body">
  <form onSubmit={handleUpload} encType="multipart/form-data">
    <div className="mb-3">
      <label htmlFor="lookBookPdf" className="form-label">PDF</label>
      <input
        type="file"
        className="form-control"
        accept="application/pdf"
        onChange={handleFileChange}
        id="lookBookPdf"
        required
      />
    </div>

  

    {/* Submit button inside the form */}
    <div className="modal-footer">
      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Uploading...' : 'Save changes'}
      </button>
    </div>
  </form>
</div>

          
        </div>
      </div>
    </div>
   </>
  )
}

export default Lookbook;