# User Management Dashboard

A modern, responsive user management dashboard built with React, Redux Toolkit, and json-server. This application allows you to create, read, update, and delete user records with comprehensive form validation, pagination, filtering, and search capabilities.

## 🚀 Features

- **Full CRUD Operations**: Create, Read, Update, and Delete users
- **Advanced Form Validation**: Comprehensive validation using Formik and Yup
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Search & Filter**: Search users by name/email, filter by role and status
- **Pagination**: Navigate through large datasets efficiently
- **Modern UI Components**: Reusable, accessible components with loading states
- **Error Handling**: Robust error handling with user-friendly messages
- **Toast Notifications**: Real-time feedback for user actions
- **Modal Confirmations**: Safe deletion with confirmation dialogs

## 🛠️ Tech Stack

- **Frontend**: React 18, JavaScript (ES6+)
- **State Management**: Redux Toolkit, RTK Query
- **Form Management**: Formik + Yup validation
- **Routing**: React Router v6
- **Styling**: CSS3 with responsive design
- **Mock Backend**: JSON Server
- **Build Tool**: Create React App
- **Notifications**: React Toastify

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 14.0 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/) (optional, for version control)

## 🔧 Installation & Setup

### 1. Clone or Download the Project

```bash
# If using Git
git clone https://github.com/Nikhil-2002/Dashboard.git
cd user-management-dashboard

# Or download and extract the ZIP file
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the JSON Server (Backend)

Open a new terminal window and run:

```bash
npm run server
or
# Start json-server on port 4000
npx json-server --watch db.json --port 4000
```

**Important**: Keep this terminal window open as it serves as your backend API.

### 4. Start the React Application

In another terminal window, run:

```bash
# Start the React development server
npm start
```

The application will automatically open in your browser at `http://localhost:3000`.

## 🔌 API Endpoints

The json-server provides the following REST API endpoints:

| Method | Endpoint     | Description                                            |
| ------ | ------------ | ------------------------------------------------------ |
| GET    | `/users`     | Get all users (supports pagination, search, filtering) |
| GET    | `/users/:id` | Get user by ID                                         |
| POST   | `/users`     | Create new user                                        |
| PATCH  | `/users/:id` | Update user by ID                                      |
| DELETE | `/users/:id` | Delete user by ID                                      |

### API Query Parameters

- `_page`: Page number for pagination
- `_limit`: Items per page
- `q`: Search query (searches name and email)
- `role`: Filter by role (Admin, Editor, Viewer)
- `isActive`: Filter by status (true/false)

## 📊 User Data Model

```javascript
{
  id: string,
  name: string,                    // 3-50 characters
  username: string,                // 3-20 characters, alphanumeric + underscore
  email: string,                   // Valid email format, max 100 characters
  phone: string,                   // Max 20 characters, phone format
  website: string,                 // Valid URL, max 100 characters
  isActive: boolean,               // Must be true to submit
  skills: string[],                // Array of 2-10 character strings
  availableSlots: string[],        // Array of future ISO date strings
  address: {
    street: string,                // 5-100 characters
    city: string,                  // 2-50 characters
    zipcode: string                // 5-10 digit string
  },
  company: {
    name: string                   // 2-100 characters
  },
  role: 'Admin' | 'Editor' | 'Viewer'
}
```

## 📱 Application Structure

```
src/
├── components/
│   ├── common/           # Reusable UI components
│   │   ├── Button.js
│   │   ├── Modal.js
│   │   ├── Loading.js
│   │   ├── Pagination.js
│   │   └── ErrorBoundary.js
│   ├── forms/            # Form components
│   │   └── UserForm.js
│   └── layout/           # Layout components
│       └── Navbar.js
├── pages/                # Page components
│   ├── UserList/
│   ├── CreateUser/
│   ├── UserDetails/
│   └── EditUser/
├── store/                # Redux store configuration
│   ├── api/
│   │   └── usersApi.js   # RTK Query API slice
│   ├── slices/
│   │   └── userSlice.js  # Additional state management
│   └── store.js          # Store configuration
├── utils/
│   └── validation.js     # Validation schemas and utilities
├── App.js                # Main application component
└── index.js              # Application entry point
```

## 🎯 Key Features & Usage

### User List Page (`/users`)

- View all users in a responsive table format
- Search users by name or email with debounced input
- Filter users by role (Admin, Editor, Viewer) and status (Active/Inactive)
- Pagination controls with customizable page size
- Action buttons for View, Edit, and Delete operations

### Create User Page (`/users/create`)

- Comprehensive form with all required and optional fields
- Real-time validation with inline error messages
- Dynamic array fields for skills and available time slots
- Form submission with success/error notifications

### User Details Page (`/users/:id`)

- Complete user information display
- Organized in clear, readable card sections
- Direct navigation to edit mode
- Mobile-responsive layout

### Edit User Page (`/users/:id/edit`)

- Pre-populated form with existing user data
- Same validation rules as create form
- PATCH request to update only modified fields
- Success navigation back to details page

## 🧪 Form Validation Rules

