/** @jsx jsx */
import React, { useEffect, useState } from 'react'
import { jsx } from 'theme-ui'
import { Container } from 'theme-ui'
import Layout from 'gatsby-theme-musician/src/components/layout'

const API = process.env.GATSBY_API_URL || 'http://localhost:3000'

const MOCK_DATA = [
  { rank: 1, recommender: 'alexj', song: 'Midnight Rain', artist: 'Taylor Swift', streams: 4821, spotifyPopularity: 78, score: 61.8 },
  { rank: 2, recommender: 'nico_b', song: 'Flowers', artist: 'Miley Cyrus', streams: 3902, spotifyPopularity: 85, score: 45.9 },
  { rank: 3, recommender: 'marisol', song: 'As It Was', artist: 'Harry Styles', streams: 3100, spotifyPopularity: 92, score: 33.7 },
  { rank: 4, recommender: 'djkev', song: 'Creepin\'', artist: 'Metro Boomin', streams: 2450, spotifyPopularity: 71, score: 34.5 },
  { rank: 5, recommender: 'priya_m', song: 'Escapism', artist: 'RAYE', streams: 2100, spotifyPopularity: 62, score: 33.9 },
  { rank: 6, recommender: 'tomasz', song: 'Lift Me Up', artist: 'Rihanna', streams: 1800, spotifyPopularity: 80, score: 22.5 },
  { rank: 7, recommender: 'lena_w', song: 'Anti-Hero', artist: 'Taylor Swift', streams: 1650, spotifyPopularity: 95, score: 17.4 },
  { rank: 8, recommender: 'kaito', song: 'I Ain\'t Worried', artist: 'OneRepublic', streams: 1400, spotifyPopularity: 73, score: 19.2 },
]

function ScoreBar({ score, max }) {
  const pct = Math.min((score / max) * 100, 100)
  return (
    <div sx={{ bg: 'bgAccent', borderRadius: 4, height: 8, width: '100%' }}>
      <div sx={{ bg: 'primary', borderRadius: 4, height: 8, width: `${pct}%`, transition: 'width 0.6s ease' }} />
    </div>
  )
}

function RankBadge({ rank }) {
  const colors = { 1: '#FFD700', 2: '#C0C0C0', 3: '#CD7F32' }
  const bg = colors[rank] || '#e9ecef'
  const textColor = rank <= 3 ? '#fff' : '#495057'
  return (
    <span sx={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 32, height: 32, borderRadius: '50%',
      fontSize: 1, fontWeight: 700,
      backgroundColor: bg, color: textColor,
    }}>
      {rank}
    </span>
  )
}

const LeaderboardPage = ({ location }) => {
  const [entries, setEntries] = useState(MOCK_DATA)
  const [period, setPeriod] = useState('week')
  const maxScore = Math.max(...entries.map(e => e.score))

  useEffect(() => {
    const controller = new AbortController()
    fetch(`${API}/leaderboard?period=${period}`, { signal: controller.signal })
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length) setEntries(data) })
      .catch(() => {})
    return () => controller.abort()
  }, [period])

  return (
    <Layout location={location}>
      <Container sx={{ py: [4, 5], maxWidth: 800 }}>
        <h1 sx={{ fontSize: [4, 5], mb: 1 }}>Global Leaderboard</h1>
        <p sx={{ color: 'muted', mb: 4, mt: 0 }}>
          Score = your friends' streams ÷ artist's Spotify popularity. High score means you're finding hidden gems.
        </p>

        <div sx={{ display: 'flex', gap: 2, mb: 4 }}>
          {['week', 'month', 'alltime'].map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              sx={{
                px: 3, py: 1, borderRadius: 20, border: '1px solid',
                borderColor: period === p ? 'primary' : 'bgAccent',
                bg: period === p ? 'primary' : 'background',
                color: period === p ? '#fff' : 'text',
                cursor: 'pointer', fontSize: 1,
              }}
            >
              {{ week: 'This week', month: 'This month', alltime: 'All time' }[p]}
            </button>
          ))}
        </div>

        <div sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {entries.map((entry, i) => (
              <div
                key={i}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '40px 1fr auto',
                  alignItems: 'center',
                  gap: 3,
                  p: 3,
                  borderRadius: 8,
                  bg: 'bgAccent',
                  border: entry.rank === 1 ? '1px solid #FFD700' : 'none',
                }}
              >
                <RankBadge rank={entry.rank} />

                <div>
                  <div sx={{ fontWeight: 700, fontSize: 2 }}>{entry.song}</div>
                  <div sx={{ color: 'muted', fontSize: 1 }}>
                    {entry.artist} · recommended by <strong>{entry.recommender}</strong>
                  </div>
                  <div sx={{ mt: 2 }}>
                    <ScoreBar score={entry.score} max={maxScore} />
                  </div>
                  <div sx={{ display: 'flex', gap: 3, mt: 1, fontSize: 0, color: 'muted' }}>
                    <span>{entry.streams.toLocaleString()} streams</span>
                    <span>Spotify popularity: {entry.spotifyPopularity}</span>
                  </div>
                </div>

                <div sx={{ textAlign: 'right' }}>
                  <div sx={{ fontSize: 3, fontWeight: 700, color: 'primary' }}>
                    {entry.score.toFixed(1)}
                  </div>
                  <div sx={{ fontSize: 0, color: 'muted' }}>score</div>
                </div>
              </div>
            ))}
          </div>

        <p sx={{ mt: 4, fontSize: 0, color: 'muted' }}>
          Showing mock data — connect the backend to see live scores.
        </p>
      </Container>
    </Layout>
  )
}

export default LeaderboardPage
