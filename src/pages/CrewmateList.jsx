import { Link } from 'react-router-dom'
import { getHeroImage } from '../heroData'
import './CrewmateList.css'

function CrewmateList({ crewmates }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="list-container">
      <div className="list-header">
        <h1>Your Dream Teams</h1>
        <Link to="/create" className="create-button">
          + Create New Team
        </Link>
      </div>

      {crewmates.length === 0 ? (
        <div className="empty-state">
          <h2>No teams yet!</h2>
          <p>Start by creating your first dream team.</p>
          <Link to="/create" className="create-button-large">
            Create Your First Team
          </Link>
        </div>
      ) : (
        <div className="teams-grid">
          {crewmates.map((crewmate) => {
            const selectedHeroes = Array.isArray(crewmate.attributes)
              ? crewmate.attributes
              : Object.values(crewmate.attributes || {}).filter(Boolean)

            return (
              <Link
                key={crewmate.id}
                to={`/crewmate/${crewmate.id}`}
                className="team-card"
              >
                <div className="team-card-header">
                  <h3>{crewmate.name}</h3>
                  <span className="team-date">
                    {formatDate(crewmate.created_at)}
                  </span>
                </div>

                <div className="team-heroes">
                  {selectedHeroes.map(
                    (heroId, index) =>
                      heroId && (
                        <img
                          key={`${heroId}-${index}`}
                          src={getHeroImage(heroId, true)}
                          alt={heroId}
                          className="team-hero-img"
                        />
                      )
                  )}
                </div>

                <div className="team-card-footer">
                  <span className="view-details">View Details →</span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default CrewmateList
