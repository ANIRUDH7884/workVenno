import './JobCard.css'

const STATUS_OPTIONS = ['pending', 'applied', 'interview', 'rejected']

function JobCard({ job, onApply, onStatusChange, isUpdating }) {
  const { _id, title, company, url, status } = job

  const handleStatusChange = (e) => {
    onStatusChange(_id, e.target.value)
  }

  return (
    <article className={`job-card status-${status}`}>
      <div className="job-card__accent" />

      <div className="job-card__body">
        <div className="job-card__top">
          <div>
            <h3 className="job-card__title">{title}</h3>
            <p className="job-card__company">{company}</p>
          </div>
          <span className={`job-card__badge badge-${status}`}>{status}</span>
        </div>

        {url && (
          <a
            className="job-card__link"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            View posting ↗
          </a>
        )}

        <div className="job-card__actions">
          <button
            className="job-card__apply-btn"
            onClick={() => onApply(_id)}
            disabled={status === 'applied' || isUpdating}
          >
            {status === 'applied' ? 'Applied' : isUpdating ? 'Applying…' : 'Apply'}
          </button>

          <select
            className="job-card__select"
            value={status}
            onChange={handleStatusChange}
            disabled={isUpdating}
            aria-label={`Update status for ${title}`}
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </article>
  )
}

export default JobCard
