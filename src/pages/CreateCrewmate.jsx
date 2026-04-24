import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { HEROES } from '../heroData'
import './CreateCrewmate.css'

function CreateCrewmate({ onAdd }) {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [selectedHeroes, setSelectedHeroes] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    setSelectedHeroes([])
  }, [])

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

    if (!name.trim()) {
      setError('Team name is required')
      return
    }

    if (selectedHeroes.length === 0) {
      setError('Please select at least one hero')
      return
    }

    try {
      const newCrewmate = await onAdd({
        name: name.trim(),
        attributes: selectedHeroes,
      })
      navigate(`/crewmate/${newCrewmate.id}`)
    } catch (err) {
      setError('Failed to create team. Please try again.')
    }
  }

  return (
    <div className="create-container">
      <h1>Create Your Dream Team</h1>

      <form onSubmit={handleSubmit} className="create-form">
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
          <h2>Select Your Heroes</h2>
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

        <div className="form-buttons">
          <button type="submit" className="submit-button">
            Create Team
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateCrewmate
