import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetUserByIdQuery } from '../../store/api/usersApi';
import { formatDate } from '../../utils/validation';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import './UserDetails.css';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: user, error, isLoading } = useGetUserByIdQuery(id);

  const handleBack = () => {
    navigate('/users');
  };

  const handleEdit = () => {
    navigate(`/users/${id}/edit`);
  };

  if (isLoading) {
    return <Loading size="large" text="Loading user details..." />;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading User</h2>
        <p>User not found or failed to load user details.</p>
        <Button onClick={handleBack}>Back to Users</Button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="error-container">
        <h2>User Not Found</h2>
        <p>The requested user could not be found.</p>
        <Button onClick={handleBack}>Back to Users</Button>
      </div>
    );
  }

  return (
    <div className="user-details-container">
      <div className="page-header">
        <div>
          <h1>{user.name}</h1>
          <p>User Details and Information</p>
        </div>
        <div className="header-actions">
          <Button variant="outline" onClick={handleBack}>
            Back to Users
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Edit User
          </Button>
        </div>
      </div>

      <div className="user-details-content">
        {/* Basic Information Card */}
        <div className="details-card">
          <div className="card-header">
            <h3>Basic Information</h3>
            <div className="status-indicators">
              <span className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}>
                {user.isActive ? 'Active' : 'Inactive'}
              </span>
              <span className={`role-badge role-${user.role?.toLowerCase()}`}>
                {user.role}
              </span>
            </div>
          </div>
          <div className="card-body">
            <div className="info-grid">
              <div className="info-item">
                <label>Full Name:</label>
                <span>{user.name}</span>
              </div>
              <div className="info-item">
                <label>Username:</label>
                <span>{user.username}</span>
              </div>
              <div className="info-item">
                <label>Email:</label>
                <span>
                  <a href={`mailto:${user.email}`} className="link">
                    {user.email}
                  </a>
                </span>
              </div>
              <div className="info-item">
                <label>Phone:</label>
                <span>
                  <a href={`tel:${user.phone}`} className="link">
                    {user.phone}
                  </a>
                </span>
              </div>
              <div className="info-item">
                <label>Website:</label>
                <span>
                  <a 
                    href={user.website} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="link"
                  >
                    {user.website}
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Card */}
        <div className="details-card">
          <div className="card-header">
            <h3>Skills</h3>
          </div>
          <div className="card-body">
            {user.skills && user.skills.length > 0 ? (
              <div className="skills-list">
                {user.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="no-data">No skills listed</p>
            )}
          </div>
        </div>

        {/* Available Time Slots Card */}
        <div className="details-card">
          <div className="card-header">
            <h3>Available Time Slots</h3>
          </div>
          <div className="card-body">
            {user.availableSlots && user.availableSlots.length > 0 ? (
              <div className="slots-list">
                {user.availableSlots.map((slot, index) => (
                  <div key={index} className="slot-item">
                    <div className="slot-date">
                      {formatDate(slot)}
                    </div>
                    <div className="slot-status">
                      {new Date(slot) > new Date() ? (
                        <span className="status-future">Upcoming</span>
                      ) : (
                        <span className="status-past">Past</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">No available time slots</p>
            )}
          </div>
        </div>

        {/* Address Card */}
        <div className="details-card">
          <div className="card-header">
            <h3>Address</h3>
          </div>
          <div className="card-body">
            {user.address ? (
              <div className="address-info">
                <div className="address-line">{user.address.street}</div>
                <div className="address-line">
                  {user.address.city}, {user.address.zipcode}
                </div>
              </div>
            ) : (
              <p className="no-data">No address information</p>
            )}
          </div>
        </div>

        {/* Company Card */}
        <div className="details-card">
          <div className="card-header">
            <h3>Company Information</h3>
          </div>
          <div className="card-body">
            {user.company ? (
              <div className="company-info">
                <div className="info-item">
                  <label>Company Name:</label>
                  <span>{user.company.name}</span>
                </div>
              </div>
            ) : (
              <p className="no-data">No company information</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
