import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// --- Jobs API ---

/**
 * Fetch all jobs.
 * GET /api/jobs
 */
export const getJobs = () => api.get('/jobs')

/**
 * Create a new job application entry.
 * POST /api/jobs
 * @param {{ title: string, company: string, url: string }} data
 */
export const addJob = (data) => api.post('/jobs', data)

/**
 * Mark a job as applied.
 * POST /api/jobs/:id/apply
 * @param {string} id
 */
export const applyJob = (id) => api.post(`/jobs/${id}/apply`)

/**
 * Update the status of a job.
 * PUT /api/jobs/:id
 * @param {string} id
 * @param {string} status - pending | applied | interview | rejected
 */
export const updateStatus = (id, status) => api.put(`/jobs/${id}`, { status })

export default api
