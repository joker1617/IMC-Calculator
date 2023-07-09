const BMIData = [
  { name: "Maigreur", color: "midnightblue", range: [0, 18.5] },
  { name: "Bonne santé", color: "green", range: [18.5, 25] },
  { name: "Surpoids", color: "lightcoral", range: [25, 30] },
  { name: "Obésité modérée", color: "orange", range: [30, 35] },
  { name: "Obésité sévère", color: "crimson", range: [35, 40] },
  { name: "Obésité morbide", color: "purple", range: 40 },
];

// IMC = poids en kg / taille² en m

const form = document.querySelector("form");
// un addEventListener sur la validation du formulaire avec la fonction du calcul de l'imc (BMI) à effectuer
form.addEventListener("submit", handleForm);

function handleForm(e) {
  e.preventDefault();

  calculateBMI();
}

const inputs = document.querySelectorAll("input");

function calculateBMI() {
  const height = inputs[0].value;
  const weight = inputs[1].value;
  // Condition dans le cas ou le height ou le weight ne soit pas rempli ou inférieur à 0
  if (!height || !weight || height <= 0 || weight <= 0) {
    handleError();
    return;
  }

  const BMI = (weight / Math.pow(height / 100, 2)).toFixed(1);

  showResult(BMI);
}

const displayBMI = document.querySelector(".bmi-value");
const result = document.querySelector(".result");
// Function d'affichage si erreur
function handleError() {
  displayBMI.textContent = "Wops";
  displayBMI.computedStyleMap.color = "inherit";
  result.textContent = "Remplissez correctement les inputs";
}

// Fonction d'affichage du résultat
function showResult(BMI) {
  const rank = BMIData.find((data) => {
    if (BMI >= data.range[0] && BMI < data.range[1]) return data;
    else if (typeof data.range === "number" && BMI >= data.range) return data;
  });

  displayBMI.textContent = BMI;
  displayBMI.style.color = `${rank.color}`;
  result.textContent = `Résultat : ${rank.name}`;
}
