# EmailJS Setup Instructions

To complete the EmailJS setup for your portfolio feedback form, follow these steps:

## 1. Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Verify your email address

## 2. Set up Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your chosen provider
5. Note down your **Service ID**

## 3. Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

**Subject:**
```
New Portfolio Feedback from {{from_name}}
```

**Content:**
```
You have received a new message from your portfolio website.

From: {{from_name}}
Email: {{from_email}}
Date: {{current_date}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
Reply to: {{from_email}}
```

**Important:** Make sure to use the exact variable names:
- `{{from_name}}` - for the sender's name
- `{{from_email}}` - for the sender's email address
- `{{message}}` - for the message content
- `{{current_date}}` - for the current date (optional)

4. Note down your **Template ID**

## 4. Get Your Public Key
1. Go to "Account" in your dashboard
2. Find your **Public Key** (User ID)

## 5. Update the Configuration
Open `script.js` and replace the placeholder values:

```javascript
// Replace these with your actual EmailJS credentials:
emailjs.init("YOUR_PUBLIC_KEY");     // Your Public Key from step 4

// In the emailjs.send() function:
'YOUR_SERVICE_ID',    // Your Service ID from step 2
'YOUR_TEMPLATE_ID',   // Your Template ID from step 3
```

## 6. Test the Form
1. Open your portfolio website
2. Fill out the feedback form
3. Check if the email is received in your configured email account

## Notes
- EmailJS free plan allows 200 emails per month
- Make sure to keep your credentials secure
- Test thoroughly before deploying to production

## Example Configuration
After setup, your script.js should look like this:

```javascript
// Initialize EmailJS
(function() {
  emailjs.init("Ct0RLuW-b4MfUuMNn"); // Your actual public key
})();

// In the form handler:
const templateParams = {
  from_name: name,        // Sender's name from form
  from_email: email,      // Sender's email from form  
  message: message,       // Message content from form
  to_name: 'Aditya Pamungkas'
};

const response = await emailjs.send(
  'service_y0bl05j',      // Your actual service ID
  'template_cy5qz1m',     // Your actual template ID
  templateParams
);
```

## Troubleshooting
If you're not receiving complete sender information:

1. **Check your EmailJS template** - Make sure it includes:
   - `{{from_name}}` for the sender's name
   - `{{from_email}}` for the sender's email
   
2. **Update your template content** to:
   ```
   From: {{from_name}}
   Email: {{from_email}}
   
   Message:
   {{message}}
   ```

3. **Test with different data** to ensure all fields are being captured correctly.
