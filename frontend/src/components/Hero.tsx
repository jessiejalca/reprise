import './Hero.css';

function Hero({ collapsed = false }: { collapsed?: boolean }) {
    return (
        <section className={collapsed ? 'hero collapsed' : 'hero'} aria-labelledby="hero-heading" inert={collapsed}>
            <div className="hero-content">
                <h1 id="hero-heading" className='type-display'>Learn the song you love</h1>
                <p className="subtitle">Search a track in the language you're learning</p>
            </div>
        </section>
    )
}

export default Hero
