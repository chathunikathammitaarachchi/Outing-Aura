import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Star = ({ filled, onClick }) => (
  <span
    style={{
      cursor: "pointer",
      fontSize: "20px",
      color: filled ? "#FFD700" : "#ddd",
    }}
    onClick={onClick}
  >
    ★
  </span>
);

const ReviewPage = () => {
  const { state } = useLocation(); 
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [pkg, setPkg] = useState(state?.selectedPackage || null); 

  useEffect(() => {
   
    if (!pkg) {
      navigate("/"); 
    }
  }, [pkg, navigate]);

  const handleSubmit = async () => {
    if (rating === 0 || !comment.trim()) {
      alert("Please provide a rating and comment.");
      return;
    }

    try {
      const reviewData = {
        rating,
        comment,
        packageId: pkg.id,
      };

      // Send the review to the backend
      await axios.post("http://localhost:8080/api/reviews", reviewData);

      
      navigate(`/package/${pkg.id}`);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit your review. Please try again.");
    }
  };

  
  if (!pkg) {
    return <div>Package not found or data missing. Redirecting...</div>;
  }

  return (
    <div>
      <h1>Review and Rate {pkg.name}</h1>

      
      <div style={{ display: "flex", gap: "5px", marginTop: "10px" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            filled={rating >= star}
            onClick={() => setRating(star)}
          />
        ))}
      </div>

      <textarea
        placeholder="Write your comment here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={{ width: "100%", height: "100px", marginTop: "10px" }}
      ></textarea>

      <button onClick={handleSubmit}>Submit Review</button>
    </div>
  );
};

export default ReviewPage;
