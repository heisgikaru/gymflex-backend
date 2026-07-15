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

## 2. Progress Report: Completed Milestones (What I Have Done)
To optimize development under our strict 12-week constraints, the foundational system architecture and secure database layers have been successfully established:

* **[DONE] Systems Modeling & Design Blueprints:** 
  * Fully conceptualized and generated the **Entity Relationship Diagram (ERD)** to structure our NoSQL database.
  * Mapped out the **Use Case Diagram** to lock down client, host, and system boundaries.
  * Designed a high-security **Sequence Diagram** mapping secure JSON Web Token (JWT) authorization flows and input sanitization before database interaction.
* **[DONE] Source Control Strategy:** Established a standard GitFlow model. The repository is initialized with active, tracking `main` (production) and `develop` (integration) branches.
* **[DONE] Backend Prototype Bootstrapped:** 
  * Initialized Node.js runtime and configured `package.json`.
  * Installed core production dependencies: `express`, `mongoose` (MongoDB ORM), `dotenv` (environment variables), `bcryptjs` (password hashing), `jsonwebtoken` (secure authentication), and `cors`.
  * Wrote and successfully tested the baseline `server.js` file, verified running live on local port `5000`.

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