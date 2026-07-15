# GymFlex: Secure Gym-Booking Marketplace 🏋️‍♂️🔒

**Academic Mid-Term Progress Report & Technical Design Blueprints**  
*Course Project for APT 3065 (Systems Analysis and Design) — USIU-Africa*  
*Submitted to: Prof. Dr. Agnes Wamuyu*  
*Developer: Mark (Cybersecurity & Applied Computer Technology)*

---

## 1. Project Overview & Target Gap
GymFlex is a secure, map-based marketplace application designed to bridge the gap between fitness enthusiasts (Clients) and gym owners (Hosts). 
* **The Market Gap:** Traditional gym memberships are rigid and geographically restrictive. GymFlex offers dynamic, pay-as-you-go gym access while allowing local gyms to monetize underutilized, off-peak operational capacities.
* **Security Focus:** Built with a "Security-by-Design" approach. The platform protects sensitive user location tracking data, relies on secure Role-Based Access Controls (RBAC), and enforces cryptographic password hashing.

---

## 2. Project Implementation & Progress Evaluation
This evaluation outlines the development milestones achieved in aligning our frontend interfaces, backend services, and core marketplace rules.

### A. UI/UX Development
The client-facing design has transitioned from static wireframes into interactive, user-centric screen flows:
* **Dynamic Training Dashboard:** Designed interactive training schedules, custom session trackers, and user workout guides to keep the interface highly engaging.
* **Map-Based Marketplace Layout:** Implemented a clean, Leaflet.js-driven map UI displaying interactive visual pins for on-demand gym location selection.
* **Distinct Role Interfaces:** Built split dashboard layouts customized for **Clients** (focusing on bookings, active passes, and physical tracking metrics) and **Hosts** (focusing on capacity caps, earnings, and active guest slots).

### B. Connecting Frontend to Backend
The pipeline connecting our client views to the cloud server is securely established:
* **State and API Mapping:** Mapped the frontend React states to feed directly into our Node.js/Express API endpoints via Axios fetch requests.
* **JWT Handshake Security:** Implemented frontend state monitors that track the active JSON Web Token (JWT) in local storage, automatically handling session invalidation or redirecting unauthorized users to the login screen.
* **Spatial Query Bridging:** Designed the bridge between the Leaflet.js coordinate outputs and MongoDB's geospatial query engine (`$near` coordinates) to dynamically serve nearby gyms.

### C. Core Business Logic Implementation
Our core operational rules are coded directly into the system schemas and controllers to prevent abuse and overbooking:
* **Capacity Cap Enforcement:** Prior to confirming any booking, the backend controller performs a validation check against the host gym's database field `capacityLimit` to prevent overcrowding.
* **Role-Based Access Control (RBAC):** Restricts endpoints using custom middleware. Clients are blocked from calling host management APIs, and hosts are prevented from booking sessions on other listings.
* **Secure Payment Processing Integration:** Structured database reservation schemas to hold transaction IDs generated during M-Pesa API checkout verification before activating the booking.

### D. Progress Evaluation Matrix
Using our 12-week roadmap, the project's milestones are tracking as follows:

| Phase / Feature | Target Completion | Current Status | Cybersecurity & UX Verification |
| :--- | :--- | :--- | :--- |
| **System Blueprints** | Mid-Term | **100% Complete** | Architecture locked down; ERD, Sequence, and Use Case diagrams completed. |
| **Backend Core Server** | Week 9 | **100% Complete** | Node.js Express server configured and running locally. |
| **UI/UX Core Designs** | Week 10 | **95% Complete** | Fitness training schedule interfaces and layout mockups finalized. |
| **Interactive Maps** | Week 11 | **Active** | Bridging coordinates logic with Leaflet.js map layer. |
| **RBAC Security Audit** | Week 12 | **Pending** | Scheduled verification of JWT verification parameters and session end handshakes. |

---

## 3. Technical Design Blueprints

### A. Database Schema (Entity Relationship Diagram)
An optimized NoSQL structure utilizing document referencing (`ObjectId`) to maintain clean, scalable relationships between users, active gym listings, and reservations.

![GymFlex ERD](images/GymFlex_ERD.png)

---

### B. Use Case Diagram
Maps out user interactions, functional requirements, and authentication boundaries for the client and gym host roles.

![GymFlex Use Case](images/GymFlex_UseCase.png)

---

### C. Sequence Diagram (Secure Booking Process)
Highlights the step-by-step transaction logic, specifically showcasing JWT Token verification and real-time concurrency/capacity limit validation at the backend server layer.

![GymFlex Sequence Diagram](images/GymFlex_Sequence.png)

---

## 4. Source Code Baseline (`server.js`)
The server actively runs and serves as our entry point:

```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Security Middleware
app.use(cors());
app.use(express.json()); // Sanitizes and parses incoming request bodies

// Baseline test route
app.get('/', (req, res) => {
    res.json({ message: "GymFlex Secure Backend is operational!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running securely on port ${PORT}`);
});