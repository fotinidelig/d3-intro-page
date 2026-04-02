import './App.css'
import PortfolioSvg from './PortfolioSvg.jsx'

function App() {
  return (
    <div className="app">
      <main className="app-main">
        <aside className="app-profile" aria-label="About">
          <div className="app-avatar" role="img" aria-label="Profile picture placeholder" >
            <img src="/profil_pic.jpg" alt="Profile picture" />
            </div>
          <h1 className="app-title">Fotini Deligiannaki</h1>
          <p className="app-bio">
            A short message about yourself and this page — data visualization with D3 and React.
          </p>
        </aside>

        <section className="app-viz" aria-label="Visualization and projects">
          <PortfolioSvg width={1200} height={690} />
        </section>
      </main>

      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Fotini Deligiannaki. All rights reserved.</p>
        <p>View on <a href="https://github.com/fotini-deligiannaki/d3-intro-page" target="_blank" rel="noopener noreferrer">GitHub</a></p>
      </footer>
    </div>
  )
}

export default App
