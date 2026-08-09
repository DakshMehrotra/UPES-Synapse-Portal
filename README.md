<div align="center">
  <img src="https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=1000&auto=format&fit=crop" alt="Synapse Portal Banner" width="100%" style="border-radius: 12px; margin-bottom: 20px;" />

  # SYNAPSE: ENTERPRISE CAPSTONE PORTAL
  
  **The definitive, production-grade project management system for the School of Computer Science (SoCS).**

  [![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Status](https://img.shields.io/badge/Status-Enterprise_Ready-10B981?style=for-the-badge&logo=checkmarx&logoColor=white)]()
  
  *Engineered for scale. Built for academics. Designed for excellence.*
</div>

---

## ARCHITECTURE OVERVIEW

Synapse is not just a student portal; it is a comprehensive, multi-tenant enterprise system designed to eliminate spreadsheet chaos and bring highly structured, auditable workflows to university capstone projects. 

By integrating automated mentor matchmaking, real-time GitHub tracking, and standardized Rubric evaluation, Synapse sets a new standard for academic infrastructure.

---

## CORE ENTERPRISE FEATURES

### 1. Advanced Analytics & Admin Dashboard
A dedicated command center for Project Cell Coordinators. Features a global view of student group formations, mentor utilization heatmaps, and dynamic grading curves. Identifies bottlenecks in mentor allocations instantly.

### 2. GitHub & Turnitin Integrations
Directly integrates into the student workflow. Dashboards feature a 15-week GitHub contribution graph (identical to native GitHub aesthetics) and Turnitin Plagiarism validation badges for every milestone deliverable.

### 3. Real-Time Chat & Activity Feed
Embedded directly within the Agile Kanban board. Mentors and students can communicate contextually without ever leaving the tracking portal. Mentor messages are officially verified with administrative badges.

### 4. Interactive Meeting Scheduler
A standardized calendar grid replacing informal scheduling. Students can view available faculty slots in real-time and book presentation defenses with a single click, instantly logging the request for mentor approval.

### 5. Intra-Group Peer Evaluation
Confidential peer review system integrated into the Evaluation Hub. Students can confidentially score their teammates' contributions using sliders and private text feedback, ensuring transparent and fair individual grading.

### 6. One-Click PDF Report Generation
Seamless transition from digital portal to physical documentation. A highly engineered CSS print layout strips away navigation and UI elements, instantly formatting the 5-Parameter Rubric evaluations into a crisp, official A4 university document.

### 7. AI Mentor Matchmaker
Automatically calculates compatibility scores (0-100%) between student abstracts and faculty research domains using optimized keyword algorithms.

---

## ROLE-BASED ACCESS CONTROL (RBAC)

The system strictly isolates interfaces and capabilities based on authentication tiers:

- **Student Access:** Kanban tracking, deliverable submissions, peer reviews, and meeting requests.
- **Faculty Access:** Interactive rubric grading, attendance tracking, chat moderation, and defense approvals.
- **Admin/Coordinator Access:** System-wide analytics, global user management, and official circular broadcasting.

---

## QUICK START DEPLOYMENT

Get the environment running locally in under 60 seconds.

### Prerequisites
Ensure Node.js (v18 or higher) is installed on your system.

### Initialization

```bash
# Clone the repository
git clone https://github.com/DakshMehrotra/UPES-Synapse-Portal.git

# Navigate into the workspace
cd UPES-Synapse-Portal

# Install dependencies
npm install

# Initialize the Vite development server
npm run dev
```

The portal will be accessible immediately at `http://localhost:5173`.

---

## AUTHENTICATION DIRECTORY

The system is pre-populated with a comprehensive mocked database simulating the `@stu.upes.ac.in` Microsoft SSO architecture. Use the provided login portal UI or reference the standard credentials below:

| Access Tier | Email ID | Password |
| :--- | :--- | :--- |
| **Student** | `Daksh.125960@stu.upes.ac.in` | `[Any Password]` |
| **Faculty Mentor** | `tanupriya.c@ddn.upes.ac.in` | `[Any Password]` |
| **System Admin** | `projectcell.socs@ddn.upes.ac.in` | `[Any Password]` |

---

## TECHNICAL FOUNDATION

- **Framework:** React 18
- **Build Engine:** Vite
- **Styling Architecture:** Vanilla CSS3 + Global Design Tokens
- **Iconography:** Lucide React
- **State Management:** React Context API
- **Version Control:** Git / GitHub

---

<div align="center">
  <b>Engineered with precision for UPES SoCS</b><br>
  <i>"University of Tomorrow"</i>
</div>
