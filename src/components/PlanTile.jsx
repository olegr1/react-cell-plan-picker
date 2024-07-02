import { convertMbToGbString, formatSpecialOffer } from "../utils/utils.js";

function PlanTile({ plan, isCurrent }) {
  return (
    <li
      className="plan-tile"
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
        <div className="special-offer">
          {formatSpecialOffer(
            plan.specialOffer.description,
            plan.specialOffer.data,
            plan.specialOffer.duration
          )}
        </div>
      ) : null}
    </li>
  );
}

export default PlanTile;
