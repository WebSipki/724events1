import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);// Le setIndex ne dépasse plus les bornes → plus de page blanche.
  // Tri du plus ancien au plus récent
  const byDateAsc = data?.focus 
    .slice()
    .sort((A, B) => new Date(A.date) - new Date(B.date));

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) => prevIndex < byDateAsc.length - 1 ? prevIndex + 1 : 0);
    }, 5000);
    return () => clearTimeout(timer);
  }, [index, byDateAsc]);

  return (
    <div className="SlideCardList">
      {byDateAsc?.map((evt) => (
          <div
            key={`${evt.title}-${evt.date}`}
            className={`SlideCard SlideCard--${index === byDateAsc.indexOf(evt) ? "display" : "hide"}`}
          >
            <img src={evt.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{evt.title}</h3>
                <p>{evt.description}</p>
                <div>{getMonth(new Date(evt.date))}</div>
              </div>
            </div>
          </div>
          ))}
               
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateAsc?.map((evt) => (
                <input
                  key={`radio-${evt.title}-${evt.date}`}
                  type="radio"
                  name="radio-button"
                  checked={index === byDateAsc.indexOf(evt)}
                  readOnly
                />
              ))}
            </div>
          </div>
    </div>
  );
};

export default Slider;
