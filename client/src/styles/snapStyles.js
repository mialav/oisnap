const categoryColor = (category, creation) => {
  if (!category) return {};
  let color = "";

  let maxTime = 86400000; // This number is 24 hours in ms
  let fromMiliseconds = new Date().getTime();

  if (creation) {
    fromMiliseconds = new Date(creation).getTime();
  }

  let startMiliseconds = Date.now();

  let timeDifference = startMiliseconds - fromMiliseconds;
  if (timeDifference <= 0) timeDifference = 1;

  let colorNumber = (timeDifference / maxTime) * 100; // A number from 0-100

  switch (category) {
    case "promo":
      color = `rgb(255, ${colorNumber + 50}, ${colorNumber + 50})`;
      break;
    case "happening":
      color = `rgb(${colorNumber + 100}, ${colorNumber + 100}, ${colorNumber +
        100})`;
      break;
    case "crowd":
      color = `rgb(255, 255, ${colorNumber})`;
      break;
    case "free":
      color = `rgb(${colorNumber}, ${colorNumber + 204}, ${colorNumber})`;
      break;

    default:
      color = `rgb(242, 242, 242)`;
  }

  return color;
};

export default categoryColor;
