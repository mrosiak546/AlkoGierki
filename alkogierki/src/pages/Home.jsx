import React from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();
    return (
      <div className="home-wrapper d-flex flex-column justify-content-center align-items-center">
        <h1 className="title mb-4">AlkoGierki</h1>
  
        <img
          src="https://static.vecteezy.com/system/resources/previews/019/607/543/non_2x/beer-mug-graphic-clipart-design-free-png.png"
          alt="AlkoGierki"
          className="home-image mb-4 mt-4"
        />
  
        <div className="d-flex flex-column mt-5 gap-3 w-100 px-4" style={{ maxWidth: '400px' }}>
          <Button className='btnCreate' size="lg" onClick={() => navigate('/create')}>
            Stwórz pokój
          </Button>
          <Button className='btnJoin' size="lg" onClick={() => navigate('/join')}>
            Dołącz do pokoju
          </Button>
          <Button className='btnAdd' size="lg" onClick={() => navigate('/addQuestion')}>
            Dodaj pytanie
          </Button>
          <Button className='btnRooms' size="lg" onClick={() => navigate('/rooms')}>
            Pokoje
          </Button>
        </div>
      </div>
    );
}

export default Home
