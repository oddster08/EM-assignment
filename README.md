# Event Management Dashboard (Frontend)

This is the Angular-based frontend for the **Event Management Dashboard**, a web application that allows users to manage events, view analytics, and filter event data. The backend part of this project is implemented using Node.js, Express.js, and a database and is located in the `backend` folder.

---

## Table of Contents  
- [Overview](#overview)  
- [Features](#features)  
- [Technologies Used](#technologies-used)  
- [Getting Started](#getting-started)  
- [Development Commands](#development-commands)  
- [Deployment](#deployment)  
- [Backend Integration](#backend-integration)  
- [Contact](#contact)  

---

## Overview  

This project demonstrates a full-stack web application for event management. The application includes:  
1. **Frontend**: Built with Angular for an interactive user experience.  
2. **Backend**: Implemented using Node.js and Express.js for REST APIs.  

---

## Features  

### Frontend Features  
1. **Event Management**  
   - Create, view, edit, and delete events.  
   - Each event includes:  
     - Event Name  
     - Date & Time  
     - Location  
     - Status (Upcoming, Ongoing, Completed)  
2. **Event Analytics**  
   - Display a dashboard with:  
     - Total events  
     - Events grouped by status  
     - Next upcoming event  
3. **Search and Filters**  
   - Search by event name or location.  
   - Filter events by status.  
4. **Event List with Pagination**  
   - Paginated and sortable event tables.  
5. **Responsive Design**  
   - Optimized for desktop and mobile devices.  

---

## Technologies Used  
- **Angular**: Framework for building the user interface.  
- **TailwindCSS**: For responsive and modern styling.  
- **RxJS**: For managing asynchronous data streams.  
- **Angular Router**: For navigation and routing.  
- **Node.js & Express.js**: For backend REST APIs (in `backend` folder).  


---

## Getting Started  

### Prerequisites  
Ensure you have the following installed:  
- [Node.js](https://nodejs.org/) (v16 or later)  
- [Angular CLI](https://angular.io/cli)  

### Installation  
1. Clone the repository:  
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the `frontend` folder:  
   ```bash
   cd frontend
   ```

3. Install dependencies:  
   ```bash
   npm install
   ```

---

## Development Commands  

### Start Development Server  
Run the Angular development server:  
```bash
ng serve
```
The app will be available at [http://localhost:4200](http://localhost:4200).  

### Build Project  
To build the project for production:  
```bash
ng build --prod
```
The production build will be available in the `dist/` folder.  

### Run Linter  
To lint the project files:  
```bash
ng lint
```

### Run Tests  
To run unit tests:  
```bash
ng test
```

---

## Deployment  

This Angular application can be deployed on platforms like [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), or any static hosting provider.  

### Deploying on Vercel  
1. Push the `frontend` folder to a Git repository.  
2. Log in to Vercel and select "New Project".  
3. Import your Git repository.  
4. Configure the framework as **Angular** (detected automatically).  
5. Deploy the project.  

---

## Backend Integration  

The backend is located in the `backend` folder. To connect the frontend with the backend:  

1. Start the backend server by navigating to the `backend` folder and following its setup instructions.  
2. Update the API endpoints in Angular services to point to the backend URL (e.g., `http://localhost:3000/api`).  

Example API call in Angular:  
```typescript
this.http.post(`http://localhost:3000/api/events`, { name, date, location, status });
```

3. For production, update the `environment.prod.ts` file with the backend URL.  


