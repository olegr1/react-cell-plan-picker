import PlanTile from "./PlanTile";

function PlansPane({ plans, currentPlanId }) {
  return (
    <div className="plans-pane">
      <h2 className="pane-title">Available Plans</h2>

      <ul className="plans-list">
        {plans.map((plan) => (
          <PlanTile
            plan={plan}
            isCurrent={plan.id === currentPlanId}
            key={plan.id}
          />
        ))}
      </ul>
    </div>
  );
}

export default PlansPane;
