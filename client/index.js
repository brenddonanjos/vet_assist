//PROFESSIONALS
const professionalCheckAlive = async () => {
  const professionalCard = document.getElementById("professional-card-status");
  const contentSection = document.getElementById("content-professional");
  try {
    const response = await fetch("http://localhost:8000/alive");
    data = await response.json();
    contentControll(contentSection, data.alive);
    cardControll(professionalCard, data.alive);
  } catch (error) {
    console.error("Erro ao verificar servidor:", error);
    contentControll(contentSection, false);
    cardControll(professionalCard, false);
  }
};

const professionalList = async () => {
  const ul = document.getElementById("professionals-list");
  ul.innerHTML = "";
  try {
    const response = await fetch("http://localhost:8000/");
    const professionals = await response.json();
    professionals.forEach((professional) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>Nome:</strong> ${professional[1]}<br />
        <strong>CRMV:</strong> ${professional[2]}<br />
        <strong>Data de Nascimento:</strong> ${professional[3]}<br />
        <strong>Data de Cadastro:</strong> ${professional[4]}<br />`;
      ul.appendChild(li);
    });
  } catch (error) {
    console.error("Erro ao buscar profissionais:", error);
    ul.innerHTML = "Erro ao buscar profissionais";
  }
};

const professionalCreate = async () => {
  const form = document.getElementById("form-professional");
  const name = form.querySelector('[name="professional-name"]').value;
  const crmv = form.querySelector('[name="professional-crmv"]').value;
  const birthDate = form.querySelector(
    '[name="professional-birth-date"]'
  ).value;

  const payload = {
    name: name,
    crmv: crmv,
    birth_date: birthDate,
  };

  try {
    const response = await fetch("http://localhost:8000/", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const text = await response.text();
    console.log(text);
    form.reset();
    alert(text);

    professionalList();
  } catch (error) {
    console.error("Erro ao cadastrar profissional:", error);
    alert("Erro ao cadastrar profissional");
  }
};

//MEDICINES
const medicineCheckAlive = async () => {
  const medicineCard = document.getElementById("medicine-card-status");
  const contentSection = document.getElementById("content-medicine");
  try {
    const response = await fetch("http://localhost:8001/alive");
    const data = await response.json();
    contentControll(contentSection, data.alive);
    cardControll(medicineCard, data.alive);
  } catch (error) {
    console.error("Erro ao verificar servidor:", error);
    contentControll(contentSection, false);
    cardControll(medicineCard, false);
  }
};

const medicineList = async () => {
  const ul = document.getElementById("medicines-list");
  ul.innerHTML = "";
  try {
    const response = await fetch("http://localhost:8001/");
    const medicines = await response.json();
    medicines.forEach((medicine) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>Nome:</strong> ${medicine[1]}<br />
        <strong>Descrição:</strong> ${medicine[2]}<br />
        <strong>Fabricante:</strong> ${medicine[3]}<br />
        <strong>Data de Vencimento:</strong> ${medicine[4]}<br />
        <strong>Quantidade:</strong> ${medicine[5]} unidades`;
      ul.appendChild(li);
    });
  } catch (error) {
    console.error("Erro ao buscar medicamentos:", error);
    ul.innerHTML = "Erro ao buscar medicamentos";
  }
};

