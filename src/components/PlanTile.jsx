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
      <h3 className="plan-tile-title">{plan.name}</h3>

      <ul className="plan-features">
        <li>
          {plan.data === "" ? (
            <span className="plan-feature-highlight">Unlimited data</span>
          ) : (
            <>
              <span className="plan-feature-highlight">
                {convertMbToGbString(plan.data)}
              </span>{" "}
              of data
            </>
          )}
        </li>
        <li>
          {plan.callMinutes === "" ? (
            <span className="plan-feature-highlight">Unlimited </span>
          ) : (
            <span className="plan-feature-highlight">{plan.callMinutes} </span>
          )}
          call minutes
        </li>
      </ul>

      <div className="plan-price">${plan.price}/month</div>

      {plan.specialOffer !== "" ? (
        <div
          className="plan-offer"
          dangerouslySetInnerHTML={specialOfferMarkup}
        ></div>
      ) : null}
    </li>
  );
}

export default PlanTile;
