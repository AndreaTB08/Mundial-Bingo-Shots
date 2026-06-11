'use client'; 
import { useState, useEffect } from 'react';

interface CasillaBingo {
  id: number;
  text: string;
  marcado?: boolean;
}

export default function Home() {
  const [board, setBoard] = useState<CasillaBingo[]>([]);

  useEffect(() => {
    // Banco total de opciones disponibles para dar variedad
    const todasLasOpciones: CasillaBingo[] = [
      { id: 1, text: "🟨 Tarjeta amarilla" },
      { id: 2, text: "📋 Cambio táctico" },
      { id: 3, text: "🟥 Tarjeta roja" },
      { id: 4, text: "👥 Rodean al árbitro" },
      { id: 5, text: "😢 Sale alguien llorando" },
      { id: 6, text: "📣 Mencionan a Messi" },
      { id: 7, text: "⏰ Gol en tiempo agregado" },
      { id: 8, text: "🧤 Atajada espectacular" },
      { id: 9, text: "🎶 Aficionados cantando" },
      { id: 10, text: "🛑 Partido detenido" },
      { id: 11, text: "🗣️ 'Increíble'" },
      { id: 12, text: "⚽ Gol antes del minuto 15" },
      { id: 13, text: "⭐ GOL" }, 
      { id: 14, text: "🙅‍♂️ Gol anulado" },
      { id: 15, text: "👏 Ovación del público" },
      { id: 16, text: "📣 Mencionan a Cristiano" },
      { id: 17, text: "🎯 Gol de tiro libre" },
      { id: 18, text: "🏴 Banner gigante" },
      { id: 19, text: "🏟️ Ocasión fallada" },
      { id: 20, text: "🚑 Entran asistencias" },
      { id: 21, text: "⚠️ Tarjeta por protestar" },
      { id: 22, text: "🤕 Lesión de un jugador" },
      { id: 23, text: "🥅 Penal señalado" },
      { id: 24, text: "🤦‍♂️ Reclamo al árbitro" },
      { id: 25, text: "❤️ Enfocan una pareja" }
    ];

    // Mezclamos aleatoriamente todo el banco
    const mezcladas = [...todasLasOpciones].sort(() => Math.random() - 0.5); 
    
    // 🛠️ FIX CLAVE: Tomamos ESTRICTAMENTE las primeras 9 casillas para un tablero de 3x3
    const seleccionadas9 = mezcladas.slice(0, 9);
    
    setBoard(seleccionadas9);
  }, []); 

  const toggleCell = (id: number) => {
    setBoard((prevBoard) =>
      prevBoard.map((cell) =>
        cell.id === id ? { ...cell, marcado: !cell.marcado } : cell
      )
    );
  };

  if (board.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#0f172a', color: 'white' }}>
        <h2>Generando cartón ultra rápido (3x3)...</h2>
      </div>
    );
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: 'white', padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* Encabezado */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>⚽ Mundial Bingo & Shots</h1>
        <p style={{ color: '#38bdf8', fontSize: '0.9rem', marginTop: '5px' }}>¡Edición Express: Tablero de 3x3!</p>
      </div>

      {/* Botón de Generar nuevo cartón */}
      <div style={{ maxWidth: '700px', margin: '0 auto 20px auto' }}>
        <button 
          onClick={() => window.location.reload()} 
          style={{ width: '100%', padding: '12px', backgroundColor: '#0ea5e9', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          🔄 Cambiar Cartón Aleatoriamente
        </button>
      </div>
      
      {/* 🛠️ GRID AJUSTADO A 3 COLUMNAS */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', // Ajuste a 3 columnas simétricas
        gap: '15px', 
        maxWidth: '700px', // Reducido el ancho máximo para que quede compacto y centrado
        margin: '0 auto' 
      }}>
        {board.map((cell) => {
          const esGol = cell.text.includes("GOL");
          const debeSerVerde = cell.marcado || esGol;
          
          return (
            <button 
              key={cell.id} 
              onClick={() => toggleCell(cell.id)}
              style={{ 
                minHeight: "120px", // Un poco más altas para dar un aspecto cuadrado elegante
                borderRadius: "14px", 
                border: "none", 
                padding: "15px", 
                fontSize: "0.95rem", 
                cursor: "pointer",
                backgroundColor: debeSerVerde ? '#22c55e' : '#1e293b', 
                color: 'white',
                fontWeight: debeSerVerde ? 'bold' : 'normal',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.15s ease'
              }}
            >
              {cell.text}
            </button>
          );
        })}
      </div>

    </main>
  );
}