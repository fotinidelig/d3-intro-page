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
            I primarily use <b>Python</b>, <b>D3.js</b> and <b>React</b> to create my visualizations.
          </p>
        </aside>

        <section className="main-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} aria-label="Visualization and projects">
          <div className="app-viz" style={{ width: '80%', height: '80%' }} >
            <ResponsivePortfolioSvg />
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Fotini Deligiannaki.</p>
        <p>
          Check out my website (
          <a href="https://byfotini.com" target="_blank" rel="noopener noreferrer">
            byfotini.com
          </a>
          ) and my {' '}
          <a
            className="app-footer__icon-link"
            href="https://github.com/fotinidelig"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
          >
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
              <path
                fill="currentColor"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App
