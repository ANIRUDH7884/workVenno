# VenoWork AI — Job Application Tracker

A clean, dark-themed React frontend for tracking job applications.

## Stack

- React 18 + Vite
- Axios for API calls
- Plain CSS (design tokens in `src/index.css`)

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` and expects a backend API at
`http://localhost:5000/api` with the following endpoints:

| Method | Endpoint              | Description                     |
|--------|------------------------|----------------------------------|
| GET    | `/api/jobs`             | List all jobs                   |
| POST   | `/api/jobs`             | Create a job (`title`, `company`, `url`) |
| POST   | `/api/jobs/:id/apply`   | Mark a job as applied           |
| PUT    | `/api/jobs/:id`         | Update a job's status (`status`) |

Each job is expected to look like:

```json
{
  "id": "1",
  "title": "Frontend Engineer",
  "company": "Acme Corp",
  "url": "https://acme.com/careers/frontend-engineer",
  "status": "pending"
}
```

`status` is one of `pending`, `applied`, `interview`, `rejected`.

## Folder structure

```
src/
 ├── components/
 │    ├── JobCard.jsx       # single job card: status badge, apply button, status dropdown
 │    ├── JobList.jsx       # grid of JobCards + loading/empty/error states
 │    ├── AddJobForm.jsx    # form to add a new job
 ├── pages/
 │    ├── Dashboard.jsx     # holds jobs state, wires forms/list to the API
 ├── services/
 │    ├── api.js            # central axios instance + getJobs/addJob/applyJob/updateStatus
 ├── App.jsx
 ├── main.jsx
```

## Build

```bash
npm run build
```
