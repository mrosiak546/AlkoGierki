import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { ref, onValue, remove } from 'firebase/database';
import { Button, ListGroup, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const RoomList = () => {
  const [rooms, setRooms] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const nickname = localStorage.getItem('nickname');

  useEffect(() => {
    const roomsRef = ref(db, 'rooms');
    const unsubscribe = onValue(roomsRef, (snapshot) => {
      const data = snapshot.val();
      setRooms(data || {});
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDeleteRoom = (roomCode) => {
    if (window.confirm(`Na pewno chcesz usunąć pokój ${roomCode}?`)) {
      remove(ref(db, `rooms/${roomCode}`));
    }
  };

  const handleJoinRoom = (roomCode) => {
    navigate(`/join?roomCode=${roomCode}`);
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <div className="px-4 py-4">
      <h2 className="mb-4">Dostępne pokoje</h2>
      <ListGroup>
        {Object.entries(rooms).map(([roomCode, room]) => (
          <ListGroup.Item key={roomCode} className="d-flex justify-content-between align-items-center">
            <div>
              <strong>{roomCode}</strong> - gra: {room.game} - host: {room.host}
            </div>
            <div className="d-flex gap-2">
              <Button size="sm" variant="success" onClick={() => handleJoinRoom(roomCode)}>
                Dołącz
              </Button>
              {room.host === nickname && (
                <Button size="sm" variant="danger" onClick={() => handleDeleteRoom(roomCode)}>
                  Usuń
                </Button>
              )}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default RoomList;
