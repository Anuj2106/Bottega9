'use client';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Edit, Trash2, Video, Image,Plus ,Share2,Download,Home} from 'lucide-react';

const Banner = () => {
      const [loading, setLoading] = useState(true);
        const [banners, setBanners] = useState([]);
          const [bannerTitle, setBannerTitle] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [bannerStatus, setBannerStatus] = useState("1");
  const [bannerPage, setBannerPage] = useState("");
  const [bannerSubhead, setBannerSubhead] = useState("");

  const fetchBanners = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/banner/allbanners', {
                    withCredentials: true,
                });
                setBanners(response.data);

                
                
              } catch (error) {
                console.error('Error fetching banners:', error);
              } finally {
                setLoading(false);
              }
            };

  const pageOptions = [
    { label: "Home", value: "Home" }, 
  { label: "All Products", value: "allproducts" },
  { label: "New Arrivals", value: "newarrivals" },
  { label: "Sofas", value: "sofas" },
  { label: "Consoles", value: "consoles" },
  { label: "Dinings", value: "dinings" },
  { label: "Coffee Tables", value: "coffeetables" },
  { label: "Bed", value: "bed" },
  { label: "Lounge", value: "lounge" },
  { label: "Collections", value: "collections" },
  { label: "Services", value: "services" },
  { label: "Our Story", value: "ourstory" },
];


    useEffect(() => {
      
      
      fetchBanners();
    }, []);
 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!mediaFile) {
    Swal.fire({
      icon: 'error',
      title: 'No File Selected',
      text: 'Please select an image or video to upload.',
    });
    return;
  }

  const formData = new FormData();
  formData.append("banner_title", bannerTitle);
  formData.append("banner_status", bannerStatus);
  formData.append("banner_page", bannerPage); // ✅ Only if your backend expects this
  formData.append("banner_subhead", bannerSubhead); // ✅ Only if your backend expects this

  const fileType = mediaFile.type;
  if (fileType.startsWith("image/")) {
    formData.append("banner_img", mediaFile);
  } else if (fileType.startsWith("video/")) {
    formData.append("banner_video", mediaFile);
  } else {
    alert("Only image or video files are allowed.");
    return;
  }

  try {
    const res = await axios.post("http://localhost:3001/api/banner/add", formData);

    if (res.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Banner Added',
        text: 'Banner added successfully!',
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        setBannerTitle("");
        setMediaFile(null);
        setBannerStatus("1");
        setBannerSubhead("");
        setBannerPage('') // if you're resetting category
        window.location.reload();
      });
    }
  } catch (err) {
    console.error("Error uploading banner:", err);
    Swal.fire({
      icon: 'error',
      title: 'Upload Failed',
      text: 'There was a problem uploading the banner.',
    });
  }
};

const handleToggleStatus = async (bannerId, currentStatus) => {
  console.log(`Toggling status for banner ID: ${bannerId}, Current Status: ${currentStatus}`);

  try {
    // Flip 1 to 0 and 0 to 1
    const updatedStatus = currentStatus === 1 ? 0 : 1;

    // Send update to backend
    await axios.put(`http://localhost:3001/api/banner/status/${bannerId}`, {
      status: updatedStatus,
    });

    // Update local state
    setBanners((prevBanners) =>
      prevBanners.map((banner) =>
        banner.banner_id === bannerId ? { ...banner, banner_status: updatedStatus } : banner
      )
    );

  } catch (error) {
    console.error("Failed to update status", error);
    alert("Something went wrong while updating status.");
  }
};

 const handleDeleteBanner = async (bannerId) => {
  try {
    axios.delete(`http://localhost:3001/api/banner/delete/${bannerId}`)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Banner Deleted',
          text: 'Banner deleted successfully!',
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          // Refresh the page after alert closes
          window.location.reload();
        });
      })
      .catch((error) => {
        console.error("Error deleting banner:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error Deleting Banner',
          text: 'There was an error deleting the banner.',
        });
      });
  } catch (error) {
    console.error("Error deleting banner:", error);
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
            <li className="breadcrumb-item">
              <a href="#">Volt</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
             Banner
            </li>
          </ol>
        </nav>
        <h2 className="h1"> All  Banners</h2>
        <p className="mb-0">Your web analytics dashboard template.</p>
      </div>

      <div className="btn-toolbar mb-2 mb-md-0">
       <button type='button'
        className="btn btn-primary mb-3"
        data-bs-toggle="modal"
        data-bs-target="#addBannerModal">
          <Plus size={16} className="me-2" />
          Add Banners
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
  {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card border-0 shadow">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0" role='table'>
                <thead>
                  <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Tittle</th>
                    <th scope='col'>Sub Tittle</th>
                    <th scope='col'>Image</th>
                    <th scope='col'>Video</th>
                    <th scope='col'>Page</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                 {
                    banners.map((banner, index) => (
                      <tr key={banner.banner_id}>
                        <td>{index + 1}</td>
                        <td>{banner.banner_title}</td>
                        <td>{banner.banner_subhead}</td>
                        <td>
                          {banner.banner_img ? (
                            <img
                              src={`http://localhost:3001/uploads/banner_media/${banner.banner_img}`}
                              alt={banner.banner_title}
                              style={{ width: '50px', height: '50px' }}
                            />
                          ) : (
                            <span>No Image</span>
                          )}
                        </td>
                        <td>
                          {banner.banner_video ? (
                            <video width="50" height="50" controls>
                              <source
                                src={`http://localhost:3001/uploads/banner_videos/${banner.banner_video}`}
                                type="video/mp4"
                              />
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <span>No Video</span>
                          )}
                        </td>
                        <td>
                          {banner.banner_page}
                        </td>
                        <td>
          <button
  className={`btn btn-sm ${banner.banner_status == 1 ? 'btn-success' : 'btn-danger'}`}
  onClick={() => handleToggleStatus(banner.banner_id, banner.banner_status)}
>
  <span>
    {banner.banner_status == 1 ? 'Active' : 'Inactive'}
  </span>
</button>


                        </td>
                        <td>
                          <button className="btn btn-sm btn-primary me-2">
                            <Edit size={16} />
                          </button>
                          <button className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteBanner(banner.banner_id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {/*  Add Banner Modal  */}
 <div className="modal fade" id="addBannerModal" tabIndex="-1">
  <div className="modal-dialog modal-lg">
    <div className="modal-content">
      <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
        <div className="modal-header">
          <h5 className="modal-title">Add Banner</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            id="addBannerModalClose"
          ></button>
        </div>

        <div className="modal-body">
          <div className="mb-3">
            <label className="form-label">Banner Title</label>
            <input
              type="text"
              className="form-control"
              value={bannerTitle}
              onChange={(e) => setBannerTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Banner Title</label>
            <input
              type="text"
              className="form-control"
              value={bannerSubhead}
              onChange={(e) => setBannerSubhead(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Image or Video</label>
            <input
              type="file"
              className="form-control"
              accept="image/*,video/*"
              onChange={(e) => setMediaFile(e.target.files[0])}
              required
            />
            <label className="form-label">Category</label>
         <select
  className="form-select"
  name="banner_page"
  value={bannerPage}
  onChange={(e) => setBannerPage(e.target.value)}
>
  <option value="">-- Select Page --</option>
  {pageOptions.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ))}
</select>

          </div>

          <div className="mb-6">

          </div>

          {/* <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              value={bannerStatus}
              onChange={(e) => setBannerStatus(e.target.value)}
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div> */}
        </div>

        <div className="modal-footer">
          <button type="submit" className="btn btn-primary">
            Save Banner
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

     
 </>
  )
}

export default Banner