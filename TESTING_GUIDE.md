# Testing Guide - Frontend Backend Integration

**Date:** January 18, 2026  
**Purpose:** Step-by-step guide to test the complete waitlist flow

---

## 🚀 **Step 1: Start the Development Server**

### **Option A: If you haven't started the dev server yet**

```bash
cd client
npm run dev
```

The dev server should start on `http://localhost:5173` (or similar)

### **Option B: If server is already running**

Just open your browser to the dev server URL.

---

## 🧪 **Step 2: Test Complete Waitlist Flow**

### **Test Case 1: New User Signup (No Referral Code)**

1. **Navigate to waitlist page:**
   - Go to `http://localhost:5173/waitlist` (or your dev URL)

2. **Enter email:**
   - Use a valid university email (e.g., `test@university.edu`)
   - Leave referral code field empty
   - Click "JOIN THE WAITLIST"

3. **Expected Result:**
   - ✅ Success message: "If this email is eligible, you will receive a verification code"
   - ✅ OTP modal opens
   - ✅ Check your email for OTP code

4. **Enter OTP:**
   - Type the 6-digit code from your email
   - OTP should auto-verify when complete

5. **Expected Result:**
   - ✅ "Email verified successfully!" message
   - ✅ Loading screen appears
   - ✅ Redirects to dashboard

6. **Verify Dashboard Data:**
   - ✅ Shows referral code (e.g., "ABC12345")
   - ✅ Shows waitlist position (e.g., "#1234")
   - ✅ Shows referral count (should be 0 for new user)
   - ✅ All data should come from backend response

7. **Open Browser DevTools (F12):**
   - Go to Application → Local Storage
   - Verify these keys exist:
     - `sv_user_email`: Your email
     - `sv_user_data`: Object with `{ referralCode, referralCount, waitlistPosition }`

---

### **Test Case 2: New User Signup (With Referral Code)**

1. **Clear localStorage:**
   - Open DevTools (F12) → Application → Local Storage
   - Right-click → Clear
   - Refresh page

2. **Navigate to waitlist page:**
   - Go to `http://localhost:5173/waitlist`

3. **Enter email + referral code:**
   - Email: Different university email (e.g., `test2@university.edu`)
   - Referral Code: Use the code from Test Case 1 (e.g., "ABC12345")
   - Click "JOIN THE WAITLIST"

4. **Expected Result:**
   - ✅ OTP sent to email
   - ✅ Referral code stored temporarily in localStorage (`sv_pending_referral`)

5. **Enter OTP and verify**

