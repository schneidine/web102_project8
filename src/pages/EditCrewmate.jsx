import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { HEROES } from '../heroData'
import './EditCrewmate.css'

function EditCrewmate({ crewmates, onUpdate, onDelete }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const crewmate = crewmates.find((c) => c.id === parseInt(id))

  const [name, setName] = useState('')
  const [selectedHeroes, setSelectedHeroes] = useState([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (crewmate) {
      setName(crewmate.name)
      const initialHeroes = Array.isArray(crewmate.attributes)
        ? crewmate.attributes
        : Object.values(crewmate.attributes || {}).filter(Boolean)
      setSelectedHeroes(initialHeroes)
    }
  }, [crewmate])

  const handleHeroToggle = (heroId) => {
    setSelectedHeroes((prev) =>
      prev.includes(heroId)
        ? prev.filter((id) => id !== heroId)
        : [...prev, heroId]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!name.trim()) {
      setError('Team name is required')
      return
    }

    if (selectedHeroes.length === 0) {
      setError('Please select at least one hero')
      return
    }

    try {
      await onUpdate(crewmate.id, {
        name: name.trim(),
        attributes: selectedHeroes,
      })
      setSuccess('Team updated successfully!')
      setTimeout(() => {
        navigate(`/crewmate/${crewmate.id}`)
      }, 1500)
    } catch (err) {
      setError('Failed to update team. Please try again.')
    }
  }

  const handleDelete = async () => {
    if (
      !window.confirm(
        'Are you sure you want to delete this team? This cannot be undone.'
      )
    ) {
      return
    }

    setIsDeleting(true)
    try {
      await onDelete(crewmate.id)
      navigate('/')
    } catch (err) {
      setIsDeleting(false)
      setError('Failed to delete team. Please try again.')
    }
  }

  if (!crewmate) {
    return (
      <div className="edit-container">
        <div className="error-state">
          <h1>Team Not Found</h1>
          <button
            className="back-button"
            onClick={() => navigate('/')}
          >
            Back to Teams
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="edit-container">
      <h1>Edit Team: {crewmate.name}</h1>

      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-group">
          <label htmlFor="teamName">Team Name</label>
          <input
            id="teamName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your team name"
            className="form-input"
          />
        </div>

        <div className="attributes-section">
          <h2>Edit Your Heroes</h2>
          <p className="attributes-hint">Choose all that apply</p>

          <div className="heroes-grid">
            {HEROES.map((hero) => (
              <button
                key={hero.id}
                type="button"
                className={`hero-button ${
                  selectedHeroes.includes(hero.id) ? 'selected' : ''
                }`}
                onClick={() => handleHeroToggle(hero.id)}
              >
                <img
                  src={hero.img1}
                  alt={hero.name}
                  className="hero-image"
                />
                <span>{hero.name}</span>
              </button>
            ))}
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="form-buttons">
          <button type="submit" className="submit-button">
            Save Changes
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate(`/crewmate/${crewmate.id}`)}
          >
            Cancel
          </button>
        </div>
      </form>

      <div className="danger-zone">
        <h3>Danger Zone</h3>
        <button
          className="delete-button"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete This Team'}
        </button>
        <p className="delete-warning">
          This action cannot be undone. The team will be permanently deleted.
        </p>
      </div>
    </div>
  )
}

export default EditCrewmate
