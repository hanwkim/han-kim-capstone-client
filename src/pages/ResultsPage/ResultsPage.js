import './ResultsPage.scss';

export default function ResultsPage() {
    return (
        <section className="results">
            <section className="results__header">
                <div className="results__winner"></div>
                <div className="results__header-text">
                    <h2 className="results__header-title">Winner</h2>
                    <h3 className="results__header-subtitle">Pizza</h3>
                </div>
            </section>

            <section className="results__listings-container">
                <h2 className="results__listings-title">Results</h2>
                <section className="results__listings">

                </section>

                <div className="results__filter-container">
                    <span className="results__filter-price">Price: $$$$</span>
                    <span className="results__filter-open">Open Now?</span>
                    <button className="results__filter-button">Apply</button>
                </div>
            </section>

            <section className="results__details-container">
                <h2 className="results__details-title">Details</h2>
            </section>
        </section>
    )
}