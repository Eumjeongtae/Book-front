export default function Score({ score }) {

    const renderSpans = () => {
        const stars = [];

        for (let i = 1; i <= 5; i++) {

            if (i > score) {
                stars.push(<span className="emptyStar"></span>);
            } else {

                stars.push(<span className="star"></span>);
            }
        }
        return stars;
    };
    return (
        <>
            <div className="scoreBox">
                {renderSpans()}
            </div>

        </>
    );
}