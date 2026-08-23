import { useState } from 'react'
import './AddJobForm.css'

const EMPTY_FORM = { title: '', company: '', url: '' }

function AddJobForm({ onAdd, submitting }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [formError, setFormError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.title.trim() || !form.company.trim()) {
      setFormError('Title and company are required.')
      return
    }

    setFormError('')
    const success = await onAdd(form)
    if (success) {
      setForm(EMPTY_FORM)
    }
  }

  return (
    <form className="add-job-form" onSubmit={handleSubmit}>
      <div className="add-job-form__fields">
        <div className="add-job-form__field">
          <label htmlFor="title">Job title</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="e.g. Frontend Engineer"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div className="add-job-form__field">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            name="company"
            type="text"
            placeholder="e.g. Acme Corp"
            value={form.company}
            onChange={handleChange}
          />
        </div>

        <div className="add-job-form__field add-job-form__field--wide">
          <label htmlFor="url">Job URL</label>
          <input
            id="url"
            name="url"
            type="url"
            placeholder="https://company.com/careers/role"
            value={form.url}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="add-job-form__footer">
        {formError && <span className="add-job-form__error">{formError}</span>}
        <button type="submit" className="add-job-form__submit" disabled={submitting}>
          {submitting ? 'Adding…' : '+ Add job'}
        </button>
      </div>
    </form>
  )
}

export default AddJobForm
