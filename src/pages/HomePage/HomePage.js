import "./HomePage.scss";

export default function HomePage() {
	return (
        <main className="main">
            <div className="main__title-container">
                <span className="main__title">Food</span>
                <span className="main__title">Fight</span>
            </div>
            <section className="main__links">
                <span className="main__link">New Game</span>
                <span className="main__link">Savory Showdown</span>
                <span className="main__link">Sweet Showdown</span>
            </section>
        </main>
        );
}
