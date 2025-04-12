import React from 'react'
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import { ref, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid'; // Importujemy uuidv4 z uuid
import { useState } from 'react';
import {faHouse} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RoomFormWrapper from '../components/RoomFormWrapper';
import { icon } from '@fortawesome/fontawesome-svg-core';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import RoomFormButtons from '../components/RoomFormButtons';

const CreateRoom = () => {

    const navigate = useNavigate();
    const [nickname, setNickname] = useState('');
    const [game, setGame] = useState('Nigdy przenigdy');
  
    const createRoom = async () => {
      if (!nickname) return alert('Podaj swój nick');
  
      const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase(); // np. 6-znakowy kod
      const playerId = uuidv4(); // unikalny ID gracza
  
      const roomRef = ref(db, `rooms/${roomCode}`);
  
      await set(roomRef, {
        host: nickname,
        game,
        createdAt: Date.now(),
        currentQuestion: null,
        players: {
          [playerId]: {
            nickname,
            joinedAt: Date.now()
          }
        }
      });
  
      // Przechowujemy nick i playerId lokalnie
      localStorage.setItem('roomCode', roomCode);
      localStorage.setItem('playerId', playerId);
      localStorage.setItem('nickname', nickname);
  
      navigate(`/room/${roomCode}`);
    };

    return (
        <RoomFormWrapper title="Stwórz pokój" icon={faHouse}>
            <form className="d-flex flex-column gap-3">
              <InputField value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="Twój nick"/>
              <SelectField value={game} onChange={(e)=>setGame(e.target.value)} options={['Nigdy przenigdy', 'Prawda', '5 Sekund', 'Napij Sie Jesli', 'Podaj Shota']}/>
              <RoomFormButtons onPrimaryClick={createRoom} onBackClick={() => navigate('/')} primaryLabel="Utwórz pokój"/>  
            </form>
        </RoomFormWrapper>
      );
}

export default CreateRoom
