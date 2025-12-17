# Admin Login Setup Guide

## Overview
The admin panel now uses a dedicated authentication system with Admin ID and password instead of phone number OTP authentication.

## Changes Made

### 1. New Admin Model (`models/Admin.ts`)
- Created a new `Admin` model separate from the `User` model
- Fields:
  - `adminId`: Unique admin identifier (string)
  - `password`: Hashed password (bcryptjs)
  - `name`: Admin name
  - `email`: Admin email (optional)
  - `role`: ADMIN or SUPER_ADMIN
  - `isActive`: Boolean flag to enable/disable admin accounts
  - `createdAt` & `updatedAt`: Timestamps

### 2. Admin Login API (`app/api/auth/admin-login/route.ts`)
- New endpoint: `POST /api/auth/admin-login`
- Accepts: `adminId` and `password`
- Returns: Admin user data on successful authentication
- Features:
  - Password verification using bcryptjs
  - Admin account status check
  - Secure error messages (doesn't reveal if admin ID exists)

### 3. Updated Admin Login Page (`app/admin/page.tsx`)
- Replaced OTP-based authentication with ID/password login
- Features:
  - Admin ID input field
  - Password input with show/hide toggle
  - Clean, professional UI
  - Error handling and loading states

## Creating Admin Users

### Method 1: Using the Script (Recommended)

Run the following command to create a new admin user:

```bash
npm run create-admin-user
```

This will create an admin with:
- **Admin ID**: `admin001`
- **Password**: `Admin@123`
- **Name**: `Admin User`
- **Email**: `admin@pocketmouse.com`

### Method 2: Manual Database Entry

You can also create admin users directly in MongoDB:

```javascript
db.admins.insertOne({
  adminId: "admin001",
  password: "$2a$10/...", // bcryptjs hashed password
  name: "Admin User",
  email: "admin@pocketmouse.com",
  role: "ADMIN",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

## Login Flow

1. Admin navigates to `/admin`
2. Enters Admin ID and Password
3. System validates credentials against Admin collection
4. On success:
   - Admin data is stored in localStorage
   - User is redirected to `/admin/dashboard`
5. On failure:
   - Generic error message is displayed
   - Admin remains on login page

## Security Features

- ✅ Passwords are hashed using bcryptjs (10 salt rounds)
- ✅ Admin account status verification
- ✅ Generic error messages (doesn't reveal if admin ID exists)
- ✅ Separate Admin model from User model
- ✅ Admin role verification in layout

## Session Management

- Admin session is stored in `localStorage` as `adminUser`
- Session persists across page refreshes
- Logout clears the session and redirects to login page
- Admin layout checks for valid admin role on protected routes

## Changing Admin Password

To change an admin password, you can:

1. Update directly in MongoDB:
```javascript
const bcrypt = require('bcryptjs');
const newPassword = await bcrypt.hash('newPassword123', 10);
db.admins.updateOne(
  { adminId: "admin001" },
  { $set: { password: newPassword } }
)
```

2. Or create an admin password change endpoint (recommended for production)

## Environment Variables

No additional environment variables are required. The system uses existing MongoDB connection.

## Troubleshooting

### "Invalid admin ID or password"
- Verify the admin ID exists in the database
- Ensure the password is correct
- Check that the admin account is active (`isActive: true`)

### Admin can't access dashboard
- Check if `adminUser` is stored in localStorage
- Verify the user has `role: 'ADMIN'`
- Clear localStorage and login again

### Password verification fails
- Ensure bcryptjs is installed: `npm install bcryptjs`
- Check that the password in database is properly hashed

## Next Steps

1. Run `npm run create-admin-user` to create your first admin
2. Navigate to `/admin` and login with the credentials
3. Access the admin dashboard at `/admin/dashboard`
4. Consider implementing a password change feature for production
