import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../store/api/usersApi";
import { setFilters, setPagination } from "../../store/slices/userSlice";
import {
  ROLE_OPTIONS,
  ACTIVE_STATUS_OPTIONS,
  formatDate,
} from "../../utils/validation";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import Loading from "../../components/common/Loading";
import Pagination from "../../components/common/Pagination";
import "./UserList.css";

const UserList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { filters, pagination } = useSelector((state) => state.users);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchDebounce, setSearchDebounce] = useState("");

  // API calls
  const { data, error, isLoading } = useGetUsersQuery({
    page: pagination.currentPage,
    limit: pagination.pageSize,
    search: filters.search,
    role: filters.role,
    isActive: filters.isActive,
  });

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [updatingUserId, setUpdatingUserId] = useState(null);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setFilters({ search: searchDebounce }));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchDebounce, dispatch]);

  // Handlers
  const handleFilterChange = (field, value) => {
    dispatch(setFilters({ [field]: value }));
  };

  const handlePageChange = (page) => {
    dispatch(setPagination({ currentPage: page }));
  };

  const handlePageSizeChange = (pageSize) => {
    dispatch(setPagination({ currentPage: 1, pageSize }));
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteUser(userToDelete.id).unwrap();
      toast.success("User deleted successfully!");
      setDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const handleToggleStatus = async (user) => {
    // If deactivating an active user, show confirmation
    if (user.isActive) {
      const confirmed = window.confirm(
        `Are you sure you want to deactivate ${user.name}? This will prevent them from accessing the system.`
      );
      if (!confirmed) return;
    }

    setUpdatingUserId(user.id);

    try {
      const updatedUser = {
        ...user,
        isActive: !user.isActive,
      };

      await updateUser({ id: user.id, ...updatedUser }).unwrap();
      toast.success(
        `${user.name} ${
          updatedUser.isActive ? "activated" : "deactivated"
        } successfully!`,
        {
          icon: updatedUser.isActive ? "✓" : "⚠",
        }
      );
    } catch (error) {
      console.error("Failed to toggle user status:", error);
      toast.error("Failed to update user status");
    } finally {
      setUpdatingUserId(null);
    }
  };

  const clearAllFilters = () => {
    setSearchDebounce("");
    dispatch(setFilters({ search: "", role: "", isActive: "" }));
    dispatch(setPagination({ currentPage: 1 }));
  };

  if (isLoading) {
    return <Loading size="large" text="Loading users..." />;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Users</h2>
        <p>Failed to load users. Please try again.</p>
        <Button onClick={() => window.location.reload()}>Reload</Button>
      </div>
    );
  }

  const users = data?.users || [];
  const totalCount = data?.totalCount || 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / pagination.pageSize));

  // Debug logging
  console.log("UserList Pagination Debug:", {
    currentPage: pagination.currentPage,
    totalCount,
    totalPages,
    pageSize: pagination.pageSize,
    usersLength: users.length,
    calculatedPages: Math.ceil(totalCount / pagination.pageSize),
    isPrevDisabled: pagination.currentPage <= 1,
    isNextDisabled: pagination.currentPage >= totalPages,
  });

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <div>
          <h1>User Management</h1>
          <p>Manage your users - view, create, edit, and delete user records</p>
        </div>
        <Button variant="primary" onClick={() => navigate("/users/create")}>
          Create New User
        </Button>
      </div>

      {/* Filters */}
      <div className="filters-container">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchDebounce}
            onChange={(e) => setSearchDebounce(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <select
            value={filters.role}
            onChange={(e) => handleFilterChange("role", e.target.value)}
            className="filter-select"
          >
            {ROLE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <select
            value={filters.isActive}
            onChange={(e) => handleFilterChange("isActive", e.target.value)}
            className="filter-select"
          >
            {ACTIVE_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <Button
          variant="outline"
          onClick={clearAllFilters}
          disabled={!filters.search && !filters.role && !filters.isActive}
        >
          Clear Filters
        </Button>
      </div>

      {/* Users Table */}
      <div className="table-container">
        {users.length === 0 ? (
          <div className="no-data">
            <h3>No users found</h3>
            <p>Try adjusting your filters or create a new user.</p>
            <Button variant="primary" onClick={() => navigate("/users/create")}>
              Create New User
            </Button>
          </div>
        ) : (
          <>
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>
                    Status
                    <span
                      className="interactive-hint"
                      title="Click to toggle status"
                    >
                      ⚙️
                    </span>
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="user-name">
                      <div>
                        <div className="name">{user.name}</div>
                        <div className="company">{user.company?.name}</div>
                      </div>
                    </td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <span
                        className={`role-badge role-${user.role?.toLowerCase()}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <div className="status-cell">
                        <button
                          className={`status-toggle ${
                            user.isActive ? "active" : "inactive"
                          } ${updatingUserId === user.id ? "loading" : ""}`}
                          onClick={() => handleToggleStatus(user)}
                          disabled={updatingUserId === user.id}
                          title={
                            updatingUserId === user.id
                              ? "Updating..."
                              : `Click to ${
                                  user.isActive ? "deactivate" : "activate"
                                } user`
                          }
                        >
                          <span className="status-icon">
                            {updatingUserId === user.id ? (
                              <span className="loading-spinner-small"></span>
                            ) : user.isActive ? (
                              "✓"
                            ) : (
                              "✗"
                            )}
                          </span>
                          <span className="status-text">
                            {updatingUserId === user.id
                              ? "Updating..."
                              : user.isActive
                              ? "Active"
                              : "Inactive"}
                          </span>
                        </button>
                      </div>
                    </td>
                    <td className="actions-cell">
                      <div className="actions-group">
                        <Button
                          variant="ghost"
                          size="small"
                          onClick={() => navigate(`/users/${user.id}`)}
                        >
                          View
                        </Button>
                        <Button
                          variant="ghost"
                          size="small"
                          onClick={() => navigate(`/users/${user.id}/edit`)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="small"
                          onClick={() => handleDeleteClick(user)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={totalPages}
              totalItems={totalCount}
              itemsPerPage={pagination.pageSize}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        title="Delete User"
        size="small"
      >
        <div className="delete-modal-content">
          <p>
            Are you sure you want to delete{" "}
            <strong>{userToDelete?.name}</strong>?
          </p>
          <p className="warning-text">This action cannot be undone.</p>
          <div className="modal-actions">
            <Button
              variant="secondary"
              onClick={handleDeleteCancel}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteConfirm}
              loading={isDeleting}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserList;
