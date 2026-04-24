import { useState } from 'react'
import { Link } from 'react-router-dom'
import miraculousLogo from '../assets/Miraculous_(franchise_logo).png'
import './NavBar.css'

function NavBar({ crewmates }) {
  const [showPopup, setShowPopup] = useState(false)

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <img
              src={miraculousLogo}
              alt="Miraculous Dream Teams"
              className="nav-logo-image"
            />
          </Link>
          <button
            className="nav-button"
            onClick={() => setShowPopup(!showPopup)}
          >
            View Teams
          </button>
        </div>
      </nav>

      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Your Teams</h2>
              <button
                className="popup-close"
                onClick={() => setShowPopup(false)}
              >
                ✕
              </button>
            </div>
            {crewmates.length === 0 ? (
              <p className="empty-message">No teams created yet</p>
            ) : (
              <ul className="teams-list">
                {crewmates.map((crewmate) => (
                  <li key={crewmate.id}>
                    <Link
                      to={`/crewmate/${crewmate.id}`}
                      onClick={() => setShowPopup(false)}
                    >
                      {crewmate.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default NavBar
