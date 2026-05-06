import './App.css'
import { ResponsivePortfolioSvg } from './PortfolioSvg.jsx'

function App() {
  return (
    <div className="app">
      <main className="app-main">
        <aside className="app-profile" aria-label="About">
          <div className="app-avatar" role="img" aria-label="Profile picture placeholder" >
            <img src="/profil_pic.jpg" alt="Profile picture" />
            </div>
          <h1 className="app-title">Fotini Deligiannaki</h1>
          <p className="app-bio" style={{ textAlign: 'center' }}>
            <span style={{ fontStyle: 'italic', color: 'grey'}}>~~ Welcome to my little data corner ~~</span> <br /><br />Here you can explore my data visualization projects. <br />
            I priamarily use Python, D3 and React to create my visualizations (check my <a href="https://github.com/fotinidelig" target="_blank" rel="noopener noreferrer">GitHub</a> for more details).
          </p>
        </aside>

        <section className="app-viz" aria-label="Visualization and projects">
          <ResponsivePortfolioSvg />
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
