function CallMinuteOptions({ plans, currentPlan, dispatch }) {
  function getAvailableCallMinuteOptions() {
    let options = [];

    plans.forEach((plan) => {
      if (!options.includes(plan.callMinutes)) {
        options.push(plan.callMinutes);
      }
    });

    return options;
  }

  const availableCallMinuteOptions = getAvailableCallMinuteOptions();

  return (
    <>
      <h3>Calling minutes</h3>
      <ul>
        {availableCallMinuteOptions.map((option) => (
          <li key={option}>{option === "" ? <div>Unlimited</div> : option}</li>
        ))}
      </ul>
    </>
  );
}

export default CallMinuteOptions;
