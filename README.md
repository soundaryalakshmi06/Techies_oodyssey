# 🏠 VinaiThunai – Trusted Home Service Platform

> **VinaiThunai** is a home-service platform that connects customers with verified local professionals using **service, location, preferred-language, availability, verification, and rating-based matching**.

Customers can explain a home-service problem using **photos and their original voice recording**, receive a transparent estimated quote from a professional, approve bookings, track the service, approve additional work, and maintain a complete digital service history.

---

## 📸 Application Screenshots

### Customer Dashboard

![Customer Dashboard](screenshots/customer-dashboard.png)

The customer dashboard provides quick access to active bookings, pending requests, completed services, saved professionals, service search, and service tracking.

### Photo + Voice Service Request

![Service Request](screenshots/service-request-photo-voice.png)

Customers can upload problem photos and record the problem in their preferred language. The original voice recording can be listened to directly by the professional.

### Provider Dashboard

![Provider Dashboard](screenshots/provider-dashboard.png)

Professionals can manage incoming requests, today's jobs, active jobs, completed jobs, earnings, ratings, and their availability.

### Location-Based Service Context

![Location Matching](screenshots/location-matching.png)

Location information is used as one of the factors for finding suitable professionals near the customer's service area.

---

# 🎯 Problem Statement

Finding a reliable home-service professional can be difficult because customers may struggle to:

- Explain the problem clearly.
- Find professionals who speak their preferred language.
- Verify a professional's identity and experience.
- Understand the expected service cost before work begins.
- Prevent unexpected additional charges.
- Track the service process.
- Maintain records of previous services.

VinaiThunai addresses these problems through a structured digital service-request and approval workflow.

---

# 💡 Solution

VinaiThunai follows this core flow:

```text
Customer Problem
      ↓
Photo + Original Voice + Description
      ↓
Preferred Language
      ↓
Service + Location + Availability Matching
      ↓
Verified Professionals
      ↓
Professional Assessment
      ↓
Transparent Estimated Quote
      ↓
Customer Approval
      ↓
Booking
      ↓
Service Tracking
      ↓
Additional Work Approval (if required)
      ↓
Service Completion
      ↓
Before / After Evidence
      ↓
Final Invoice
      ↓
Rating & Review
      ↓
Service History
```

---

# ⭐ Core Innovation

The key features that differentiate VinaiThunai are:

1. **📷 Photo Problem Reporting** – Customers can visually show the issue.
2. **🎙️ Original Voice Reporting** – Customers can explain the problem in their preferred language without depending on compulsory speech-to-text.
3. **🗣️ Language-Based Matching** – Preferred language is considered when matching professionals.
4. **💰 Transparent Quotes** – Professionals provide a probable issue, proposed procedure, labour estimate, parts estimate, and total estimate.
5. **🔐 Customer Approval for Additional Work** – Additional charges require customer approval before the extra work proceeds.
6. **🛡️ Professional Verification** – Identity, experience, and skill/training evidence can be reviewed.
7. **📍 Location-Based Matching** – Service location is considered while finding professionals.
8. **📸 Before/After Evidence** – Service completion can include evidence of the work performed.
9. **🧾 Digital Service History** – Quotes, approvals, evidence, invoices, and reviews can be maintained as a service record.

---

# 👥 User Roles

## 👤 Customer

Customers can:

- Register and log in.
- Select their preferred language.
- Search for services.
- Filter professionals.
- Create service requests.
- Upload problem photos.
- Record original voice descriptions.
- View matched professionals.
- View professional profiles and verification information.
- Receive estimated quotes.
- Approve or request changes to quotes.
- Book service slots.
- Track service progress.
- Approve or reject additional work.
- View final invoices.
- Rate and review professionals.
- View service history.

---

## 👨‍🔧 Professional / Provider

Professionals can:

- Register as a service provider.
- Create a professional profile.
- Select services offered.
- Add languages spoken.
- Provide experience details.
- Submit verification evidence.
- Manage availability.
- Receive customer requests.
- View customer photos.
- Listen to the original customer voice recording.
- Assess the reported problem.
- Provide a procedure and estimated quote.
- Manage bookings.
- Start and complete services.
- Request approval for additional work.
- Upload before/after evidence.
- Manage earnings.
- Receive customer reviews.

---

## 👨‍💼 Admin

Administrators can manage:

- Customers
- Professionals
- Provider verification
- Service categories
- Services
- Bookings
- Reviews
- Analytics

Admin actions include:

- View
- Search
- Filter
- Activate
- Deactivate
- Approve verification
- Reject verification
- Request more information
- Manage service categories
- Monitor bookings

---

# 🔄 Complete Customer Workflow

### 1. Register

The customer provides:

- Full name
- Mobile number
- Email
- Password
- Location
- Preferred language

Supported language options in the planned workflow include:

- Tamil
- English
- Telugu
- Malayalam
- Kannada
- Hindi
- Other

### 2. Find a Service

The customer selects a category such as:

