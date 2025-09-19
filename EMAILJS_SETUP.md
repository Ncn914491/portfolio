# EmailJS Setup Guide

This portfolio uses EmailJS for the contact form functionality. Follow these steps to set it up:

## 1. Create EmailJS Account
- Go to [https://www.emailjs.com/](https://www.emailjs.com/)
- Sign up for a free account

## 2. Create Email Service
- In your EmailJS dashboard, go to "Email Services"
- Click "Add New Service"
- Choose your email provider (Gmail, Outlook, etc.)
- Follow the setup instructions for your provider
- Note down the **Service ID**

## 3. Create Email Template
- Go to "Email Templates" in your dashboard
- Click "Create New Template"
- Use these template variables in your email template:
  - `{{from_name}}` - Sender's name
  - `{{from_email}}` - Sender's email
  - `{{message}}` - Message content
  - `{{to_name}}` - Your name (Narisetti Chaitanya Naidu)

Example template:
```
Subject: New Contact Form Message from {{from_name}}

Hello {{to_name}},

You have received a new message from your portfolio contact form:

From: {{from_name}} ({{from_email}})
Message: {{message}}

Best regards,
Your Portfolio Contact Form
```

- Save the template and note down the **Template ID**

## 4. Update Environment Variables
Update your `.env.local` file with the actual values:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_actual_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_actual_template_id
```

## 5. Test the Contact Form
- Start your development server: `npm run dev`
- Navigate to the contact section
- Fill out and submit the form
- Check your email for the message

## Current Configuration
- Public Key: `IxWBP0nH7HsD2Wrmr`
- Private Key: `LzVTwAl-3zOrmxTSPKx0Q` (stored securely in .env.local)

The contact form will show success/error messages based on the submission status.