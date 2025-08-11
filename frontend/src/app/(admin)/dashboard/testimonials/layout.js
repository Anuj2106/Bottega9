'use client';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Edit, Trash2, Video, Image, Plus, Share2, Download, Home } from 'lucide-react';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    rating: '',
    status: 1,
    image: null,
    video: null,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' || name === 'video') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) payload.append(key, value);
      });
      const res = await axios.post('http://localhost:3001/api/testimonials', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Testimonial Added',
          text: 'Testimonial added successfully!',
          timer: 2000,
          showConfirmButton: false,
        }).then(() => window.location.reload());
      }
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      Swal.fire('Error!', 'Error submitting testimonial.', 'error');
    }
  };

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/testimonials');
      setTestimonials(res.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3001/api/testimonials/${id}`);
          setTestimonials((prev) => prev.filter((t) => t.id !== id));
          Swal.fire('Deleted!', 'The testimonial has been deleted.', 'success');
        } catch (error) {
          console.error('Delete failed:', error);
          Swal.fire('Error!', 'Failed to delete testimonial.', 'error');
        }
      }
    });
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 1 ? 0 : 1;
      await axios.put(`http://localhost:3001/api/testimonials/${id}/status`, { status: newStatus });
      setTestimonials((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
      );
    } catch (error) {
      console.error('Status toggle failed:', error);
    }
  };

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
              <li className="breadcrumb-item">Dashboard</li>
              <li className="breadcrumb-item active" aria-current="page">
                Testimonials
              </li>
            </ol>
          </nav>
          <h2 className="h1">All Testimonials</h2>
          <p className="mb-0">Manage client testimonials below.</p>
        </div>

        <div className="btn-toolbar mb-2 mb-md-0">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addTestimonialModal"
          >
            <Plus size={16} className="me-2" />
            Add Testimonial
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

     
        <div className="card border-0 shadow">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0" role="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Message</th>
                    <th scope="col">Video</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {testimonials.map((t, i) => (
                    <tr key={t.id}>
                      <td>{i + 1}</td>
                      <td>
                        <img
                          src={`http://localhost:3001/uploads/images/${t.user_image}`}
                          alt="user"
                          className="rounded-circle"
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                      </td>
                      <td>{t.name}</td>
                      <td>{t.message.slice(0, 50)}...</td>
                      <td>
                        {t.video_url ? (
                          <a href={`http://localhost:3001/uploads/videos/${t.video_url}`} target="_blank" rel="noreferrer">
                            <Video size={20} />
                          </a>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td>
                        <button
                          onClick={() => toggleStatus(t.id, t.status)}
                          className={`btn btn-sm ${t.status === 1 ? 'btn-success' : 'btn-secondary'}`}
                        >
                          {t.status === 1 ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-primary me-2">
                          <Edit size={16} />
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(t.id)}>
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    

      {/* Modal */}
      <div className="modal fade" id="addTestimonialModal" tabIndex="-1" aria-labelledby="addTestimonialModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
              <div className="modal-header">
                <h5 className="modal-title" id="addTestimonialModalLabel">Add Testimonial</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" name="name" className="form-control" required onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Rating</label>
                  <input type="number" name="rating" className="form-control" min="1" max="5" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea name="message" className="form-control" rows="3" onChange={handleChange} required></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Image</label>
                  <input type="file" name="image" className="form-control" onChange={handleChange} accept="image/*" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Upload Video</label>
                  <input type="file" name="video" className="form-control" onChange={handleChange} accept="video/*" />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" className="btn btn-primary">Add Testimonial</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonials;
