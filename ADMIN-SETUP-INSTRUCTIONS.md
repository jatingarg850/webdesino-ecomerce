# Admin Panel Setup - Quick Instructions

## ✅ What's Done

Your admin panel now uses **Admin ID + Password** authentication instead of phone number OTP.

## 🚀 Getting Started

### Step 1: Create Your First Admin Account

Run this command in your terminal:

```bash
npm run create-admin-user
```

This creates an admin with:
- **Admin ID**: `admin001`
- **Password**: `Admin@123`

### Step 2: Login to Admin Panel

1. Go to `http://localhost:3000/admin`
2. Enter Admin ID: `admin001`
3. Enter Password: `Admin@123`
4. Click "Sign In"

### Step 3: Access Dashboard

You'll be redirected to the admin dashboard at `/admin/dashboard`

## 📋 What Changed

| Before | After |
|--------|-------|
| Phone number login | Admin ID login |
| OTP verification | Password authentication |
| User model for admin | Dedicated Admin model |
| `/api/auth/verify-otp` | `/api/auth/admin-login` |

## 📁 New Files

- `models/Admin.ts` - Admin database model
- `app/api/auth/admin-login/route.ts` - Login API endpoint
- `scripts/create-admin-user.ts` - Admin creation script
- `ADMIN-LOGIN-SETUP.md` - Detailed setup guide
- `ADMIN-AUTH-MIGRATION.md` - Migration summary

## 🔐 Security

- Passwords are hashed with bcryptjs
- Admin accounts can be deactivated
- Separate from regular user authentication
- Generic error messages for failed login

## 🛠️ Creating More Admins

To create additional admin users, edit `scripts/create-admin-user.ts` and change:

```typescript
const adminId = 'admin001';        // Change this
const adminPassword = 'Admin@123'; // Change this
const adminName = 'Admin User';    // Change this
const adminEmail = 'admin@pocketmouse.com'; // Change this
```

Then run:
```bash
npm run create-admin-user
```

## 📝 Changing Admin Password

To change an admin password in MongoDB:

```javascript
const bcrypt = require('bcryptjs');
const newPassword = await bcrypt.hash('NewPassword123', 10);
db.admins.updateOne(
  { adminId: "admin001" },
  { $set: { password: newPassword } }
)
```

## ❓ Troubleshooting

**Login fails with "Invalid admin ID or password"**
- Verify admin exists: Check MongoDB `admins` collection
- Verify password is correct
- Ensure admin account is active (`isActive: true`)

**Can't access dashboard after login**
- Check browser console for errors
- Verify localStorage has `adminUser` key
- Clear localStorage and login again

**Script fails to run**
- Ensure `.env.local` file exists with `MONGODB_URI`
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (should be 18+)

## 📚 More Information

See `ADMIN-LOGIN-SETUP.md` for detailed documentation.

---

**Ready to go!** Your admin panel is now secured with ID and password authentication. 🎉
