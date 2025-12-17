# Admin Authentication Migration Summary

## What Changed

The admin panel authentication has been migrated from **phone number + OTP** to **Admin ID + Password**.

## Files Created

1. **`models/Admin.ts`** - New Admin model with adminId and password fields
2. **`app/api/auth/admin-login/route.ts`** - New login endpoint for admin authentication
3. **`scripts/create-admin-user.ts`** - Script to create admin users
4. **`ADMIN-LOGIN-SETUP.md`** - Comprehensive setup guide

## Files Modified

1. **`app/admin/page.tsx`** - Updated login UI from OTP to ID/password
2. **`package.json`** - Added `create-admin-user` script

## Quick Start

### 1. Create First Admin User
```bash
npm run create-admin-user
```

### 2. Login to Admin Panel
- Navigate to `/admin`
- Enter Admin ID: `admin001`
- Enter Password: `Admin@123`
- Click "Sign In"

### 3. Access Dashboard
- You'll be redirected to `/admin/dashboard`
- Admin session is stored in localStorage

## Key Features

✅ Secure password hashing with bcryptjs
✅ Admin account status management
✅ Separate Admin model from User model
✅ Clean, professional login UI
✅ Password visibility toggle
✅ Proper error handling

## Database Schema

### Admin Collection
```javascript
{
  _id: ObjectId,
  adminId: String (unique),
  password: String (hashed),
  name: String,
  email: String,
  role: String ("ADMIN" | "SUPER_ADMIN"),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoint

**POST** `/api/auth/admin-login`

Request:
```json
{
  "adminId": "admin001",
  "password": "Admin@123"
}
```

Response (Success):
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "...",
    "adminId": "admin001",
    "name": "Admin User",
    "email": "admin@pocketmouse.com",
    "role": "ADMIN"
  }
}
```

Response (Error):
```json
{
  "error": "Invalid admin ID or password"
}
```

## Session Management

- Session stored in: `localStorage.adminUser`
- Session persists across page refreshes
- Logout clears session and redirects to `/admin`
- Admin layout validates role on protected routes

## Next Steps

1. ✅ Create admin user with `npm run create-admin-user`
2. ✅ Test login at `/admin`
3. ✅ Verify dashboard access at `/admin/dashboard`
4. Consider implementing password change feature
5. Consider implementing admin management panel for creating/editing admins
