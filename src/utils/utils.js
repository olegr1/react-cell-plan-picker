export { convertMbToGbString, formatSpecialOffer };

function convertMbToGbString(dataInMb, accessible = false) {
  const unitName = accessible ? " Gigabytes" : "GB";

  const dataInGb = dataInMb / 1000 + unitName;

  return dataInGb;
}

function formatSpecialOffer(description, data, duration, accessible = false) {
  if (!description) return;

  const dataPattern = "{{data}}";
  const durationPattern = "{{duration}}";

  const dataInGb = convertMbToGbString(data);

  let formattedDescription = description;

  if (description.includes(dataPattern)) {
    formattedDescription = description.replaceAll(
      dataPattern,
      wrapInHighlight(dataInGb, accessible)
    );
  }

  if (formattedDescription.includes(durationPattern)) {
    formattedDescription = formattedDescription.replaceAll(
      durationPattern,
      wrapInHighlight(duration, accessible)
    );
  }

  return formattedDescription;
}

function wrapInHighlight(text, accessible) {
  return accessible ? text : `<span class="offer-highlight">${text}</span>`;
}
