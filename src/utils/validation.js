import * as Yup from 'yup';

// User validation schema
export const userValidationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be at most 50 characters')
    .required('Name is required'),
  
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
    .required('Username is required'),
  
  email: Yup.string()
    .email('Invalid email format')
    .max(100, 'Email must be at most 100 characters')
    .required('Email is required'),
  
  phone: Yup.string()
    .max(20, 'Phone must be at most 20 characters')
    .matches(/^[\+]?[\d\s\-\(\)]+$/, 'Invalid phone number format')
    .required('Phone is required'),
  
  website: Yup.string()
    .url('Invalid URL format')
    .max(100, 'Website URL must be at most 100 characters')
    .required('Website is required'),
  
  skills: Yup.array()
    .of(
      Yup.string()
        .min(2, 'Skill must be at least 2 characters')
        .max(10, 'Skill must be at most 10 characters')
    )
    .min(1, 'At least one skill is required')
    .required('Skills are required'),
  
  availableSlots: Yup.array()
    .of(
      Yup.date()
        .min(new Date(), 'Available slots must be future dates')
        .required('Date is required')
    )
    .min(1, 'At least one available slot is required')
    .required('Available slots are required'),
  
  isActive: Yup.boolean()
    .required('Active status is required'),
  
  address: Yup.object({
    street: Yup.string()
      .min(5, 'Street must be at least 5 characters')
      .max(100, 'Street must be at most 100 characters')
      .required('Street is required'),
    
    city: Yup.string()
      .min(2, 'City must be at least 2 characters')
      .max(50, 'City must be at most 50 characters')
      .required('City is required'),
    
    zipcode: Yup.string()
      .matches(/^[0-9]{5,10}$/, 'Zipcode must be 5-10 digits')
      .required('Zipcode is required'),
  }).required('Address is required'),
  
  company: Yup.object({
    name: Yup.string()
      .min(2, 'Company name must be at least 2 characters')
      .max(100, 'Company name must be at most 100 characters')
      .required('Company name is required'),
  }).required('Company is required'),
  
  role: Yup.string()
    .oneOf(['Admin', 'Editor', 'Viewer'], 'Invalid role')
    .required('Role is required'),
});

// Initial form values
export const initialUserValues = {
  name: '',
  username: '',
  email: '',
  phone: '',
  website: '',
  skills: [''],
  availableSlots: [''],
  isActive: false,
  address: {
    street: '',
    city: '',
    zipcode: '',
  },
  company: {
    name: '',
  },
  role: '',
};

// Role options
export const ROLE_OPTIONS = [
  { value: '', label: 'Select Role' },
  { value: 'Admin', label: 'Admin' },
  { value: 'Editor', label: 'Editor' },
  { value: 'Viewer', label: 'Viewer' },
];

// Active status options
export const ACTIVE_STATUS_OPTIONS = [
  { value: '', label: 'All Status' },
  { value: 'true', label: 'Active' },
  { value: 'false', label: 'Inactive' },
];

// Pagination options
export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

// Date format helper
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Generate unique ID (for new users)
export const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};
