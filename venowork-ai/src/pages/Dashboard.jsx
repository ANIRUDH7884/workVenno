import { useEffect, useState, useCallback } from 'react'
import AddJobForm from '../components/AddJobForm'
import JobList from '../components/JobList'
import { getJobs, addJob, applyJob, updateStatus } from '../services/api'
import './Dashboard.css'

function Dashboard() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionError, setActionError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [updatingId, setUpdatingId] = useState(null)

  const fetchJobs = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await getJobs()
      setJobs(res.data)
    } catch (err) {
      setError(err.message || 'Something went wrong while fetching jobs.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchJobs()
  }, [fetchJobs])

  const handleAddJob = async (formData) => {
    setSubmitting(true)
    setActionError('')
    try {
      await addJob(formData)
      await fetchJobs()
      return true
    } catch (err) {
      setActionError(err.message || 'Failed to add job.')
      return false
    } finally {
      setSubmitting(false)
    }
  }

  const handleApply = async (id) => {
    setUpdatingId(id)
    setActionError('')
    try {
      await applyJob(id)
      setJobs((prev) =>
        prev.map((job) => (job._id === id ? { ...job, status: 'applied' } : job))
      )
    } catch (err) {
      setActionError(err.message || 'Failed to mark job as applied.')
    } finally {
      setUpdatingId(null)
    }
  }

  const handleStatusChange = async (id, status) => {
    setUpdatingId(id)
    setActionError('')
    const previousJobs = jobs
    setJobs((prev) => prev.map((job) => (job._id === id ? { ...job, status } : job)))
    try {
      await updateStatus(id, status)
    } catch (err) {
      setActionError(err.message || 'Failed to update status.')
      setJobs(previousJobs)
    } finally {
      setUpdatingId(null)
    }
  }

  const total = jobs.length
  const appliedCount = jobs.filter((j) => j.status === 'applied').length
  const interviewCount = jobs.filter((j) => j.status === 'interview').length

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div>
          <h1 className="dashboard__title">
            Veno<span className="dashboard__title-accent">Work</span> AI
          </h1>
          <p className="dashboard__subtitle">Track and manage your job applications in one place</p>
        </div>

        <div className="dashboard__stats">
          <div className="dashboard__stat">
            <span className="dashboard__stat-value">{total}</span>
            <span className="dashboard__stat-label">Tracked</span>
          </div>
          <div className="dashboard__stat">
            <span className="dashboard__stat-value">{appliedCount}</span>
            <span className="dashboard__stat-label">Applied</span>
          </div>
          <div className="dashboard__stat">
            <span className="dashboard__stat-value">{interviewCount}</span>
            <span className="dashboard__stat-label">Interviewing</span>
          </div>
        </div>
      </header>

      <section className="dashboard__section">
        <h2 className="dashboard__section-title">Add a job</h2>
        <AddJobForm onAdd={handleAddJob} submitting={submitting} />
      </section>

      <section className="dashboard__section">
        <div className="dashboard__section-header">
          <h2 className="dashboard__section-title">Your applications</h2>
          {actionError && <span className="dashboard__action-error">{actionError}</span>}
        </div>
        <JobList
          jobs={jobs}
          loading={loading}
          error={error}
          onApply={handleApply}
          onStatusChange={handleStatusChange}
          updatingId={updatingId}
        />
      </section>
    </div>
  )
}

export default Dashboard
