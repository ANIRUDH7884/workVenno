import JobCard from './JobCard'
import './JobList.css'

function JobList({ jobs, loading, error, onApply, onStatusChange, updatingId }) {
  if (loading) {
    return (
      <div className="job-list__state">
        <div className="spinner" />
        <p>Loading your applications…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="job-list__state job-list__state--error">
        <p>Couldn't load jobs: {error}</p>
      </div>
    )
  }

  if (!jobs || jobs.length === 0) {
    return (
      <div className="job-list__state">
        <p>No jobs tracked yet.</p>
        <span>Add your first job above to start tracking applications.</span>
      </div>
    )
  }

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobCard
          key={job._id}
          job={job}
          onApply={onApply}
          onStatusChange={onStatusChange}
          isUpdating={updatingId === job._id}
        />
      ))}
    </div>
  )
}

export default JobList
