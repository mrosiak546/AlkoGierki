import React from 'react'
import RoomFormWrapper from '../components/RoomFormWrapper'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import SelectField from '../components/SelectField'
import { useState } from 'react'
import InputField from '../components/InputField'
import { db } from '../firebase/config'
import { ref, push, get, child,set } from 'firebase/database'
import RoomFormButtons from '../components/RoomFormButtons'
import { useNavigate } from 'react-router-dom'

const AddQuestionForm = () => {
    const [game, setGame] = useState('5 Sekund');
    const [question, setQuestion] = useState('');
    const navigate = useNavigate();

    const addQuestion = async () => {
        if (!game || !question) return alert("Uzupełnij pola");

        const gameRef = ref(db, `games/games/${game}`);

        try {
            const snapshot = await get(gameRef);
            const questions = snapshot.exists() ? Object.values(snapshot.val()) : [];

            //Maks id
            const maxId = questions.reduce((max, q) => q.id > max ? q.id : max, 0);

            const newQuestion = {
                id: maxId ,
                question,
                ...(game === '5 Sekund' && { time: 5 })
            };

            await set(ref(db, `games/games/${game}/${maxId}`), newQuestion);
            alert('Dodano pytanie!');
            setQuestion('');
        }
        catch (error) {
            console.error("Błąd przy dodawaniu pytania:", error)
        }
    }

    return (
        <RoomFormWrapper title="Dodaj pytanie" icon={faPlus}>
            <form className="d-flex flex-column gap-3">
                <SelectField value={game} onChange={(e) => setGame(e.target.value)} options={['Nigdy przenigdy', 'Prawda', '5 Sekund', 'Napij Sie Jesli', 'Podaj Shota']} />
                <InputField value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Podaj treść pytania" />
                <RoomFormButtons onPrimaryClick={addQuestion} onBackClick={() => navigate('/')} primaryLabel="Dodaj pytanie" />
            </form>
        </RoomFormWrapper>
    )
}

export default AddQuestionForm
