//PROFESSIONAL
const checkAliveProfessional = async () => {
  const professionalCard = document.getElementById('professional-card-status');
  const contentSection = document.getElementById('content-professional');
  try {
    const response = await fetch('http://localhost:8000/alive');
    const text = await response.text();
    contentControll(contentSection, text === 'True');
    cardControll(professionalCard, text === 'True');
  } catch (error) {
    console.error('Erro ao verificar servidor:', error);
    contentControll(contentSection, false);
    cardControll(professionalCard, false);
  }
};

//MEDICINES
const checkAliveMedicine = async () => {
  const medicineCard = document.getElementById('medicine-card-status');
  const contentSection = document.getElementById('content-medicine');
  try {
    const response = await fetch('http://localhost:8001/alive');
    const text = await response.text();
    contentControll(contentSection, text === 'True');
    cardControll(medicineCard, text === 'True');
  } catch (error) {
    console.error('Erro ao verificar servidor:', error);
    contentControll(contentSection, false);
    cardControll(medicineCard, false);
  }
};

//ANIMALS
const checkAliveAnimal = async () => {
  const animalCard = document.getElementById('animal-card-status');
  const contentSection = document.getElementById('content-animal');
  try {
    const response = await fetch('http://localhost:8002/alive');
    const text = await response.text();
    contentControll(contentSection, text === 'True');
    cardControll(animalCard, text === 'True');
  } catch (error) {
    console.error('Erro ao verificar servidor:', error);
    contentControll(contentSection, false);
    cardControll(animalCard, false);
  }
};

//MÉTODOS AUXILIARES
const cardControll = (card, alive) => {
  card.classList.remove('online', 'offline');
  const serviceState = card.querySelector('.state');

  if (alive) {
    card.classList.add('online');
    serviceState.textContent = '✔️ Online';
  } else {
    card.classList.add('offline');
    serviceState.textContent = '❌ Offline';
  }
}

const contentControll = (content, alive) => {
  const contentAlive = content.querySelector('.content-alive');
  const contentNotAlive = content.querySelector('.content-not-alive');
  if(alive){
    contentAlive.style.display = 'block';
    contentNotAlive.style.display = 'none';
  } else {
    contentAlive.style.display = 'none';
    contentNotAlive.style.display = 'block';
  }
};

//Bloco ""MAIN""
document.addEventListener("DOMContentLoaded", () => {
  // Loop para verificar status do servidor a cada 10 segundos
  setInterval(() => {
    checkAliveProfessional();
    checkAliveMedicine();
    checkAliveAnimal();
  }, 5000); 

  // Menu e conteúdo
  const tabs = document.querySelectorAll(".tab-item");
  let contents = document.querySelectorAll(".section-content");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const targetId = tab.getAttribute("data-target");

      // // Remove active de todas as tabs e seções
      tabs.forEach(t => t.classList.remove("active"));
      contents.forEach(content => content.classList.remove("active"));

      // Ativa a aba clicada e a seção correspondente
      tab.classList.add("active");
      document.getElementById(targetId).classList.add("active");
    });
  });

});