- Plumbing
- Electrical
- Cleaning
- AC & Appliance
- Carpentry
- Painting
- Pest Control
- Locksmith

### 3. Create Service Request

The customer provides:

- Service category
- Specific problem
- Address
- City
- Area
- Pincode
- Preferred language
- Problem photos
- Original voice recording
- Optional description
- Preferred date
- Preferred time

### 4. Matching

Professionals are matched using:

```text
Service
+
Location
+
Language
+
Availability
+
Verification
+
Rating
```

### 5. Professional Assessment

The professional reviews:

- Customer problem
- Uploaded photos
- Original voice recording
- Description
- Location
- Requested service

The professional can then provide:

- Probable issue
- Proposed procedure
- Labour estimate
- Parts estimate
- Estimated total
- Expected duration
- Additional notes

### 6. Customer Quote Approval

The customer can:

- ✅ Approve & Book
- 🟡 Request Changes
- 🔴 Decline Quote

### 7. Booking

The customer selects:

- Date
- Available time slot
- Service address
- Payment method

For the MVP workflow, payment options include:

- Pay After Service
- Online Payment

### 8. Service Tracking

The service status progresses through:

```text
Request Submitted
      ↓
Quote Received
      ↓
Booking Confirmed
      ↓
Provider On The Way
      ↓
Service Started
      ↓
Service Completed
```

### 9. Additional Work Approval

If another issue is identified during service, the professional submits:

- Issue found
- Reason
- Additional work
- Additional parts cost
- Additional labour cost
- Additional cost
- Photo evidence

The customer can then:

- ✅ Approve Additional Work
- ❌ Reject Additional Work

This prevents unauthorized additional charges.

### 10. Completion

The professional can provide:

- Before photo
- After photo
- Work summary
- Parts used
- Final labour
- Additional work
- Final amount

### 11. Invoice

The customer receives the final invoice containing the service cost and approved additional work.

### 12. Review

The customer can rate the professional and optionally review:

- Professionalism
- Service quality
- Pricing transparency
- Punctuality
- Communication

### 13. Service History

The digital service record can contain:

- Original problem photo
- Voice recording
- Provider
- Quote
- Additional work
- Approval history
- Before/after photos
- Invoice
- Review

---

# 👨‍🔧 Provider Workflow

```text
Provider Registration
        ↓
Professional Profile
        ↓
Verification
        ↓
Add Services
        ↓
Set Languages
        ↓
Set Availability
        ↓
Receive Customer Request
        ↓
View Problem Photo
        ↓
Listen to Original Voice
        ↓
Assess Problem
        ↓
Send Procedure + Estimated Quote
        ↓
Customer Approval
        ↓
Visit Customer
        ↓
Start Service
        ↓
Additional Work?
   ↙             ↘
 Yes              No
  ↓                ↓
Request Approval  Continue
  ↓                ↓
Customer Decision
        ↓
Complete Service
        ↓
Before / After Evidence
        ↓
Final Invoice
        ↓
Receive Review
```

---

# 🛡️ Provider Verification

The provider verification workflow supports different verification levels rather than automatically rejecting every skilled worker who does not have a certificate.

Possible verification states:

- **Basic Verified**
- **Experience Verified**
- **Training/Certificate Verified**

Evidence can include:

- Identity evidence
- Experience evidence
- Skill/training evidence
- Previous work photos

---

# 🧑‍💼 Admin Workflow

```text
Admin Login
    ↓
Admin Dashboard
    ├── Customers
    ├── Professionals
    ├── Verification
    ├── Services
    ├── Bookings
    ├── Reviews
    └── Analytics
```

The admin dashboard can provide:

- Total customers
- Total professionals
- Active bookings
- Completed services
- Pending verification
- Booking analytics
- Service-location analytics
- Monthly booking information
- Provider growth
- Customer growth

---

# 🔔 Notification System

### Customer Notifications

- Request submitted
- Professional matched
- Quote received
- Booking confirmed
- Provider on the way
- Provider arrived
- Additional approval requested
- Service completed
- Invoice generated

### Provider Notifications

- New request
- Quote accepted
- Booking confirmed
- Customer cancelled
- Additional work approved
- Service completed
- New review

---

# 🖥️ Main Application Screens

The complete workflow defines the following major screens:

1. Landing Page
2. Customer Registration
3. Customer Login
4. Customer Dashboard
5. Service Category
6. Search & Filters
7. Create Service Request
8. Request Submitted
9. Matched Professionals
10. Professional Profile
11. Provider Request View
12. Provider Assessment / Quote
13. Customer Quote
14. Booking Confirmation
15. Booking Confirmed
16. Service Tracking
17. Provider Arrival
18. Service Started
19. Additional Work
20. Additional Work Approval
21. Service Completion
22. Final Invoice
23. Review & Rating
24. Service History
25. Provider Registration
26. Provider Dashboard
27. Provider Services
28. Provider Availability
29. Provider Bookings
30. Provider Earnings
31. Admin Dashboard
32. Admin User Management
33. Admin Provider Verification
34. Admin Service Management
35. Admin Booking Management

