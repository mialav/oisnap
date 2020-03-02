const categoryColor = (category, creation) => {
  let styles = {};

  // Markus' math
  // MAX: 86400000
  // Notes: 1583080197770
  let maxTime = 86400000; // This number is 24 hours in ms
  let fromMiliseconds = new Date().getTime();
  if (creation) {
    fromMiliseconds = creation.getTime();
  }
  let startMiliseconds = Date.now();

  let timeDifference = startMiliseconds - fromMiliseconds;
  if (timeDifference <= 0) timeDifference = 1;

  let colorNumber = (timeDifference / maxTime) * 100; // A number from 0-100

  switch (category) {
    case "promo":
      styles.backgroundColor = `rgb(255, ${colorNumber + 50}, ${colorNumber +
        50})`;
      break;
    case "happening":
      styles.backgroundColor = `rgb(${colorNumber + 100}, ${colorNumber +
        100}, ${colorNumber + 100})`;
      break;
  }

  console.log(fromMiliseconds);
  console.log(startMiliseconds);

  return styles;
};

export default categoryColor;