6. **Verify Dashboard:**
   - ✅ Shows NEW referral code (different from the one you entered)
   - ✅ Shows waitlist position
   - ✅ Referral count should be 0 (you haven't referred anyone yet)

7. **Verify Backend:**
   - The person who owned the referral code you used should now have `referralCount: 1`
   - (You can check this by logging in as the first user again)

---

### **Test Case 3: Re-Entry (Existing User)**

1. **Stay logged in (don't clear localStorage)**

2. **Refresh the page:**
   - Press F5 or Ctrl+R

3. **Expected Result:**
   - ✅ Dashboard loads immediately
   - ✅ Shows same data as before (referralCode, position, count)
   - ✅ NO re-authentication required
   - ✅ Data loaded from localStorage

4. **Close browser completely:**
   - Close all browser windows
   - Open browser again
   - Navigate to `http://localhost:5173/waitlist`

5. **Expected Result:**
   - ✅ Dashboard still shows your data
   - ✅ Data persists across browser sessions

---

### **Test Case 4: Logout and Re-Login**

1. **Click Logout button on dashboard**

2. **Expected Result:**
   - ✅ Redirects to email verification page
   - ✅ localStorage cleared (`sv_user_email` and `sv_user_data` removed)

3. **Enter same email as before:**
   - Use the email from Test Case 1 or 2
   - Click "JOIN THE WAITLIST"

4. **Expected Result:**
   - ✅ OTP sent to email
   - ✅ Backend recognizes this is an existing user

5. **Enter OTP and verify**

6. **Expected Result:**
   - ✅ Dashboard shows SAME data as before
   - ✅ Same referral code
   - ✅ Same (or updated) waitlist position
   - ✅ Same (or updated) referral count

---

## 📧 **Step 3: Test Contact Form**

1. **Navigate to contact page:**
   - Go to `http://localhost:5173/contact`

2. **Fill out the form:**
   - First Name: "John"
   - Last Name: "Doe"
   - Email: "john@example.com"
   - Department: Select "Student Support"
   - Message: "Test message"

3. **Submit the form**

4. **Expected Result:**
   - ✅ Form submits successfully
   - ✅ Success message appears
   - ✅ Form resets

5. **Check Backend/Database:**
   - Open your Supabase dashboard
   - Go to `contact_messages` table
   - Verify new entry exists with:
     - `first_name`: "John"
     - `last_name`: "Doe"
     - `email`: "john@example.com"
     - `inquiry_type`: "student_support"
     - `message`: "Test message"

6. **Test all department options:**
   - Student Support → `student_support`
   - Merchant / Business → `merchant_business`
   - Careers → `student_support`
   - Partnerships → `merchant_business`

---

## 🔍 **Step 4: Verify Backend Integration**

### **Check Network Requests (DevTools)**

1. **Open DevTools (F12) → Network tab**

2. **Join waitlist and verify OTP:**

3. **Expected Network Calls:**

   **A. POST /api/waitlist/join**
   - Request Body:
     ```json
     {
       "email": "test@university.edu",
       "referralCode": "ABC12345"  // or undefined if not provided
     }
     ```
   - Response:
     ```json
     {
       "ok": true,
       "message": "If this email is eligible, you will receive a verification code."
     }
     ```

   **B. POST /api/auth/verify-otp**
   - Request Body:
     ```json
     {
       "email": "test@university.edu",
       "otp": "123456"
     }
     ```
   - Response:
     ```json
     {
       "ok": true,
       "action": "signup",  // or "login" or "verified"
       "message": "Account created and verified successfully!",
       "data": {
         "referralCode": "ABC12345",
         "referralCount": 0,
         "waitlistPosition": 1234
       }
     }
     ```

4. **Verify localStorage after OTP verification:**
   - `sv_user_email`: Should contain the email
   - `sv_user_data`: Should contain the `data` object from backend response
   - `sv_pending_referral`: Should be REMOVED after successful verification

---

## ✅ **Step 5: Verification Checklist**

Use this checklist to ensure everything works:

### **Waitlist Flow:**
- [ ] Can join waitlist with university email
- [ ] Can join with referral code
- [ ] Receives OTP email
- [ ] Can verify OTP
- [ ] Dashboard shows referralCode from backend
- [ ] Dashboard shows waitlistPosition from backend
- [ ] Dashboard shows referralCount from backend
- [ ] Data persists after page refresh
- [ ] Data persists after browser close/reopen
- [ ] Can logout successfully
- [ ] Can re-login with same email
- [ ] Re-login shows same data

### **Contact Form:**
- [ ] All fields accept input
- [ ] Department dropdown updates state
- [ ] Form submits successfully
- [ ] Data saves to Supabase
- [ ] Correct inquiryType mapping
- [ ] Success message displays
- [ ] Form resets after submission

### **Backend Integration:**
- [ ] No client-side position calculation
- [ ] No client-side referral counting
- [ ] Frontend displays backend data as-is
- [ ] localStorage stores backend response
- [ ] Network requests show correct data flow

---

## 🐛 **Common Issues & Solutions**

### **Issue 1: "Failed to send OTP"**
**Solution:** 
- Check backend is running on Railway
- Verify `VITE_API_URL` in `.env` file
- Check Network tab for actual error

### **Issue 2: "Invalid or expired verification code"**
**Solution:**
- OTP expires after 5 minutes
- Request a new code
- Check email spam folder

### **Issue 3: Dashboard doesn't show data**
**Solution:**
- Open DevTools → Console for errors
- Check localStorage has `sv_user_data`
- Verify backend response includes `data` object

### **Issue 4: Contact form doesn't submit**
**Solution:**
- Check all required fields are filled
- Open Network tab to see error response
- Verify backend endpoint is accessible

### **Issue 5: Data doesn't persist after refresh**
**Solution:**
- Check localStorage isn't being cleared
- Verify `AuthContext` loads data on mount
- Check browser isn't in incognito mode

---

## 📊 **Expected Console Output**

### **During OTP Verification:**
```
✅ Verification successful
✅ Backend data stored:
{
  referralCode: "ABC12345",
  referralCount: 0,
  waitlistPosition: 1234
}
```

### **During Dashboard Load:**
```
✅ User data loaded from storage
✅ Email: test@university.edu
✅ Position: 1234
✅ Referral Code: ABC12345
```

---

## 🎯 **Success Criteria**

Your integration is successful if:

1. ✅ User can complete full signup flow
2. ✅ Dashboard displays backend data correctly
3. ✅ Data persists across sessions
4. ✅ Re-entry works without re-verification
5. ✅ Contact form submits to backend
6. ✅ No console errors
7. ✅ Network requests show correct data flow

---

## 🚀 **Next Steps After Testing**

If all tests pass:

1. **Commit your changes:**
   ```bash
   git add .
   git commit -m "feat: integrate frontend with backend API - trust backend responses completely"
   git push origin main
   ```

2. **Deploy to production:**
   - Push to your hosting platform (Vercel/Netlify)
   - Verify environment variables are set
   - Test production deployment

3. **Monitor:**
   - Check error logs
   - Monitor user signups
   - Verify data in Supabase

---

**Happy Testing! 🎉**
