import './UserDashboard.css';

function UserDashboard() {
  return (
    <div className="dashboard">
      <h1>Welcome to Your Dashboard</h1>
      <div className="dashboard-section">
        <h2>Your Spots</h2>
        {/* Render user's spots */}
      </div>
      <div className="dashboard-section">
        <h2>Your Reviews</h2>
        {/* Render user's reviews */}
      </div>
    </div>
  );
}

export default UserDashboard;