const medicineCreate = async () => {
  const form = document.getElementById("form-medicine");
  const name = form.querySelector('[name="medicine-name"]').value;
  const quantity = form.querySelector('[name="medicine-quantity"]').value;
  const description = form.querySelector('[name="medicine-description"]').value;
  const manufacturer = form.querySelector(
    '[name="medicine-manufacturer"]'
  ).value;
  const expirationDate = form.querySelector(
    '[name="medicine-expiration-date"]'
  ).value;

  const payload = {
    name: name,
    description: description,
    manufacturer: manufacturer,
    expiration_date: expirationDate,
    quantity: quantity,
  };

  try {
    const response = await fetch("http://localhost:8001/", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const text = await response.text();
    console.log(text);
    form.reset();
    alert(text);

    medicineList();
  } catch (error) {
    console.log(error);
    console.error("Erro ao cadastrar medicamento:", error);
    alert("Erro ao cadastrar medicamento");
  }
};
//ANIMALS
const animalCheckAlive = async () => {
  const animalCard = document.getElementById("animal-card-status");
  const contentSection = document.getElementById("content-animal");
  try {
    const response = await fetch("http://localhost:8002/alive");
    const data = await response.json();
    contentControll(contentSection, data.alive);
    cardControll(animalCard, data.alive);
  } catch (error) {
    console.error("Erro ao verificar servidor:", error);
    contentControll(contentSection, false);
    cardControll(animalCard, false);
  }
};

const animalList = async () => {
  const ul = document.getElementById("animals-list");
  ul.innerHTML = "";
  try {
    const response = await fetch("http://localhost:8002/");
    const animals = await response.json();
    animals.forEach((animal) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>Nome:</strong> ${animal[1]}<br />
        <strong>Espécie:</strong> ${animal[2]}<br />
        <strong>Raça:</strong> ${animal[3]}<br />
        <strong>Sexo:</strong> ${animal[4]}<br />
        <strong>Data de Nascimento:</strong> ${animal[5]}<br />
        <strong>Nome do Dono:</strong> ${animal[6]}`;
      ul.appendChild(li);
    });
  } catch (error) {
    console.error("Erro ao buscar animais:", error);
    ul.innerHTML = "Erro ao buscar animais";
  }
};

const animalCreate = async () => {
  const form = document.getElementById("form-animal");
  const name = form.querySelector('[name="animal-name"]').value;
  const species = form.querySelector('[name="animal-species"]').value;
  const breed = form.querySelector('[name="animal-breed"]').value;
  const sex = form.querySelector('[name="animal-sex"]').value;
  const birthDate = form.querySelector('[name="animal-birth-date"]').value;
  const ownerName = form.querySelector('[name="animal-owner-name"]').value;

  const payload = {
    name: name,
    species: species,
    breed: breed,
    sex: sex,
    birth_date: birthDate,
    owner_name: ownerName,
  };

  try {
    const response = await fetch("http://localhost:8002/", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    form.reset();

    alert(data.message);

    animalList();
  } catch (error) {
    console.error("Erro ao cadastrar animal:", error);
    alert("Erro ao cadastrar animal");
  }
};
//MÉTODOS AUXILIARES
const cardControll = (card, alive) => {
  card.classList.remove("online", "offline");
  const serviceState = card.querySelector(".state");

  if (alive) {
    card.classList.add("online");
    serviceState.textContent = "✔️ Online";
  } else {
    card.classList.add("offline");
    serviceState.textContent = "❌ Offline";
  }
};

const contentControll = (content, alive) => {
  const contentAlive = content.querySelector(".content-alive");
  const contentNotAlive = content.querySelector(".content-not-alive");
  if (alive) {
    contentAlive.style.display = "block";
    contentNotAlive.style.display = "none";
  } else {
    contentAlive.style.display = "none";
    contentNotAlive.style.display = "block";
  }
};

//Bloco ""MAIN""
document.addEventListener("DOMContentLoaded", () => {
  professionalCheckAlive();
  professionalList();

  medicineCheckAlive();
  medicineList();

  animalCheckAlive();
  animalList();

  // Loop para verificar status do servidor a cada 5 segundos
  setInterval(() => {
    professionalCheckAlive();
    medicineCheckAlive();
    animalCheckAlive();
  }, 5000);

  //Envio do form do profissional
  document
    .getElementById("btn-professional-register")
    .addEventListener("click", () => {
      professionalCreate();
    });

  document
    .getElementById("btn-professional-list")
    .addEventListener("click", () => {
      professionalList();
    });

  //Envio do form da médica
  document
    .getElementById("btn-medicine-register")
    .addEventListener("click", () => {
      medicineCreate();
    });

  document
    .getElementById("btn-medicine-list")
    .addEventListener("click", () => {
      medicineList();
    });

  //FORM ANIMAL
  document
    .getElementById("btn-animal-register")
    .addEventListener("click", () => {
      animalCreate();
    });

  document
    .getElementById("btn-animal-list")
    .addEventListener("click", () => {
      animalList();
    });

  // Menu e conteúdo
  const tabs = document.querySelectorAll(".tab-item");
  let contents = document.querySelectorAll(".section-content");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.getAttribute("data-target");
      console.log(targetId);

      // // Remove active de todas as tabs e seções
      tabs.forEach((t) => t.classList.remove("active"));
      contents.forEach((content) => content.classList.remove("active"));

      // Ativa a aba clicada e a seção correspondente
      tab.classList.add("active");
      document.getElementById(targetId).classList.add("active");
    });
  });
});
