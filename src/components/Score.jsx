import { useEffect, useState } from 'react';

export default function Score({ score, type, getScore }) {
    const [scoreLength, setScoreLength] = useState();

    useEffect(() => {
        score = parseInt(score);
        setScoreLength(score);
    }, [score]);

    const handleStar = (num) => {
        if (type === 'writeReview') {
            setScoreLength(num);
            getScore(num);
        }
    };

    const renderSpans = () => {
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            if (i > scoreLength) {
                stars.push(<button className="emptyStar" key={i} onClick={() => handleStar(i)}></button>);
            } else {
                stars.push(<button className="star" key={i} onClick={() => handleStar(i)}></button>);
            }
        }
        return stars;
    };
    return (
        <>
            <div className="scoreBox">{renderSpans()}</div>
        </>
    );
}
