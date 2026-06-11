'use client'; 
import { useState, useEffect } from 'react';

interface CasillaBingo {
  id: number;
  text: string;
  marcado?: boolean;
}

export default function Home() {
  const [board, setBoard] = useState<CasillaBingo[]>([]);
  // Nuevos estados para controlar el nombre y el flujo del juego
  const [playerName, setPlayerName] = useState<string>('');
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>('');

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

  // Función para mezclar y generar un cartón nuevo
  const generarNuevoCarton = () => {
    const mezcladas = [...todasLasOpciones].sort(() => Math.random() - 0.5); 
    setBoard(mezcladas.slice(0, 9));
  };

  useEffect(() => {
    generarNuevoCarton();
  }, []); 

  const toggleCell = (id: number) => {
    // Una vez que marcan la primera casilla, el juego se considera "empezado" y se bloquea el botón
    setIsGameStarted(true);
    
    setBoard((prevBoard) =>
      prevBoard.map((cell) =>
        cell.id === id ? { ...cell, marcado: !cell.marcado } : cell
      )
    );
  };

  // Función para registrar el nombre e iniciar
  const handleStartGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim() !== '') {
      setPlayerName(tempName);
    }
  };

  // Función para reiniciar por completo (marcar cartón lleno / nuevo juego)
  const reiniciarJuegoCompleto = () => {
    const confirmar = window.confirm("¿Seguro que quieres reiniciar? Esto borrará el progreso actual.");
    if (confirmar) {
      generarNuevoCarton();
      setIsGameStarted(false);
    }
  };

  // Verificamos si todas las casillas están marcadas (Cartón Lleno)
  const esCartonLleno = board.length > 0 && board.every(cell => cell.marcado || cell.text.includes("GOL"));

  // PANTALLA 1: Registro del nombre del jugador
  if (!playerName) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#0f172a', color: 'white', padding: '20px', fontFamily: 'sans-serif' }}>
        <div style={{ backgroundColor: '#1e293b', padding: '30px', borderRadius: '16px', maxWidth: '400px', width: '100%', textAlign: 'center', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>⚽ Bingo Mundialista</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '20px' }}>Ingresa tu nombre para generar tu cartón único</p>
          
          <form onSubmit={handleStartGame}>
            <input 
              type="text" 
              placeholder="Tu Nombre o Apodo" 
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              required
              maxLength={15}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: 'white', marginBottom: '20px', fontSize: '1rem', textAlign: 'center', boxSizing: 'border-box' }}
            />
            <button 
              type="submit"
              style={{ width: '100%', padding: '12px', backgroundColor: '#0ea5e9', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
            >
              🚀 Generar Mi Cartón
            </button>
          </form>
        </div>
      </div>
    );
  }

  // PANTALLA 2: El Tablero de Juego
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: 'white', padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* Encabezado con Nombre del Jugador */}
      <div style={{ textAlign: 'center', marginBottom: '15px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 'bold', margin: 0 }}>⚽ Mundial Bingo & Shots</h1>
        <div style={{ marginTop: '8px', display: 'inline-block', backgroundColor: '#3b82f6', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>
          👤 Cartón de: {playerName}
        </div>
      </div>

      {/* Botón de Cambiar cartón (Se deshabilita si ya comenzó a marcar casillas) */}
      <div style={{ maxWidth: '600px', margin: '0 auto 20px auto' }}>
        {!isGameStarted ? (
          <button 
            onClick={generarNuevoCarton} 
            style={{ width: '100%', padding: '12px', backgroundColor: '#0ea5e9', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            🔄 Cambiar Cartón Aleatoriamente
          </button>
        ) : (
          <div style={{ width: '100%', padding: '12px', backgroundColor: '#334155', color: '#94a3b8', borderRadius: '8px', fontWeight: 'bold', textAlign: 'center', fontSize: '0.9rem', border: '1px dashed #475569', boxSizing: 'border-box' }}>
            🔒 Cartón bloqueado (Partida en curso)
          </div>
        )}
      </div>
      
      {/* Mensaje de Victoria si llena el cartón */}
      {esCartonLleno && (
        <div style={{ maxWidth: '600px', margin: '0 auto 20px auto', backgroundColor: '#22c55e', padding: '15px', borderRadius: '12px', textAlign: 'center', animation: 'pulse 2s infinite' }}>
          <h2 style={{ margin: 0, fontSize: '1.3rem' }}>🎉 ¡CARTÓN LLENO! 🎉</h2>
          <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem' }}>¡Todos pagan los shots!</p>
          <button 
            onClick={reiniciarJuegoCompleto}
            style={{ marginTop: '10px', padding: '6px 12px', backgroundColor: 'white', color: '#22c55e', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            🔄 Jugar otra ronda
          </button>
        </div>
      )}

{/* Cuadrícula del Bingo (3x3) */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', 
        gap: '12px', 
        maxWidth: '600px', 
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
                minHeight: "105px", 
                borderRadius: "14px", 
                border: "none", 
                padding: "10px", 
                fontSize: "0.9rem", 
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

      {/* 🔒 BOTÓN DE REINICIO ELIMINADO COMPLETAMENTE DE AQUÍ */}

    </main>
  );
}