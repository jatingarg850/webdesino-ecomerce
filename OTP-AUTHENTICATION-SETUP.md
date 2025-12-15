# OTP Authentication with AuthKey.io - Complete Setup ✅

## Overview
Replaced email/password authentication with phone number + OTP authentication using AuthKey.io SMS API.

## What Changed

### Before (Email/Password):
- Users logged in with email and password
- Password hashing with bcrypt
- No SMS verification

### After (Phone/OTP):
- Users login with phone number
- OTP sent via SMS using AuthKey.io
- 10-minute OTP expiry
- Automatic OTP verification

## Setup Instructions

### 1. Get AuthKey.io Credentials

1. Go to https://console.authkey.io
2. Sign up for an account
3. Get your API Key from the dashboard
4. Create an SMS template with `{#2fa#}` variable for OTP
5. Note your Sender ID (e.g., "POCKET")

### 2. Update Environment Variables

Add to `.env`:
```env
AUTHKEY_API_KEY=your_authkey_api_key
AUTHKEY_SENDER_ID=POCKET
AUTHKEY_COUNTRY_CODE=91
```

### 3. Database Schema Changes

Updated User model to support phone-based auth:
```typescript
{
  name: String,
  phone: String (unique),
  email: String (optional),
  password: String (optional),
  otp: String,
  otpExpiry: Date,
  isPhoneVerified: Boolean,
  role: 'USER' | 'ADMIN',
  // ... other fields
}
```

## API Endpoints

### Send OTP
**POST** `/api/auth/send-otp`

Request:
```json
{
  "phone": "9876543210",
  "name": "John Doe" // Required for signup
}
```

Response:
```json
{
  "success": true,
  "message": "OTP sent successfully",
  "phone": "9876543210"
}
```

### Verify OTP
**POST** `/api/auth/verify-otp`

Request:
```json
{
  "phone": "9876543210",
  "otp": "123456"
}
```

Response:
```json
{
  "success": true,
  "message": "Phone verified successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "phone": "9876543210",
    "role": "USER",
    "isPhoneVerified": true
  }
}
```

## User Authentication Flow

### Login Flow:
1. User enters phone number
2. System sends OTP via SMS
3. User enters OTP
4. System verifies OTP
5. User logged in and redirected

### Signup Flow:
1. User enters name and phone number
2. System creates user and sends OTP
3. User enters OTP
4. System verifies phone and marks as verified
5. User account created and logged in

## Components Updated

### 1. Auth Modal (`components/auth/auth-modal.tsx`)
- Replaced email/password with phone/OTP
- Two-step process: Phone entry → OTP verification
- Resend OTP functionality
- 60-second countdown timer

### 2. Admin Login (`app/admin/page.tsx`)
- Same OTP-based authentication
- Admin role verification
- Redirects to dashboard on success

## User Model Changes

```typescript
// OLD
{
  email: String (required, unique),
  password: String (required),
}

// NEW
{
  phone: String (required, unique),
  email: String (optional),
  password: String (optional),
  otp: String,
  otpExpiry: Date,
  isPhoneVerified: Boolean,
}
```

## SMS Template Setup (AuthKey.io)

Create a template with:
```
Your OTP for Pocket Mouse is {#2fa#}. Please do not share this code with anyone.
```

Or use the provided template ID: 32110

## Features

✅ **Phone-based authentication** - No email required
✅ **OTP via SMS** - Secure 6-digit OTP
✅ **10-minute expiry** - OTP expires after 10 minutes
✅ **Resend OTP** - Users can request new OTP
✅ **60-second timer** - Prevents spam resend
✅ **Admin verification** - Admin role check on login
✅ **Cart sync** - Syncs cart after login
✅ **Phone verification** - Marks phone as verified

## Security Features

1. **OTP Expiry** - OTP valid for 10 minutes only
2. **Rate Limiting** - 60-second resend timer
3. **Phone Validation** - 10-digit Indian phone numbers only
4. **Admin Role Check** - Only ADMIN role can access admin panel
5. **Secure SMS** - HTTPS-only communication with AuthKey.io

## Testing

### Test Phone Numbers:
- Any valid 10-digit Indian number starting with 6-9
- Example: 9876543210

### Test OTP:
- OTP is sent via SMS
- Check SMS inbox for OTP
- Enter 6-digit OTP to verify

### Admin Login:
1. Go to `/admin`
2. Enter phone number
3. Receive OTP via SMS
4. Enter OTP
5. Redirected to dashboard (if ADMIN role)

## Migration from Email/Password

If you have existing users with email/password:

1. Keep email field optional
2. Require phone number for new logins
3. Gradually migrate users to phone-based auth
4. Keep password field for backward compatibility

## Troubleshooting

### OTP not received:
- Check phone number format (10 digits, starts with 6-9)
- Check AuthKey.io account balance
- Verify API key is correct
- Check SMS template is approved

### OTP expired:
- OTP valid for 10 minutes
- Click "Resend OTP" to get new OTP
- 60-second wait between resends

### Admin access denied:
- Ensure user has ADMIN role in database
- Check localStorage for adminUser

## Files Modified/Created

### Created:
- `app/api/auth/send-otp/route.ts` - Send OTP API
- `app/api/auth/verify-otp/route.ts` - Verify OTP API
- `OTP-AUTHENTICATION-SETUP.md` - This file

### Modified:
- `models/User.ts` - Updated schema for phone auth
- `components/auth/auth-modal.tsx` - OTP-based login
- `app/admin/page.tsx` - OTP-based admin login
- `.env` - Added AuthKey.io credentials

### Deprecated (still exist but not used):
- `app/api/auth/login/route.ts` - Old email/password login
- `app/api/auth/signup/route.ts` - Old email/password signup

## Next Steps

1. Add AuthKey.io API key to `.env`
2. Test OTP sending and verification
3. Update any other login pages if needed
4. Remove old email/password authentication code
5. Update user documentation

## Support

For AuthKey.io support: https://console.authkey.io/support

For issues with implementation, check:
- API key is correct
- Phone number format is valid
- SMS template is approved
- Account has sufficient balance

Your authentication system is now OTP-based! 🎉
