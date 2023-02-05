import './CharacterSelectPage.scss';

export default function CharacterSelectPage() {
    return (
        <section className="character-select">
            <div className="character-select__title-container">
                <h1 className="character-select__title">Character Select</h1>
            </div>
            
            <section className="character-select__player-container">
                <div className="character-select__player"></div>
                <div className="character-select__player"></div>
            </section>

            <section className="character-select__character-grid">
                <div className="character-select__character"></div>
                <div className="character-select__character"></div>
                <div className="character-select__character"></div>
                <div className="character-select__character"></div>
                <div className="character-select__character"></div>
                <div className="character-select__character"></div>
                <div className="character-select__character"></div>
                <div className="character-select__character"></div>
                <div className="character-select__character"></div>
                <div className="character-select__character"></div>
            </section>
        </section>
    )
}