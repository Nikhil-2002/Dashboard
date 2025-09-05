import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { userValidationSchema, ROLE_OPTIONS } from '../../utils/validation';
import Button from '../common/Button';
import './UserForm.css';

const UserForm = ({ 
  initialValues, 
  onSubmit, 
  isLoading = false, 
  submitButtonText = 'Submit' 
}) => {
  return (
    <div className="user-form-container">
      <Formik
        initialValues={initialValues}
        validationSchema={userValidationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, setFieldValue, isSubmitting }) => (
          <Form className="user-form">
            {/* Basic Information Section */}
            <div className="form-section">
              <h3 className="section-title">Basic Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Name <span className="required">*</span>
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className={`form-input ${
                      errors.name && touched.name ? 'error' : ''
                    }`}
                    placeholder="Enter full name"
                  />
                  {errors.name && touched.name && (
                    <div className="error-message">{errors.name}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="username" className="form-label">
                    Username <span className="required">*</span>
                  </label>
                  <Field
                    type="text"
                    id="username"
                    name="username"
                    className={`form-input ${
                      errors.username && touched.username ? 'error' : ''
                    }`}
                    placeholder="Enter username"
                  />
                  {errors.username && touched.username && (
                    <div className="error-message">{errors.username}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email <span className="required">*</span>
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className={`form-input ${
                      errors.email && touched.email ? 'error' : ''
                    }`}
                    placeholder="Enter email address"
                  />
                  {errors.email && touched.email && (
                    <div className="error-message">{errors.email}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone <span className="required">*</span>
                  </label>
                  <Field
                    type="tel"
                    id="phone"
                    name="phone"
                    className={`form-input ${
                      errors.phone && touched.phone ? 'error' : ''
                    }`}
                    placeholder="Enter phone number"
                  />
                  {errors.phone && touched.phone && (
                    <div className="error-message">{errors.phone}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="website" className="form-label">
                    Website <span className="required">*</span>
                  </label>
                  <Field
                    type="url"
                    id="website"
                    name="website"
                    className={`form-input ${
                      errors.website && touched.website ? 'error' : ''
                    }`}
                    placeholder="Enter website URL"
                  />
                  {errors.website && touched.website && (
                    <div className="error-message">{errors.website}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="role" className="form-label">
                    Role <span className="required">*</span>
                  </label>
                  <Field
                    as="select"
                    id="role"
                    name="role"
                    className={`form-input ${
                      errors.role && touched.role ? 'error' : ''
                    }`}
                  >
                    {ROLE_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                  {errors.role && touched.role && (
                    <div className="error-message">{errors.role}</div>
                  )}
                </div>
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <Field
                    type="checkbox"
                    name="isActive"
                    className="checkbox-input"
                  />
                  <span className="checkbox-text">
                    User is active <span className="required">*</span>
                  </span>
                </label>
                {errors.isActive && touched.isActive && (
                  <div className="error-message">{errors.isActive}</div>
                )}
              </div>
            </div>

            {/* Skills Section */}
            <div className="form-section">
              <h3 className="section-title">Skills</h3>
              <FieldArray name="skills">
                {({ push, remove }) => (
                  <div className="array-field">
                    {values.skills && values.skills.length > 0 ? (
                      values.skills.map((skill, index) => (
                        <div key={index} className="array-item">
                          <div className="form-group flex-grow">
                            <Field
                              name={`skills.${index}`}
                              type="text"
                              className={`form-input ${
                                errors.skills?.[index] && touched.skills?.[index]
                                  ? 'error'
                                  : ''
                              }`}
                              placeholder={`Skill ${index + 1}`}
                            />
                            {errors.skills?.[index] && touched.skills?.[index] && (
                              <div className="error-message">
                                {errors.skills[index]}
                              </div>
                            )}
                          </div>
                          <Button
                            type="button"
                            variant="danger"
                            size="small"
                            onClick={() => remove(index)}
                            disabled={values.skills.length === 1}
                          >
                            Remove
                          </Button>
                        </div>
                      ))
                    ) : (
                      <div className="empty-array">No skills added</div>
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      size="small"
                      onClick={() => push('')}
                    >
                      Add Skill
                    </Button>
                    {typeof errors.skills === 'string' && (
                      <div className="error-message">{errors.skills}</div>
                    )}
                  </div>
                )}
              </FieldArray>
            </div>

            {/* Available Slots Section */}
            <div className="form-section">
              <h3 className="section-title">Available Time Slots</h3>
              <FieldArray name="availableSlots">
                {({ push, remove }) => (
                  <div className="array-field">
                    {values.availableSlots && values.availableSlots.length > 0 ? (
                      values.availableSlots.map((slot, index) => (
                        <div key={index} className="array-item">
                          <div className="form-group flex-grow">
                            <Field
                              name={`availableSlots.${index}`}
                              type="datetime-local"
                              className={`form-input ${
                                errors.availableSlots?.[index] &&
                                touched.availableSlots?.[index]
                                  ? 'error'
                                  : ''
                              }`}
                            />
                            {errors.availableSlots?.[index] &&
                              touched.availableSlots?.[index] && (
                                <div className="error-message">
                                  {errors.availableSlots[index]}
                                </div>
                              )}
                          </div>
                          <Button
                            type="button"
                            variant="danger"
                            size="small"
                            onClick={() => remove(index)}
                            disabled={values.availableSlots.length === 1}
                          >
                            Remove
                          </Button>
                        </div>
                      ))
                    ) : (
                      <div className="empty-array">No time slots added</div>
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      size="small"
                      onClick={() => push('')}
                    >
                      Add Time Slot
                    </Button>
                    {typeof errors.availableSlots === 'string' && (
                      <div className="error-message">{errors.availableSlots}</div>
                    )}
                  </div>
                )}
              </FieldArray>
            </div>

            {/* Address Section */}
            <div className="form-section">
              <h3 className="section-title">Address</h3>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor="address.street" className="form-label">
                    Street Address <span className="required">*</span>
                  </label>
                  <Field
                    type="text"
                    id="address.street"
                    name="address.street"
                    className={`form-input ${
                      errors.address?.street && touched.address?.street
                        ? 'error'
                        : ''
                    }`}
                    placeholder="Enter street address"
                  />
                  {errors.address?.street && touched.address?.street && (
                    <div className="error-message">{errors.address.street}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="address.city" className="form-label">
                    City <span className="required">*</span>
                  </label>
                  <Field
                    type="text"
                    id="address.city"
                    name="address.city"
                    className={`form-input ${
                      errors.address?.city && touched.address?.city
                        ? 'error'
                        : ''
                    }`}
                    placeholder="Enter city"
                  />
                  {errors.address?.city && touched.address?.city && (
                    <div className="error-message">{errors.address.city}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="address.zipcode" className="form-label">
                    Zipcode <span className="required">*</span>
                  </label>
                  <Field
                    type="text"
                    id="address.zipcode"
                    name="address.zipcode"
                    className={`form-input ${
                      errors.address?.zipcode && touched.address?.zipcode
                        ? 'error'
                        : ''
                    }`}
                    placeholder="Enter zipcode"
                  />
                  {errors.address?.zipcode && touched.address?.zipcode && (
                    <div className="error-message">{errors.address.zipcode}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Company Section */}
            <div className="form-section">
              <h3 className="section-title">Company Information</h3>
              <div className="form-group">
                <label htmlFor="company.name" className="form-label">
                  Company Name <span className="required">*</span>
                </label>
                <Field
                  type="text"
                  id="company.name"
                  name="company.name"
                  className={`form-input ${
                    errors.company?.name && touched.company?.name ? 'error' : ''
                  }`}
                  placeholder="Enter company name"
                />
                {errors.company?.name && touched.company?.name && (
                  <div className="error-message">{errors.company.name}</div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-actions">
              <Button
                type="submit"
                variant="primary"
                size="large"
                loading={isLoading || isSubmitting}
                disabled={isLoading || isSubmitting}
              >
                {submitButtonText}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;
