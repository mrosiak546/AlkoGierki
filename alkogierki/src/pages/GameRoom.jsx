import React from 'react'
import { Container, Button, ListGroup, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/config';
import { ref, onValue, update, get, onDisconnect, remove, set } from 'firebase/database';
import { useState, useEffect } from 'react';
import games from '../data/gierki.json'
import GameRoomLayout from '../components/GameRoom/GameRoomLayout';
import GameHeader from '../components/GameRoom/GameHeader';
import GameCard from '../components/GameRoom/GameCard';
import { faWineBottle } from '@fortawesome/free-solid-svg-icons';
import TimerBar from '../components/GameRoom/TimerBar';
import GameControls from '../components/GameRoom/GameControls';
import PlayerList from '../components/GameRoom/PlayerList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const GameRoom = () => {
  const { roomId } = useParams();
  const [roomData, setRoomData] = useState(null);
  const [players, setPlayers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isHost, setIsHost] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [showTimer, setShowTimer] = useState(false);
  const [timerProgress, setTimerProgress] = useState(100);
  const [canStartTimer, setCanStartTimer] = useState(false);
  const alarmAudio = new Audio('/sounds/mixkit-alarm-tone-996.mp3')


  const nickname = localStorage.getItem('nickname');
  const playerId = localStorage.getItem('playerId');

  useEffect(() => {
    const roomRef = ref(db, `rooms/${roomId}`);

    const unsubscribe = onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setRoomData(data);
        setPlayers(Object.values(data.players || {}));
        setCurrentQuestion(data.currentQuestion || '');
        setIsHost(data.host === nickname);
        setCurrentPlayerIndex(data.currentPlayerIndex || 0);
      }
    });

    return () => unsubscribe();
  }, [roomId, nickname]);


  useEffect(() => {
    if (!roomId || !playerId || !nickname) return;
  
    const playerRef = ref(db, `rooms/${roomId}/players/${playerId}`);
    const roomRef = ref(db, `rooms/${roomId}`);
  
    // Ustaw dane gracza (jeśli np. wrócił po refreshu)
    set(playerRef, {
      nickname,
      joinedAt: Date.now()
    });
  
    // Usuń gracza po rozłączeniu
    onDisconnect(playerRef).remove();
  
    // Jeśli to host — usuń cały pokój po jego wyjściu (opcjonalnie!)
    const checkHostAndSetDisconnect = async () => {
      const roomSnap = await get(roomRef);
      if (roomSnap.exists()) {
        const roomData = roomSnap.val();
        if (roomData.host === nickname) {
          onDisconnect(roomRef).remove(); // ❗ Może być zbyt agresywne – możesz zamienić na flagę np. inactive: true
        }
      }
    };
  
    checkHostAndSetDisconnect();
  
  }, [roomId, playerId, nickname]);

  const startTimer = () => {
    setShowTimer(true);
    setCanStartTimer(true); // ukryj przycisk
    setTimerProgress(100);

    const interval = setInterval(() => {
      setTimerProgress(prevProgress => {
        if (prevProgress < 0) {
          clearInterval(interval);
          setShowTimer(false);
          alarmAudio.play();
          return 0;
        }
        return prevProgress - 2;
      });
    }, 100);

  };

  const drawQuestion = async () => {
    if (!roomData) return;

    // Uruchom animację
    setAnimating(true);

    setTimeout(async () => {
      const gameName = roomData?.game;

      // Pobierz pytania z bazy danych
      const questionsRef = ref(db, `games/games/${gameName}`);
      try {
        const snapshot = await get(questionsRef);
        // console.log(snapshot);
        const gameQuestions = snapshot.exists() ? Object.values(snapshot.val()) : [];

        // Sprawdź, czy pytania są dostępne
        if (!gameQuestions || gameQuestions.length === 0) {
          alert('Brak pytań dla tej gry.');
          setAnimating(false);
          return;
        }

        // Losowanie pytania
        const randomIndex = Math.floor(Math.random() * gameQuestions.length);
        const randomQuestionObj = gameQuestions[randomIndex];
        const questionText = randomQuestionObj.question;

        // Ustaw pytanie i zmień gracza
        const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
        setCurrentPlayerIndex(nextPlayerIndex);

        const roomRef = ref(db, `rooms/${roomId}`);
        update(roomRef, {
          currentQuestion: questionText,
          currentPlayerIndex: nextPlayerIndex
        });

        // Zakończ animację
        setAnimating(false);
        if (roomData.game === "5 Sekund") {
          setCanStartTimer(true); // Pokaż przycisk "Start"
        }
      } catch (error) {
        console.error("Błąd przy pobieraniu pytań:", error);
        setAnimating(false);
      }
    }, 600); // Czas trwania animacji
  };
  return (
    <GameRoomLayout roomId={roomId} game={roomData?.game}>
      {currentQuestion && (
        <GameCard question={currentQuestion} gameName={roomData?.game} animation={animating} icon={faWineBottle} />
      )}
      {showTimer && roomData?.game === "5 Sekund" && (
        <TimerBar progress={timerProgress} />
      )}
      <GameControls startClick={startTimer} drawClick={drawQuestion} canStartTimer={canStartTimer} game={roomData?.game} />
      <PlayerList players={players} />
    </GameRoomLayout>
  );
}
export default GameRoom
