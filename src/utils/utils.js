export { convertMbToGbString, formatSpecialOffer };

function convertMbToGbString(dataInMb) {
  const dataInGb = dataInMb / 1000 + "GB";

  return dataInGb;
}

function formatSpecialOffer(description, data, duration) {
  const dataPattern = "{{data}}";
  const durationPattern = "{{duration}}";

  const dataInGb = convertMbToGbString(data);

  let formattedDescription = description;

  if (description.includes(dataPattern)) {
    formattedDescription = description.replaceAll(dataPattern, dataInGb);
  }

  if (formattedDescription.includes(durationPattern)) {
    formattedDescription = formattedDescription.replaceAll(
      durationPattern,
      duration
    );
  }

  return formattedDescription;
}
