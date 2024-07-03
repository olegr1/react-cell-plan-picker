import { convertMbToGbString, formatSpecialOffer } from "../utils/utils.js";

function PlanTile({ plan, isCurrent }) {
  const specialOfferString = formatSpecialOffer(
    plan.specialOffer.description,
    plan.specialOffer.data,
    plan.specialOffer.duration
  );

  const specialOfferMarkup = { __html: specialOfferString };

  return (
    <li
      className={`plan-tile ${isCurrent ? "plan-tile--current" : ""}`}
      key={plan.id}
    >
      <h3>{plan.name}</h3>
      <div className="plan-data">
        {plan.data === ""
          ? "Unlimited data"
          : `${convertMbToGbString(plan.data)} of data`}
      </div>
      <div className="plan-price">
        {plan.callMinutes === "" ? "Unlimited" : plan.callMinutes} call minutes
      </div>

      <div className="plan-price">${plan.price}</div>

      {plan.specialOffer !== "" ? (
        <div
          className="special-offer"
          dangerouslySetInnerHTML={specialOfferMarkup}
        ></div>
      ) : null}
    </li>
  );
}

export default PlanTile;
