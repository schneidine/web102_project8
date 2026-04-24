import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { supabase } from './supabaseClient'
import NavBar from './components/NavBar'
import CreateCrewmate from './pages/CreateCrewmate'
import CrewmateList from './pages/CrewmateList'
import CrewmateDetail from './pages/CrewmateDetail'
import EditCrewmate from './pages/EditCrewmate'
import './App.css'

function App() {
  const [crewmates, setCrewmates] = useState([])
  const [loading, setLoading] = useState(true)

  const parseHeroList = (heroListValue) => {
    if (!heroListValue) return []

    try {
      const parsed = JSON.parse(heroListValue)
      if (Array.isArray(parsed)) {
        return parsed.filter(Boolean)
      }
      if (parsed && typeof parsed === 'object') {
        return Object.values(parsed).filter(Boolean)
      }
      return []
    } catch {
      return []
    }
  }

  useEffect(() => {
    fetchCrewmates()
  }, [])

  const fetchCrewmates = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      const parsedData = (data || []).map((team) => ({
        ...team,
        name: team.team_name,
        attributes: parseHeroList(team.hero_list),
      }))
      setCrewmates(parsedData)
    } catch (error) {
      console.error('Error fetching teams:', error.message)
    } finally {
      setLoading(false)
    }
  }

  const addCrewmate = async (crewmateData) => {
    try {
      const { data, error } = await supabase
        .from('teams')
        .insert([
          {
            team_name: crewmateData.name,
            hero_list: JSON.stringify(crewmateData.attributes || []),
          },
        ])
        .select()

      if (error) throw error
      const parsedTeam = {
        ...data[0],
        name: data[0].team_name,
        attributes: parseHeroList(data[0].hero_list),
      }
      setCrewmates([parsedTeam, ...crewmates])
      return parsedTeam
    } catch (error) {
      console.error('Error adding team:', error.message)
      throw error
    }
  }

  const updateCrewmate = async (id, updatedData) => {
    try {
      const { data, error } = await supabase
        .from('teams')
        .update({
          team_name: updatedData.name,
          hero_list: JSON.stringify(updatedData.attributes || []),
        })
        .eq('id', id)
        .select()

      if (error) throw error
      const parsedTeam = {
        ...data[0],
        name: data[0].team_name,
        attributes: parseHeroList(data[0].hero_list),
      }
      setCrewmates(
        crewmates.map((c) => (c.id === id ? parsedTeam : c))
      )
      return parsedTeam
    } catch (error) {
      console.error('Error updating team:', error.message)
      throw error
    }
  }

  const deleteCrewmate = async (id) => {
    try {
      const { error } = await supabase
        .from('teams')
        .delete()
        .eq('id', id)

      if (error) throw error
      setCrewmates(crewmates.filter((c) => c.id !== id))
    } catch (error) {
      console.error('Error deleting team:', error.message)
      throw error
    }
  }

  return (
    <Router>
      <NavBar crewmates={crewmates} />
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={<CrewmateList crewmates={crewmates} />}
          />
          <Route
            path="/create"
            element={<CreateCrewmate onAdd={addCrewmate} />}
          />
          <Route
            path="/crewmate/:id"
            element={<CrewmateDetail crewmates={crewmates} />}
          />
          <Route
            path="/edit/:id"
            element={
              <EditCrewmate
                crewmates={crewmates}
                onUpdate={updateCrewmate}
                onDelete={deleteCrewmate}
              />
            }
          />
        </Routes>
      )}
    </Router>
  )
}

export default App
