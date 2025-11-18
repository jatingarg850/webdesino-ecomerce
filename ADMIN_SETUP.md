# Admin Panel Setup

## Creating Admin User

Run the following command to create an admin user:

```bash
npm run create-admin
```

This will create an admin account with:
- **Email**: admin@webdesino.com
- **Password**: admin123

⚠️ **Important**: Change the password after first login!

## Accessing Admin Panel

1. Navigate to `/admin` in your browser
2. Login with the admin credentials
3. You'll be redirected to `/admin/dashboard`

## Admin Features

- **Dashboard**: Overview of orders, products, users, and revenue
- **Products**: Manage product inventory
- **Orders**: View and manage customer orders
- **Users**: Manage user accounts
- **Settings**: Configure store settings

## Security Notes

- Only users with `role: 'ADMIN'` can access the admin panel
- Admin authentication is separate from regular user authentication
- Admin sessions are stored in localStorage as `adminUser`
- Regular users cannot access admin routes even if logged in

## Manual Admin Creation

If you need to manually create an admin user in MongoDB:

```javascript
{
  name: "Admin Name",
  email: "admin@example.com",
  password: "<bcrypt_hashed_password>",
  role: "ADMIN",
  wishlist: [],
  cart: [],
  addresses: [],
  createdAt: new Date()
}
```

Make sure to hash the password using bcrypt with 10 salt rounds.
