import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar.jsx";

const AddDecorationPackage = () => {
  const [packages, setPackages] = useState([]);
  const [newPackages, setNewPackages] = useState([
    { name: "", description: "", price: "", category: "Decoration", imageUrl: "", image: null },
  ]);
  const [newPackage, setNewPackage] = useState(null);

  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/api/decopackages");
      const decorationPackages = res.data.filter(pkg => pkg.category === "Decoration");
      setPackages(decorationPackages);
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (index, e) => {
    const updatedPackages = [...newPackages];
    updatedPackages[index].image = e.target.files[0];
    setNewPackages(updatedPackages);
  };

  const handlePackageChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPackages = [...newPackages];
    updatedPackages[index] = { ...updatedPackages[index], [name]: value };
    setNewPackages(updatedPackages);
  };

  const handleAddPackageRow = () => {
    setNewPackages([
      ...newPackages,
      { name: "", description: "", price: "", category: "Decoration", imageUrl: "", image: null },
    ]);
  };

  const handleAddOrUpdatePackages = async () => {
    try {
      const formDataList = newPackages.map((pkg) => {
        const formData = new FormData();
        formData.append("name", pkg.name);
        formData.append("description", pkg.description);
        formData.append("price", pkg.price);
        formData.append("category", pkg.category);
        if (pkg.image) formData.append("image", pkg.image);
        return formData;
      });

      for (const formData of formDataList) {
        await axios.post("http://localhost:8080/api/decopackages", formData);
      }

      fetchPackages();
      setNewPackages([{ name: "", description: "", price: "", category: "Decoration", imageUrl: "", image: null }]);
    } catch (error) {
      console.error("Error saving packages:", error);
      alert("Failed to save packages. Please try again.");
    }
  };

  const handleEditPackage = (pkg) => {
    setNewPackage(pkg);
    setEditingPackage(pkg);
    setImage(null);
  };

  const handleDeletePackage = async (_id) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      try {
        await axios.delete(`http://localhost:8080/api/decopackages/${_id}`);
        fetchPackages();
      } catch (error) {
        console.error("Error deleting package:", error);
        alert("Failed to delete package. Please try again.");
      }
    }
  };

  return (
    <div
      style={{
        maxWidth: "1800px",
        margin: "20px auto",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Navbar />
      <h1
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          color: "#333",
          marginBottom: "20px",
        }}
      >
        Admin Panel
      </h1>

      <h2
        style={{
          fontSize: "2rem",
          marginTop: "20px",
          color: "#555",
          textTransform: "uppercase",
          fontWeight: "bold",
        }}
      >
        {editingPackage ? "Edit Package" : "Add Multiple Decoration Packages"}
      </h2>

      {newPackages.map((pkg, index) => (
        <div key={index}>
          <input
            type="text"
            name="name"
            placeholder="Package Name"
            value={pkg.name}
            onChange={(e) => handlePackageChange(index, e)}
            style={{
              width: "100%",
              padding: "12px",
              margin: "12px 0",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
              fontSize: "1rem",
              transition: "background-color 0.3s ease",
            }}
          />
          <textarea
            name="description"
            placeholder="Description (Start with 'Included')"
            value={pkg.description}
            onChange={(e) => handlePackageChange(index, e)}
            style={{
              width: "100%",
              padding: "12px",
              margin: "12px 0",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
              fontSize: "1rem",
              height: "120px",
              transition: "background-color 0.3s ease",
            }}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={pkg.price}
            onChange={(e) => handlePackageChange(index, e)}
            style={{
              width: "100%",
              padding: "12px",
              margin: "12px 0",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
              fontSize: "1rem",
              transition: "background-color 0.3s ease",
            }}
          />
          <input
            type="file"
            onChange={(e) => handleImageChange(index, e)}
            accept="image/*"
            style={{
              marginBottom: "10px",
              padding: "12px",
              fontSize: "1rem",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            }}
          />
          {pkg.image && (
            <img
              src={URL.createObjectURL(pkg.image)}
              alt="Selected Package"
              style={{
                width: "100px",
                marginTop: "10px",
                borderRadius: "8px",
              }}
            />
          )}
        </div>
      ))}

      <button
        onClick={handleAddOrUpdatePackages}
        style={{
          padding: "12px 25px",
          marginTop: "20px",
          backgroundColor: "#008cff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "1.2rem",
          cursor: "pointer",
          transition: "background-color 0.3s ease, transform 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#008cff")}
      >
        Save All Packages
      </button>

      <button
        onClick={handleAddPackageRow}
        style={{
          padding: "12px 25px",
          marginTop: "10px",
          backgroundColor: "#0056b3",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "1.2rem",
          cursor: "pointer",
          transition: "background-color 0.3s ease, transform 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#003e75")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#0056b3")}
      >
        Add Another Package
      </button>

      <div>
        <h2
          style={{
            fontSize: "2rem",
            marginTop: "20px",
            color: "#555",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          Manage Packages
        </h2>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          packages.map((pkg) => (
            <div
              key={pkg.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#f9f9f9",
                margin: "20px",
                padding: "20px",
                borderRadius: "15px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                width: "300px",
                textAlign: "center",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 8px 12px rgba(0, 0, 0, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
              }}
            >
              <h3
                style={{
                  fontSize: "1.6rem",
                  color: "#333",
                  marginBottom: "10px",
                  textTransform: "uppercase",
                }}
              >
                {pkg.name}
              </h3>

              <div
                style={{
                  marginBottom: "15px",
                  width: "100%",
                  height: "200px",
                  overflow: "hidden",
                  borderRadius: "10px",
                }}
              >
                {pkg.imageUrl ? (
                  <img
                    src={`http://localhost:8080${pkg.imageUrl}`}
                    alt={pkg.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                ) : (
                  <span>No image available</span>
                )}
              </div>

              <p
                style={{
                  fontSize: "1.4rem",
                  color: "#008cff",
                  fontWeight: "bold",
                  marginBottom: "15px",
                }}
              >
                Package Price: LKR {pkg.price}
              </p>

              <p
                style={{
                  fontSize: "1rem",
                  color: "#555",
                  marginBottom: "15px",
                }}
              >
                Package Included: {pkg.description}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "15px",
                }}
              >
                <button
                  onClick={() => handleEditPackage(pkg)}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#008cff",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease, transform 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#008cff")}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePackage(pkg.id)}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#ff4d4d",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease, transform 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#d32f2f")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#ff4d4d")}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AddDecorationPackage;
