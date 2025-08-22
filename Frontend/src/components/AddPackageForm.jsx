import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import "./AddPackageForm.css";
import Navbar from './RNavbar';

const PackageDashboard = () => {
  const [packages, setPackages] = useState([]);
  const [formData, setFormData] = useState({
    packageName: '',
    description: '',
    price: '',
    imageUrls: [],
  });
  const [multiPackageMode, setMultiPackageMode] = useState(false);
  const [packageTemplates, setPackageTemplates] = useState([]);

  const location = useLocation();
  const user = location.state?.user;
  const [editId, setEditId] = useState(null);
  const apiUrl = 'http://localhost:8080/api/packages';



  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const newBlobUrl = URL.createObjectURL(file);
    setImagePreviewUrl(newBlobUrl);
  }
};

// When component unmounts or new image is selected:
useEffect(() => {
  return () => {
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
    }
  };
}, [imagePreviewUrl]);

  const fetchPackages = async () => {
    try {
      const res = await axios.get(`${apiUrl}/my/${user.email}`);
      setPackages(res.data);
    } catch (err) {
      console.error('Error fetching packages:', err);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchPackages();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (multiPackageMode && packageTemplates.length > 0) {
      // Handle multiple package submission
      try {
        const responses = await Promise.all(
          packageTemplates.map(template => 
            axios.post(`${apiUrl}/add`, {
              ...template,
              userEmail: user.email,
              category: user.category
            })
          )
        );
        
        setPackageTemplates([]);
        setMultiPackageMode(false);
        fetchPackages();
        alert(`${responses.length} packages added successfully!`);
      } catch (err) {
        console.error('Error saving packages:', err);
      }
    } else {
      // Handle single package submission
      const payload = {
        ...formData,
        userEmail: user.email,
        category: user.category,
      };

      try {
        if (editId) {
          await axios.put(`${apiUrl}/edit/${editId}`, payload);
          setEditId(null);
        } else {
          await axios.post(`${apiUrl}/add`, payload);
        }

        setFormData({ packageName: '', description: '', price: '', imageUrls: [] });
        fetchPackages();
        alert('Package saved successfully!');
      } catch (err) {
        console.error('Error saving package:', err);
      }
    }
  };

  const handleAddTemplate = () => {
    if (formData.packageName && formData.description && formData.price) {
      setPackageTemplates([...packageTemplates, {...formData}]);
      setFormData({ packageName: '', description: '', price: '', imageUrls: [] });
    }
  };


  

  const handleRemoveTemplate = (index) => {
    const updatedTemplates = [...packageTemplates];
    updatedTemplates.splice(index, 1);
    setPackageTemplates(updatedTemplates);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/delete/${id}`);
      fetchPackages();
    } catch (err) {
      console.error('Error deleting package:', err);
    }
  };

  const handleEdit = (pkg) => {
    setFormData({
      packageName: pkg.packageName,
      description: pkg.description,
      price: pkg.price,
      imageUrls: pkg.imageUrls || [],
    });
    setEditId(pkg.id);
    setMultiPackageMode(false);
  };

  return (
    <div><Navbar/>
    

      
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>{editId ? 'Edit Package' : multiPackageMode ? 'Add Multiple Packages' : 'Add New Package'}</h2>
        {!editId && (
          <button 
            className={`mode-toggle ${multiPackageMode ? 'active' : ''}`}
            onClick={() => setMultiPackageMode(!multiPackageMode)}
          >
            {multiPackageMode ? 'Switch to Single Mode' : 'Switch to Multi Mode'}
          </button>
        )}
      </div>
      
      <div className="package-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Package Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Package Name"
              value={formData.packageName}
              onChange={(e) => setFormData({ ...formData, packageName: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              
            />
            
          </div>
          
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              className="form-control"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Images</label>
            <input
              type="file"
              className="form-control file-input"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files);
                const urls = files.map(file => URL.createObjectURL(file));
                setFormData({ ...formData, imageUrls: [...formData.imageUrls, ...urls] });
              }}
            />
          </div>
        
          
          
          {multiPackageMode ? (
            <div className="multi-package-actions">
              <button 
                type="button" 
                className="btn btn-add-template"
                onClick={handleAddTemplate}
              >
                Add to Batch
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={packageTemplates.length === 0}
              >
                Submit All Packages ({packageTemplates.length})
              </button>
            </div>
            
            

          ) : (
            
            <button type="submit" className="btn btn-primary">
              {editId ? 'Update' : 'Add'} Package
            </button>
          )}
        </form>

        {multiPackageMode && packageTemplates.length > 0 && (
          <div className="package-templates">
            <h4>Packages to be Added:</h4>
            <ul>
              {packageTemplates.map((template, index) => (
                <li key={index} className="template-item">
                  <div>
                    <strong>{template.packageName}</strong> - ${template.price}
                    <p>{template.description}</p>
                  </div>
                  <button 
                    className="btn btn-remove"
                    onClick={() => handleRemoveTemplate(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="packages-list-admin">
        <h3>Your Existing Packages</h3>
        {packages.length === 0 ? (
          <p className="no-packages">No packages found. Add your first package!</p>
        ) : (
          <div className="package-grid-admin">
            {packages.map((pkg) => (
              <div className="package-card-admin" key={pkg.id}>
                <h4 className="package-name">{pkg.packageName}</h4>
                <div className="package-description">
                  {pkg.description.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
                <p className="package-description">{pkg.description}</p>
                <p className="package-price">Price: ${pkg.price}</p>
                <span className="package-category">{pkg.category}</span>
                
                {pkg.imageUrls && pkg.imageUrls.length > 0 && (
                  <div className="image-gallery-admin">
                    {pkg.imageUrls.map((url, idx) => (
                      <img key={idx} src={url} alt="Package" width="100" height="100" />
                    ))}
                  </div>
                )}
                
                <div className="action-buttons">
                  <button 
                    className="btn btn-primary" 
                    onClick={() => handleEdit(pkg)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => handleDelete(pkg.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default PackageDashboard;