- **Name**: 3-50 characters, required
- **Username**: 3-20 characters, alphanumeric + underscore only, required
- **Email**: Valid email format, max 100 characters, required
- **Phone**: Max 20 characters, valid phone format, required
- **Website**: Valid URL format, max 100 characters, required
- **Skills**: Array of strings, 2-10 characters each, at least 1 required
- **Available Slots**: Array of future dates, at least 1 required
- **Active Status**: Must be checked/true to submit
- **Address**: All fields required with specific length limits
- **Company Name**: 2-100 characters, required
- **Role**: Must select from Admin, Editor, or Viewer

## 📱 Responsive Design

The application is fully responsive and works on:

- **Desktop**: Full-featured experience with all components
- **Tablet**: Adapted layouts with touch-friendly interfaces
- **Mobile**: Optimized for small screens with collapsible navigation

## 🛡️ Error Handling

- **Network Errors**: Graceful handling of API failures
- **Validation Errors**: Real-time form validation feedback
- **Error Boundaries**: Catches and displays component errors
- **Loading States**: Visual feedback during async operations
- **404 Handling**: Redirects for invalid routes

## 🚀 Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

### `npx json-server --watch db.json --port 4000`

Starts the mock backend server on port 4000.

## 🐛 Troubleshooting

### Common Issues

1. **Port 4000 already in use**: Change json-server port with `--port 4001`
2. **CORS issues**: json-server handles CORS automatically
3. **Form validation errors**: Check console for detailed Yup validation messages
4. **Build errors**: Ensure all dependencies are installed with `npm install`

## 🎉 Implementation Notes

### Key Decisions & Trade-offs

- **State Management**: Used Redux Toolkit with RTK Query for efficient data fetching and caching
- **Form Handling**: Chose Formik + Yup for robust form validation and error handling
- **Styling**: Implemented custom CSS for full control and better performance than CSS-in-JS
- **Component Architecture**: Built reusable components with proper prop interfaces
- **Error Handling**: Implemented comprehensive error boundaries and user feedback
- **Accessibility**: Ensured WCAG 2.1 compliance with proper ARIA labels and keyboard navigation

### Performance Optimizations

- Debounced search to reduce API calls
- Memoized components and selectors
- Code splitting by routes
- Optimistic updates with RTK Query
- Efficient re-rendering with proper dependency arrays

## 🎨 UI/UX Features

### Modern Interface Design

- Clean, professional layout with consistent spacing
- Responsive design that adapts to all screen sizes
- Intuitive navigation with clear visual hierarchy
- Accessible color scheme with proper contrast ratios

### Interactive Components

- **Tables**: Sortable columns with hover effects
- **Forms**: Real-time validation with inline error messages
- **Modals**: Smooth animations with backdrop click to close
- **Buttons**: Multiple variants with loading states
- **Toast Notifications**: Non-intrusive success/error messages

## 🔒 Data Validation

### Frontend Validation (Yup Schema)

- **Real-time validation**: Errors appear as user types
- **Comprehensive rules**: All fields have specific validation requirements
- **User-friendly messages**: Clear, actionable error descriptions
- **Array validation**: Dynamic validation for skills and time slots

### Backend Integration

- **RESTful API**: Standard HTTP methods for all operations
- **Error handling**: Graceful handling of server errors
- **Data consistency**: Proper data transformation between frontend and backend

## 📁 Sample Data

The `db.json` file includes 5 sample users with different roles and statuses:

- **John Doe** - Admin (Active) - JavaScript, React, Node.js, MongoDB
- **Jane Smith** - Editor (Active) - Python, Django, PostgreSQL, AWS
- **Mike Johnson** - Viewer (Inactive) - Java, Spring, MySQL
- **Sarah Wilson** - Editor (Active) - UI/UX, Figma, CSS, HTML
- **David Brown** - Admin (Active) - Go, Docker, Kubernetes, Redis

## 🎯 Quick Start Guide

1. **Clone the repository**
2. **Run `npm install`** to install dependencies
3. **Open TWO terminals**:
   - Terminal 1: `npm run server` (starts json-server)
   - Terminal 2: `npm start` (starts React app)
4. **Open your browser** to `http://localhost:3000`
5. **Start managing users!**

## 🛠️ Development Workflow

### Adding New Users

1. Click "Create New User" button
2. Fill out the comprehensive form
3. Add multiple skills and time slots
4. Submit to see success notification
5. User appears in the main list

### Editing Users

1. Click "Edit" from user list or details page
2. Modify any fields in the pre-filled form
3. Update skills and time slots as needed
4. Submit to see updated information

### Managing Data

1. Use search to find specific users
2. Filter by role (Admin/Editor/Viewer) or status
3. Navigate through pages with pagination
4. Delete users with confirmation

## 🌟 Advanced Features

### Debounced Search

- Search input waits 500ms before triggering API call
- Reduces server load and improves performance
- Searches both name and email fields

### Smart Pagination

- Customizable page sizes (5, 10, 20, 50)
- Intelligent page number display
- Maintains state across navigation

### Form Enhancements

- **Dynamic Arrays**: Add/remove skills and time slots
- **Date Validation**: Ensures future dates for availability
- **Real-time Feedback**: Instant validation on field blur
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Developed By: Nikhil Falke**

**Happy coding! 🚀**
