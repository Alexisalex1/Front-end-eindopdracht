import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom"
import "./questionCards.css"




const questions = [
    {    id: 1,
        question: 'how was your day?',
        answers: [
            { id: 'healthy', text: 'Good!' },
            { id: 'balanced', text: 'okay.' },
            { id: 'comfort', text: 'Bad..' },

        ],
    },
    {
        id: 2,
        question: 'What time of day is it?',
        answers: [
            { id: '&mealType=breakfast', text: 'Still morning' },
            { id: '&mealType=lunch', text: 'Midday!' },
            { id: '&mealType=dinner', text: 'Evening already..' },
            { id: '&mealType=snack', text: 'Inbetween day moments. I just want a snack!' }
        ],
    },
    {    id: 3,
        question: 'Do you have a specific diet?',
        answers: [
            { id: '&health=vegetarian', text: "I don't eat any meat." },
            { id: '&health=vegan', text: "I don't eat anything animal related." },
        ],
    },

];

function QuestionSearch() {
    const [answers, setAnswers] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [inputAnswers, setInputAnswers] = useState("");

    const navigate = useNavigate();
    function handleToggle(answerId) {
        setAnswers({ ...answers, [currentIndex]: answerId });

        if (currentIndex < questions.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
            const searchValues = Object.values(answers).map((answer) => answer.id);
            const searchParam = searchValues.join('');
            navigate(`/searched/${searchParam}`);
            console.log(searchParam);
        }
    }

    const currentQuestion = questions[currentIndex];

    return (
        <div>
            <div className="QSearch__question">
                <h3>{currentQuestion.question}</h3>
                <div className="QSearch__answers">
                    {currentQuestion.answers.map((answer) => (
                        <div
                            key={answer.id}
                            className={`QSearch__answer ${
                                answers[currentIndex] === answer ? 'QSearch__answer--selected' : ''
                            }`}
                            onClick={() => handleToggle(answer)}
                            onChange={(e) => setInputAnswers(e.target.value)}
                        >
                            {answer.text}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default QuestionSearch;