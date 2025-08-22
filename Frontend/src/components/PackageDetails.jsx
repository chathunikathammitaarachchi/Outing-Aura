import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PackageDetails = () => {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchPackageDetails();
    fetchReviews();
  }, [id]);

  const fetchPackageDetails = async () => {
    const res = await axios.get(`http://localhost:8080/api/packages/${id}`);
    setPkg(res.data);
  };

  const fetchReviews = async () => {
    const res = await axios.get(`http://localhost:8080/api/reviews/${id}`);
    setReviews(res.data);
  };

  const calculateAverageRating = () => {
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : 0;
  };

  return (
    <div>
      <h1>{pkg?.name}</h1>
      <p>{pkg?.description}</p>
      <p>Average Rating: {calculateAverageRating()} / 5</p>

      {}
      <div>
        {reviews.map((review) => (
          <div key={review._id}>
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageDetails;
