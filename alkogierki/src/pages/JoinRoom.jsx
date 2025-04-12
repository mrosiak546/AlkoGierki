import React from 'react'
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { db } from '../firebase/config';
import { ref, get, update } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import {faUsers} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RoomFormWrapper from '../components/RoomFormWrapper';
import InputField from '../components/InputField';
import RoomFormButtons from '../components/RoomFormButtons';
import {useSearchParams} from 'react-router-dom';
import { useEffect } from 'react';

const JoinRoom = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [nickname, setNickname] = useState('');
    const [roomCode, setRoomCode] = useState('');

    useEffect (() =>{
      const roomCode = searchParams.get('roomCode');
      if (roomCode) {
        setRoomCode(roomCode);
      }
    }, [searchParams]);
  
    const joinRoom = async () => {
      if (!nickname || !roomCode) return alert('Uzupełnij pola');
  
      const roomRef = ref(db, `rooms/${roomCode.toUpperCase()}`);
      const snapshot = await get(roomRef);
  
      if (!snapshot.exists()) {
        alert('Pokój nie istnieje!');
        return;
      }
  
      const playerId = uuidv4();
  
      // Dodajemy gracza do pokoju
      await update(roomRef, {
        [`players/${playerId}`]: {
          nickname,
          joinedAt: Date.now()
        }
      });
  
      // Zapisujemy dane lokalnie
      localStorage.setItem('roomCode', roomCode.toUpperCase());
      localStorage.setItem('playerId', playerId);
      localStorage.setItem('nickname', nickname);
  
      navigate(`/room/${roomCode.toUpperCase()}`);
    };
  
    return (
      <RoomFormWrapper title="Dołącz do pokoju" icon={faUsers}>
          <form className="d-flex flex-column gap-3">
            <InputField value={roomCode} onChange={(e) => setRoomCode(e.target.value)} placeholder="Kod pokoju"/>
            <InputField value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="Twój nick"/>
            <RoomFormButtons onPrimaryClick={joinRoom} onBackClick={()=>navigate('/')} primaryLabel="Dołącz" />
          </form>
      </RoomFormWrapper>
    );
}

export default JoinRoom
