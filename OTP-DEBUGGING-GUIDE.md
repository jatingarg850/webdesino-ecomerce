# OTP Send Error - Debugging Guide

## Problem
POST `/api/auth/send-otp` returning 400 Bad Request

## Debugging Steps

### 1. Check Browser Console
Open browser DevTools (F12) and check Console tab for logs:

```
📱 Sending OTP request: { phone: "9876543210", name: undefined }
📱 OTP response: { status: 400, data: { error: "..." } }
```

### 2. Check Server Logs
Look for server logs showing:

```
📱 Send OTP request body: { phone: "9876543210", name: undefined }
📱 Cleaned phone: 9876543210
❌ Invalid phone format: 9876543210 (length: 10)
```

### 3. Common Issues

#### Issue 1: Phone Number Format
**Error**: `Invalid phone number format. Expected 10 digits starting with 6-9`

**Causes**:
- Phone doesn't start with 6-9
- Phone has less than 10 digits
- Phone has more than 10 digits
- Phone contains non-digit characters

**Solution**:
- Ensure phone starts with 6-9
- Ensure exactly 10 digits
- Remove any spaces or special characters

**Test**:
- Valid: 9876543210, 8765432109, 7654321098
- Invalid: 1234567890, 98765432, 987654321098

#### Issue 2: Name Required for Signup
**Error**: `Name is required for new users`

**Causes**:
- Signup tab selected but no name entered
- Name field is empty or whitespace only

**Solution**:
- Enter full name in signup form
- Name must be at least 1 character

#### Issue 3: Phone Number Required
**Error**: `Phone number is required`

**Causes**:
- Phone field is empty
- Phone field contains only spaces

**Solution**:
- Enter phone number
- Ensure phone field is not empty

#### Issue 4: Database Connection Error
**Error**: `Internal server error` (500)

**Causes**:
- MongoDB connection failed
- Database error during user creation

**Solution**:
- Check MongoDB connection string
- Verify MongoDB is running
- Check database permissions

#### Issue 5: SMS Service Error
**Error**: `Failed to send OTP. Please try again.` (500)

**Causes**:
- AUTHKEY_API_KEY not configured
- SMS service API error
- Network connectivity issue

**Solution**:
- Verify AUTHKEY_API_KEY in .env
- Check AuthKey account balance
- Verify internet connection

### 4. Testing Checklist

```
✅ Phone number format
  - [ ] Starts with 6-9
  - [ ] Exactly 10 digits
  - [ ] No special characters
  - [ ] No spaces

✅ Signup validation
  - [ ] Name entered (for signup)
  - [ ] Name is not empty
  - [ ] Name has at least 1 character

✅ Server configuration
  - [ ] AUTHKEY_API_KEY set in .env
  - [ ] AUTHKEY_SENDER_ID set in .env
  - [ ] AUTHKEY_COUNTRY_CODE set in .env
  - [ ] MongoDB connection working

✅ Network
  - [ ] Internet connection active
  - [ ] API endpoint accessible
  - [ ] No firewall blocking
```

### 5. Test Phone Numbers

**Valid Test Numbers**:
- 9811226924 (configured in AuthKey)
- 9876543210
- 8765432109
- 7654321098
- 6543210987

**Invalid Test Numbers**:
- 1234567890 (starts with 1)
- 98765432 (only 8 digits)
- 987654321098 (12 digits)
- 98765 43210 (contains space)

### 6. Manual API Testing

Using curl or Postman:

```bash
curl -X POST http://localhost:3001/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "9876543210",
    "name": "John Doe"
  }'
```

Expected Response (Success):
```json
{
  "success": true,
  "message": "OTP sent successfully",
  "phone": "9876543210",
  "otp": "123456"
}
```

Expected Response (Error):
```json
{
  "error": "Invalid phone number format. Expected 10 digits starting with 6-9, got: 1234567890"
}
```

### 7. Enable Verbose Logging

Add to send-otp route:
```typescript
console.log('📱 Request:', { phone, name });
console.log('📱 Phone regex test:', phoneRegex.test(phone));
console.log('📱 User found:', !!user);
```

### 8. Check Environment Variables

Verify in `.env`:
```env
AUTHKEY_API_KEY=dc6722c88c2f3864
AUTHKEY_SENDER_ID=POCKET
AUTHKEY_COUNTRY_CODE=91
```

### 9. Common Solutions

**Solution 1: Restart Dev Server**
```bash
npm run dev
```

**Solution 2: Clear Browser Cache**
- Press Ctrl+Shift+Delete
- Clear all cache
- Reload page

**Solution 3: Check .env File**
- Verify credentials are correct
- No extra spaces or quotes
- File is saved

**Solution 4: Verify Phone Input**
- Check phone input field
- Ensure it's accepting digits only
- Verify maxLength="10"

## Result

Once fixed, you should see:
- ✅ OTP sent successfully
- ✅ SMS received (or dev OTP shown)
- ✅ Can verify OTP
- ✅ User logged in

## Support

If still having issues:
1. Check all logs (browser + server)
2. Verify all environment variables
3. Test with valid phone number
4. Restart dev server
5. Clear browser cache