---

# 🏆 Hackathon Demo Flow

For a short hackathon demonstration, the core flow can be shown through these key screens:

1. **Landing Page**
2. **Customer Dashboard**
3. **Create Service Request – Photo + Voice + Language**
4. **Matched Professionals**
5. **Professional Trust Profile**
6. **Provider Request View**
7. **Provider Quote**
8. **Customer Quote Approval**
9. **Booking / Service Tracking**
10. **Additional Work Approval + Completion + Review**

This demonstrates the main product idea without requiring every planned screen to be shown during the demo.

---

# 🏠 Example Service Categories

- 🔧 Plumbing
- 💡 Electrical
- 🧹 Cleaning
- ❄️ AC & Appliance
- 🪚 Carpentry
- 🎨 Painting
- 🐜 Pest Control
- 🔐 Locksmith

### Example Plumbing Services

- Tap Repair
- Pipe Leakage
- Wash Basin Repair
- Toilet Repair
- Water Tank
- Drain Cleaning
- Pipe Installation
- Bathroom Fittings

---

# 🔎 Search & Filtering

Customers can search and filter professionals based on:

### Service
- Plumbing
- Electrical
- Cleaning
- etc.

### Location
- City
- Area / Pincode

### Language
- Tamil
- English
- Telugu
- Hindi
- etc.

### Availability
- Available Now
- Today
- Tomorrow
- Selected Date

### Rating
- 4★ & above
- 3★ & above

### Verification
- Verified
- Professionally Verified
- Certified / Training Verified

### Price
- Minimum price
- Maximum price

### Sorting
- Recommended
- Rating
- Price: Low → High
- Experience
- Availability

---

# 🧑‍🔧 Professional Profile

A professional profile can display:

- Name
- Verification status
- Rating
- Reviews
- Experience
- Location
- Languages
- Availability
- About
- Services
- Reviews
- Portfolio
- Availability
- Verification
- Previous work

Example service information:

| Service | Starting Price |
|---|---:|
| Pipe Leakage | ₹300+ |
| Tap Repair | ₹250+ |
| Drain Cleaning | ₹400+ |
| Bathroom Repair | ₹500+ |

---

# 🔐 Trust & Safety

VinaiThunai includes multiple trust mechanisms:

- Professional verification
- Identity verification
- Mobile verification
- Experience verification
- Skill/training evidence
- Previous work evidence
- Transparent estimated quotes
- Customer approval before booking
- Customer approval before additional work
- Before/after evidence
- Ratings and reviews
- Digital service history

---

# 📁 Project Structure

The application is organized into separate frontend and backend areas:

```text
VinaiThunai/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── store/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.js
│
├── screenshots/
│   ├── customer-dashboard.png
│   ├── service-request-photo-voice.png
│   ├── provider-dashboard.png
│   └── location-matching.png
│
└── README.md
```

> The screenshot folder above is intended for the README images. Keep the image files in the same relative location when pushing the repository to GitHub.

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/soundaryalakshmi06/Techies_oodyssey.git
cd Techies_oodyssey
```

## 2. Backend

```bash
cd backend
npm install
```

Configure the required environment variables in your local environment before starting the backend.

Then run:

```bash
npm start
```

If the project's `package.json` uses a different development script, use the script defined there.

## 3. Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The Vite development server will provide the local frontend URL.

---

# ⚙️ Development Notes

Do not commit sensitive credentials such as:

```text
.env
MongoDB passwords
JWT secrets
API keys
private credentials
```

Use an `.env.example` file to document required environment variables without exposing real secrets.

---

# 🌟 Core Value Proposition

VinaiThunai brings the complete home-service process into one structured workflow:

```text
Explain the Problem
        +
Show the Problem
        +
Speak in Your Language
        ↓
Find Suitable Professionals
        ↓
Understand the Estimated Cost
        ↓
Approve the Work
        ↓
Track the Service
        ↓
Approve Additional Work
        ↓
Verify Completion
        ↓
Review the Professional
```

## 🎥 Project Demo

[▶️ Watch Vinai Thunai Final Demo](https://1drv.ms/v/c/9B2EC813F2A5900E/IQBAR0HCsWEiQoeoQggN0X3DAZaVhFmZS9iNKRENJyK0mk8?e=0MFq49)

# 📌 Project Summary

**VinaiThunai** is designed around a simple principle:

> **Customers should be able to explain their problem naturally, find a suitable professional they can trust, understand the expected cost, and approve every important step of the service.**

The platform combines **photo-based problem reporting, original voice communication, language-aware matching, professional verification, transparent quotations, service tracking, customer-controlled additional work approval, completion evidence, invoicing, and service history** into a single home-service workflow.

---

## 👥 Team

**Techies Oodyssey**

GitHub Repository:

https://github.com/soundaryalakshmi06/Techies_oodyssey

---

## 📄 License

Add the project's chosen license here if your team has selected one.
