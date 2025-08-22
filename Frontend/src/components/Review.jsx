import { useState, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";

const Review = () => {
  const [number, setNumber] = useState(0);
  const [hoverStar, setHoverStar] = useState(undefined);
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleText = () => {
    switch (number || hoverStar) {
      case 0: return "Evaluate";
      case 1: return "Dissatisfaction";
      case 2: return "Unsatisfied";
      case 3: return "Normal";
      case 4: return "Satisfied";
      case 5: return "Very Satisfied";
      default: return "Evaluate";
    }
  };

  const handlePlaceHolder = () => {
    switch (number || hoverStar) {
      case 0: return "Comment here...";
      case 1:
      case 2:
      case 3:
      case 4: return "What is your problem?";
      case 5: return "Why do you like the product?";
      default: return "Comment here...";
    }
  };

  useEffect(() => {
    (async () => await loadComments())();
  }, []);

  async function loadComments() {
    const result = await axios.get("http://localhost:8080/api/v1/comments/getall");
    setComments(result.data);
    console.log(result.data);
  }

  async function submitComment(event) {
    event.preventDefault();
    if (!username || !comment) {
      alert("Please fill in both username and comment.");
      return;
    }
    try {
      await axios.post("http://localhost:8080/api/v1/comments/add", {
        username,
        comment,
        rating: number,
      });
      alert("Comment submitted successfully!");
      setUsername("");
      setComment("");
      setNumber(0);
      loadComments();
    } catch (err) {
      alert("Failed to submit comment.");
    }
  }

  return (
    <div className="App">
      <div className="form-and-comments">
        <div className="popup">
          <div className="content">
            <h1>ADD YOUR COMMENT FOR US</h1>
            <input
              type="text"
              className="username-input"
              placeholder="Enter your username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <div>
              <h1>{handleText()}</h1>
              {Array(5)
                .fill()
                .map((_, index) =>
                  number >= index + 1 || hoverStar >= index + 1 ? (
                    <AiFillStar
                      key={index}
                      onMouseOver={() => !number && setHoverStar(index + 1)}
                      onMouseLeave={() => setHoverStar(undefined)}
                      style={{ color: "orange" }}
                      onClick={() => setNumber(index + 1)}
                    />
                  ) : (
                    <AiOutlineStar
                      key={index}
                      onMouseOver={() => !number && setHoverStar(index + 1)}
                      onMouseLeave={() => setHoverStar(undefined)}
                      style={{ color: "orange" }}
                      onClick={() => setNumber(index + 1)}
                    />
                  )
                )}
            </div>
            <textarea
              placeholder={handlePlaceHolder()}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            ></textarea>
            <button onClick={submitComment} className={`submit ${!number && "disabled"}`}>
              Submit
            </button>
          </div>
        </div>

        <div className="comments-section">
          <h1>User Comments</h1>
          <table className="table table-dark" align="center">
            <thead>
              <tr>
                <th>Username</th>
                <th>Rating</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((commentItem, index) => (
                <tr key={commentItem._id || index}>
                  <td>{commentItem.username}</td>
                  <td>{'★'.repeat(commentItem.rating)}</td>
                  <td>{commentItem.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Use regular <style> tag */}
      <style>
        {`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: url('../../assets/images/review.jpg') no-repeat center center fixed;
          background-size: cover;
        }

        .App {
          width: 90%;
          max-width: 1200px;
          margin: 20px;
          text-align: center;
        }

        .form-and-comments {
          display: flex;
          justify-content: space-between;
        }

        .popup {
          background-color: rgba(173, 220, 251, 0.9);
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
          width: 45%;
          margin-right: 20px;
        }

        .popup h1 {
          font-size: 1.8rem;
          color: #333;
          margin-bottom: 20px;
          text-transform: uppercase;
          font-weight: bold;
        }

        .comments-section {
          background-color: rgba(173, 220, 251, 0.9);
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
          width: 50%;
        }

        .comments-section h1 {
          font-size: 1.5rem;
          color: #444;
          margin-bottom: 15px;
        }

        .table {
          width: 100%;
          border-collapse: collapse;
          border-radius: 8px;
          overflow: hidden;
        }

        .table thead {
          background-color: #333;
          color: white;
        }

        .table th,
        .table td {
          padding: 10px;
          font-size: 1rem;
        }

        .table tbody tr:nth-child(even) {
          background-color: #f2f2f2;
        }

        .username-input,
        textarea {
          width: 100%;
          max-width: 300px;
          margin: 10px auto;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
          background-color: #f8f8f8;
        }

        textarea {
          height: 100px;
          resize: none;
        }

        button.submit {
          padding: 10px 30px;
          background-color: #4CAF50;
          color: rgb(0, 0, 0);
          border: none;
          border-radius: 25px;
          font-size: 1rem;
          cursor: pointer;
          margin-top: 15px;
          transition: background-color 0.3s ease;
        }

        button.submit:hover {
          background-color: #45a049;
        }

        button.submit.disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .App {
            width: 95%;
            padding: 15px;
          }

          .form-and-comments {
            flex-direction: column;
          }

          .table th,
          .table td {
            padding: 8px;
            font-size: 0.9rem;
          }

          .popup h1,
          .comments-section h1 {
            font-size: 1.4rem;
          }
        }
        `}
      </style>
    </div>
  );
};

export default Review;
