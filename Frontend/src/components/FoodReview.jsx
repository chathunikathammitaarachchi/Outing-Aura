import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

const ReviewForm = () => {
  const location = useLocation();
  const { package: selectedPackage } = location.state || {};

  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [submittedReview, setSubmittedReview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      packageId: selectedPackage?.id,
      packageName: selectedPackage?.name,
      rating,
      comment,
      status: "pending", // for admin approval
    };

    try {
      // Send to backend
      await axios.post("http://localhost:8080/api/reviews", reviewData);

      // Show below form
      setSubmittedReview(reviewData);

      // Clear form
      setRating("");
      setComment("");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    }
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <Navbar />
      <h2>Leave a Review for: {selectedPackage?.name}</h2>
      <p>Description: {selectedPackage?.description}</p>

      <form style={{ marginTop: "20px" }} onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Rating (1-5):</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Review:</label>
          <textarea
            rows="5"
            style={{ width: "100%" }}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit Review
        </button>
      </form>

      {submittedReview && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        >
          <h3>Your Submitted Review</h3>
          <p><strong>Rating:</strong> {submittedReview.rating} / 5</p>
          <p><strong>Comment:</strong> {submittedReview.comment}</p>
          <p style={{ fontStyle: "italic", color: "orange" }}>Waiting for admin approval...</p>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;
