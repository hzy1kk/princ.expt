// Configuração dos gráficos
function initCharts() {
  // Cores para o modo claro e escuro
  function getColors() {
    const isDark = document.documentElement.classList.contains("dark");
    return {
      line1: isDark ? "#3b82f6" : "#125cdb", // Azul para perda de gelo
      line2: isDark ? "#ef4444" : "#dc2626", // Vermelho para elevação do nível do mar
      grid: isDark ? "#475569" : "#e0e7ff",
      text: isDark ? "#e0e7ff" : "#0f172a"
    };
  }

  let colors = getColors();

  // Dados para o gráfico de perda de massa de gelo
  const iceMassData = {
    labels: ["1990", "1995", "2000", "2005", "2010", "2015", "2020", "2023"],
    datasets: [
      {
        label: "Perda Anual de Massa de Gelo (Gt/ano)",
        data: [200, 250, 350, 450, 550, 650, 800, 950],
        borderColor: colors.line1,
        backgroundColor: "rgba(18, 92, 219, 0.2)",
        fill: true,
        tension: 0.3,
        pointRadius: 5,
        pointBackgroundColor: colors.line1,
        pointHoverRadius: 7
      }
    ]
  };

  const iceMassOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: colors.text,
          font: {
            size: 14,
            weight: "700"
          }
        }
      },
      tooltip: {
        enabled: true,
        mode: 'nearest',
        intersect: false,
      }
    },
    scales: {
      x: {
        ticks: {
          color: colors.text,
          font: {
            size: 14
          }
        },
        grid: {
          color: colors.grid
        }
      },
      y: {
        type: 'linear',
        display: true,
        title: {
          display: true,
          text: 'Perda de Massa de Gelo (Gt/ano)',
          color: colors.text
        },
        ticks: {
          color: colors.text,
          font: {
            size: 14
          }
        },
        grid: {
          color: colors.grid
        }
      }
    }
  };

  // Dados para o gráfico de elevação do nível do mar
  const seaLevelData = {
    labels: ["1990", "1995", "2000", "2005", "2010", "2015", "2020", "2023"],
    datasets: [
      {
        label: "Elevação do Nível do Mar (mm/ano)",
        data: [1.5, 1.8, 2.2, 2.6, 3.0, 3.5, 4.2, 4.8],
        borderColor: colors.line2,
        backgroundColor: "rgba(220, 38, 38, 0.2)",
        fill: true,
        tension: 0.3,
        pointRadius: 5,
        pointBackgroundColor: colors.line2,
        pointHoverRadius: 7
      }
    ]
  };

  const seaLevelOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: colors.text,
          font: {
            size: 14,
            weight: "700"
          }
        }
      },
      tooltip: {
        enabled: true,
        mode: 'nearest',
        intersect: false,
      }
    },
    scales: {
      x: {
        ticks: {
          color: colors.text,
          font: {
            size: 14
          }
        },
        grid: {
          color: colors.grid
        }
      },
      y: {
        type: 'linear',
        display: true,
        title: {
          display: true,
          text: 'Elevação do Nível do Mar (mm/ano)',
          color: colors.text
        },
        ticks: {
          color: colors.text,
          font: {
            size: 14
          }
        },
        grid: {
          color: colors.grid
        }
      }
    }
  };

  // Criar os gráficos
  const iceMassCtx = document.getElementById('iceMassChart');
  const seaLevelCtx = document.getElementById('seaLevelChart');
  
  if (iceMassCtx && seaLevelCtx) {
    let iceMassChart = new Chart(iceMassCtx, {
      type: "line",
      data: iceMassData,
      options: iceMassOptions
    });

    let seaLevelChart = new Chart(seaLevelCtx, {
      type: "line",
      data: seaLevelData,
      options: seaLevelOptions
    });

    // Função para atualizar cores dos gráficos
    function updateChartColors() {
      colors = getColors();
      
      // Atualizar cores do gráfico de massa de gelo
      iceMassChart.data.datasets[0].borderColor = colors.line1;
      iceMassChart.data.datasets[0].pointBackgroundColor = colors.line1;
      iceMassChart.data.datasets[0].backgroundColor = "rgba(18, 92, 219, 0.2)";
      
      // Atualizar cores do gráfico de nível do mar
      seaLevelChart.data.datasets[0].borderColor = colors.line2;
      seaLevelChart.data.datasets[0].pointBackgroundColor = colors.line2;
      seaLevelChart.data.datasets[0].backgroundColor = "rgba(220, 38, 38, 0.2)";
      
      // Atualizar cores dos eixos e textos
      [iceMassChart, seaLevelChart].forEach(chart => {
        chart.options.plugins.legend.labels.color = colors.text;
        chart.options.scales.x.ticks.color = colors.text;
        chart.options.scales.x.grid.color = colors.grid;
        chart.options.scales.y.ticks.color = colors.text;
        chart.options.scales.y.grid.color = colors.grid;
        chart.options.scales.y.title.color = colors.text;
      });
      
      iceMassChart.update();
      seaLevelChart.update();
    }

    // Botões para baixar os gráficos
    const downloadBtn1 = document.getElementById('downloadBtn1');
    const downloadBtn2 = document.getElementById('downloadBtn2');
    
    if (downloadBtn1) {
      downloadBtn1.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'grafico-massa-gelo.png';
        link.href = iceMassChart.toBase64Image();
        link.click();
      });
    }
    
    if (downloadBtn2) {
      downloadBtn2.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'grafico-nivel-mar.png';
        link.href = seaLevelChart.toBase64Image();
        link.click();
      });
    }

    // Atualizar cores quando o modo escuro/claro mudar
    const toggleBtn = document.getElementById('darkModeToggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        setTimeout(() => {
          updateChartColors();
        }, 100);
      });
    }

    return { iceMassChart, seaLevelChart, updateChartColors };
  }
}

// Inicializar gráficos quando a página carregar
if (document.getElementById('iceMassChart') && document.getElementById('seaLevelChart')) {
  window.addEventListener('DOMContentLoaded', initCharts);
}
