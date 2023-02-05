import './VersusPage.scss';

export default function VersusPage() {
    return (
        <section className="versus">
            <div className="versus__title-container">
                <h1 className="versus__title">Showdown</h1>
            </div>

            <section className="versus__container">
                <div className="versus__card"></div>
                <span className="versus__text">VS</span>
                <div className="versus__card"></div>
            </section>

            <div className="versus__button-container">
                <button className="versus__button">Fight</button>
            </div>
        </section>
    )
}