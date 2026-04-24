import { useParams, Link, useNavigate } from 'react-router-dom'
import { getHeroImage, getHeroById } from '../heroData'
import './CrewmateDetail.css'

function CrewmateDetail({ crewmates }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const crewmate = crewmates.find((c) => c.id === parseInt(id))

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (!crewmate) {
    return (
      <div className="detail-container">
        <div className="error-state">
          <h1>Team Not Found</h1>
          <p>This team doesn't exist or has been deleted.</p>
          <Link to="/" className="back-button">
            Back to Teams
          </Link>
        </div>
      </div>
    )
  }

  const selectedHeroes = Array.isArray(crewmate.attributes)
    ? crewmate.attributes
    : Object.values(crewmate.attributes || {}).filter(Boolean)

  return (
    <div className="detail-container">
      <div className="detail-header">
        <Link to="/" className="back-link">
          ← Back to Teams
        </Link>
      </div>

      <div className="detail-content">
        <div className="detail-title-section">
          <h1>{crewmate.name}</h1>
          <p className="detail-meta">
            Created: {formatDate(crewmate.created_at)}
          </p>
        </div>

        <div className="team-composition">
          <h2>Team Composition</h2>
          {selectedHeroes.length === 0 ? (
            <div className="empty-slot">
              <p>No heroes selected for this team.</p>
            </div>
          ) : (
            <div className="composition-grid">
              {selectedHeroes.map((heroId) => {
                const hero = getHeroById(heroId)
                if (!hero) return null

                return (
                  <div key={heroId} className="composition-item">
                    <div className="hero-display">
                      <img
                        src={getHeroImage(heroId, true)}
                        alt={hero.name}
                        className="hero-display-img"
                      />
                      <p className="hero-name">{hero.name}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="detail-section">
          <h2>Team Details</h2>
          <div className="details-info">
            <p>
              <strong>Team Name:</strong> {crewmate.name}
            </p>
            <p>
              <strong>Number of Heroes:</strong>{' '}
              {selectedHeroes.length}
            </p>
            <p>
              <strong>Created:</strong> {formatDate(crewmate.created_at)}
            </p>
          </div>
        </div>

        <div className="action-buttons">
          <Link to={`/edit/${crewmate.id}`} className="edit-button">
            Edit Team
          </Link>
          <Link to="/" className="back-button">
            Back to Teams
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CrewmateDetail
