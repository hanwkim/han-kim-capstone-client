import "./PlaceDetails.scss";

export default function PlaceDetails({ name, hours, website }) {
    return (
        <section className="details">
            <span className="details__name">{name}</span>
            <ul className="details__hours">
                {hours && hours.map((hour) => {
                    return <li className="details__hour-item">{hour}</li>
                })}
            </ul>
            <span className="details__website">{website}</span>
        </section>
    )
}