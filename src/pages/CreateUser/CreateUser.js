import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateUserMutation } from '../../store/api/usersApi';
import { initialUserValues, generateId } from '../../utils/validation';
import UserForm from '../../components/forms/UserForm';
import Button from '../../components/common/Button';
import './CreateUser.css';

const CreateUser = () => {
  const navigate = useNavigate();
  const [createUser, { isLoading }] = useCreateUserMutation();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Convert datetime-local strings to ISO strings for availableSlots
      const processedValues = {
        ...values,
        id: generateId(),
        availableSlots: values.availableSlots
          .filter(slot => slot) // Remove empty slots
          .map(slot => new Date(slot).toISOString()),
        skills: values.skills.filter(skill => skill.trim()), // Remove empty skills
      };

      await createUser(processedValues).unwrap();
      toast.success('User created successfully!');
      navigate('/users');
    } catch (error) {
      console.error('Failed to create user:', error);
      toast.error(error?.data?.message || 'Failed to create user');
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/users');
  };

  return (
    <div className="create-user-container">
      <div className="page-header">
        <div>
          <h1>Create New User</h1>
          <p>Fill in the form below to create a new user account</p>
        </div>
        <Button
          variant="outline"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>

      <UserForm
        initialValues={initialUserValues}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitButtonText="Create User"
      />
    </div>
  );
};

export default CreateUser;
