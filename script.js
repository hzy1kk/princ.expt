// Botão de voltar para a página inicial
const goHomeBtn = document.getElementById("goHomeBtn");
if (goHomeBtn) {
  goHomeBtn.addEventListener("click", () => {
    window.location.href = "index.html"; // Altere se sua página inicial tiver outro nome
  });
}


  // Preserve user preference on load
  window.addEventListener("DOMContentLoaded", () => {
    const darkModePref = localStorage.getItem("darkMode");
    if (darkModePref === "true") {
      setDarkMode(true);
    }
  });


// Função para verificar as respostas do quiz (só na página inicial)
const checkAnswersBtn = document.getElementById("checkAnswersBtn");
if (checkAnswersBtn) {
  checkAnswersBtn.addEventListener("click", function() {
    // Esconde o botão de verificar respostas
    this.style.display = "none";

    // Mostra o gabarito
    document.getElementById("answerKey").style.display = "block";
    
    // Obtém as respostas do usuário
    const q1Answer = document.querySelector('input[name="q1"]:checked');
    const q2Answer = document.querySelector('input[name="q2"]:checked');
    const q3Answer = document.querySelector('input[name="q3"]:checked');
    
    // Verifica se todas as respostas foram marcadas
    if (q1Answer && q2Answer && q3Answer) {
      let score = 0;
      
      // Verifica as respostas corretas
      if (q1Answer.value === "true") score++;
      if (q2Answer.value === "false") score++;
      if (q3Answer.value === "true") score++;
      
      // Exibe o resultado
      alert(`Você acertou ${score} de 3 perguntas!\n\nConfira as explicações no gabarito abaixo.`);
    } else {
      alert("Por favor, responda todas as perguntas antes de verificar.");
      this.style.display = "block";
      document.getElementById("answerKey").style.display = "none";
    }
  });
}

// Inicializar animações de entrada
window.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${0.1 + (index * 0.15)}s`;
  });
});
