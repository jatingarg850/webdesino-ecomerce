import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

// Generate random 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP via API
async function sendOTP(phone: string, otp: string): Promise<boolean> {
  try {
    const authkey = process.env.AUTHKEY_API_KEY;
    const sender = process.env.AUTHKEY_SENDER_ID || 'AUTHKY';
    const countryCode = process.env.AUTHKEY_COUNTRY_CODE || '91';

    if (!authkey) {
      console.error('AUTHKEY_API_KEY not configured');
      return false;
    }

    // Send OTP using JSON POST method (recommended by Authkey)
    const payload = {
      country_code: countryCode,
      mobile: phone,
      sid: '32110', // Template SID for OTP
      sender: sender,
      otp: otp,
    };

    console.log('📱 Sending OTP via Authkey:', { ...payload, otp: '***' });
    
    const response = await fetch('https://console.authkey.io/restapi/requestjson.php', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authkey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log('✅ AuthKey.io response:', data);
    
    return response.ok;
  } catch (error) {
    console.error('❌ Error sending OTP:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('📱 Send OTP request body:', body);
    
    let { phone, name } = body;

    // Clean phone number - remove any non-digit characters
    if (phone) {
      phone = phone.replace(/\D/g, '');
      console.log('📱 Cleaned phone:', phone);
    }

    if (!phone) {
      console.error('❌ Phone number is required');
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Validate phone number format (10 digits for India)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      console.error(`❌ Invalid phone format: ${phone} (length: ${phone.length})`);
      return NextResponse.json(
        { error: `Invalid phone number format. Expected 10 digits starting with 6-9, got: ${phone}` },
        { status: 400 }
      );
    }
    
    console.log('✅ Phone validation passed:', phone);

    console.log('📱 Connecting to database...');
    await connectDB();
    console.log('✅ Database connected');

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry
    console.log(`📱 Generated OTP: ${otp}, Expiry: ${otpExpiry}`);

    // Find or create user
    console.log(`📱 Finding user with phone: ${phone}`);
    let user = await User.findOne({ phone });
    console.log(`📱 User found: ${!!user}`);

    if (!user) {
      // Create new user if doesn't exist
      if (!name) {
        console.error('❌ Name is required for new users');
        return NextResponse.json(
          { error: 'Name is required for new users' },
          { status: 400 }
        );
      }

      console.log(`📱 Creating new user: ${name}, ${phone}`);
      user = await User.create({
        name,
        phone,
        otp,
        otpExpiry,
        isPhoneVerified: false,
      });
      console.log(`✅ User created: ${user._id}`);
    } else {
      // Update existing user with new OTP
      console.log(`📱 Updating existing user: ${user._id}`);
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save();
      console.log(`✅ User updated with new OTP`);
    }

    // Send OTP via API
    console.log(`📱 Sending OTP for ${phone}...`);
    const otpSent = await sendOTP(phone, otp);
    console.log(`📱 OTP sent result: ${otpSent}`);

    // In production, require successful OTP send
    if (!otpSent && process.env.NODE_ENV === 'production') {
      console.error('❌ OTP send failed in production');
      return NextResponse.json(
        { error: 'Failed to send OTP. Please try again.' },
        { status: 500 }
      );
    }

    // In development, allow OTP even if send fails
    if (!otpSent && process.env.NODE_ENV !== 'production') {
      console.log(`📱 Development mode: OTP send failed but continuing`);
    }

    const responseData = {
      success: true,
      message: 'OTP sent successfully',
      phone: phone,
    };
    
    console.log(`✅ Sending success response:`, responseData);
    return NextResponse.json(responseData);
  } catch (error) {
    console.error('❌ Send OTP error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Internal server error: ${errorMessage}` },
      { status: 500 }
    );
  }
}
