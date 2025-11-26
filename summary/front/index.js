const name = document.querySelector("#name");
const ingredients = document.querySelector("#ingredients");
const kcal = document.querySelector("#kcal");
const button = document.querySelector("#button");

button.addEventListener("click", async () => {
  const nameValue = name.value;
  const ingValue = ingredients.value.split(",");
  const kcalValue = kcal.value;

  const result = await fetch("http://localhost:3000/pizza", {
    method: "post",
    body: JSON.stringify({
      name: nameValue,
      ingredients: ingValue,
      kcal: kcalValue,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const msg = await result.json();
  alert(msg);

  getPizza();
});

const box = document.querySelector("#box");

const getPizza = async () => {
  const res = await fetch("http://localhost:3000/pizza");
  const data = await res.json();
  box.innerText = "";
  data.forEach((v) => {
    const div = document.createElement("div");
    div.innerText = v.name;
    box.appendChild(div);
  });
};
