const fields = {
  pre: document.getElementById("pre"),
  post: document.getElementById("post"),
  height: document.getElementById("height"),
  weight: document.getElementById("weight"),
  bsa: document.getElementById("bsa"),
  dose: document.getElementById("dose"),
  result: document.getElementById("result")
};

function isValidPositive(value) {
  return Number.isFinite(value) && value > 0;
}

function setResult(message, isError = false) {
  fields.result.innerHTML = message;
  fields.result.style.borderColor = isError ? "#dc2626" : "#d6deea";
}

document.getElementById("calcBsa").addEventListener("click", () => {
  const h = Number(fields.height.value);
  const w = Number(fields.weight.value);

  if (!isValidPositive(h) || !isValidPositive(w)) {
    setResult("Enter valid positive values for height and weight.", true);
    return;
  }

  const bsa = Math.sqrt((h * w) / 3600);
  fields.bsa.value = bsa.toFixed(3);
  setResult(`<strong>BSA:</strong> ${bsa.toFixed(3)} m^2`);
});

document.getElementById("calcCci").addEventListener("click", () => {
  const pre = Number(fields.pre.value);
  const post = Number(fields.post.value);
  const bsa = Number(fields.bsa.value);
  const dose = Number(fields.dose.value);

  if (![pre, post, bsa, dose].every(isValidPositive)) {
    setResult("All CCI inputs must be valid positive numbers.", true);
    return;
  }

  if (post < pre) {
    setResult("Post-platelet count must be greater than or equal to pre-platelet count.", true);
    return;
  }

  const cci = ((post - pre) * bsa) / dose;

  let interpretation = "Borderline response.";
  if (cci >= 7.5) {
    interpretation = "Likely adequate increment.";
  } else if (cci < 5) {
    interpretation = "Low increment; evaluate clinical context.";
  }

  setResult(`<strong>CCI:</strong> ${cci.toFixed(2)}<br>${interpretation}`);
});

document.getElementById("reset").addEventListener("click", () => {
  [fields.pre, fields.post, fields.height, fields.weight, fields.bsa, fields.dose].forEach((input) => {
    input.value = input.defaultValue;
  });
  setResult("");
});
