import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetUserByIdQuery, useUpdateUserMutation } from '../../store/api/usersApi';
import { initialUserValues } from '../../utils/validation';
import UserForm from '../../components/forms/UserForm';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import './EditUser.css';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: user, error, isLoading: isLoadingUser } = useGetUserByIdQuery(id);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  // Convert user data to form values
  const formInitialValues = useMemo(() => {
    if (!user) return initialUserValues;

    return {
      ...user,
      skills: user.skills && user.skills.length > 0 ? user.skills : [''],
      availableSlots: user.availableSlots && user.availableSlots.length > 0 
        ? user.availableSlots.map(slot => {
            // Convert ISO string to datetime-local format
            const date = new Date(slot);
            return date.toISOString().slice(0, 16);
          })
        : [''],
      address: user.address || {
        street: '',
        city: '',
        zipcode: '',
      },
      company: user.company || {
        name: '',
      },
    };
  }, [user]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Convert datetime-local strings to ISO strings for availableSlots
      const processedValues = {
        ...values,
        availableSlots: values.availableSlots
          .filter(slot => slot) // Remove empty slots
          .map(slot => new Date(slot).toISOString()),
        skills: values.skills.filter(skill => skill.trim()), // Remove empty skills
      };

      await updateUser({ id, ...processedValues }).unwrap();
      toast.success('User updated successfully!');
      navigate(`/users/${id}`);
    } catch (error) {
      console.error('Failed to update user:', error);
      toast.error(error?.data?.message || 'Failed to update user');
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(`/users/${id}`);
  };

  if (isLoadingUser) {
    return <Loading size="large" text="Loading user data..." />;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading User</h2>
        <p>User not found or failed to load user data for editing.</p>
        <Button onClick={() => navigate('/users')}>Back to Users</Button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="error-container">
        <h2>User Not Found</h2>
        <p>The requested user could not be found.</p>
        <Button onClick={() => navigate('/users')}>Back to Users</Button>
      </div>
    );
  }

  return (
    <div className="edit-user-container">
      <div className="page-header">
        <div>
          <h1>Edit User: {user.name}</h1>
          <p>Update user information and settings</p>
        </div>
        <Button
          variant="outline"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>

      <UserForm
        initialValues={formInitialValues}
        onSubmit={handleSubmit}
        isLoading={isUpdating}
        submitButtonText="Update User"
      />
    </div>
  );
};

export default EditUser;
