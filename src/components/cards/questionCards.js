import React,{useState} from "react";
import { useNavigate } from "react-router-dom"
import "./questionCards.css"



{/* A questions array, where the id is used to fill in the API parameters and the questions and answers itself to be used for the interactive part. */}
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
        question: 'Do you have a specific diet concerning animal products?',
        answers: [
            { id: '&health=vegetarian', text: "I don't eat any meat(vega)." },
            { id: '&health=vegan', text: "I don't eat anything animal related(vegan)."},
            { id: '', text: "i eat everything."}, 
        ],
    },

];

{/*This function is used to check the current question to the index of the array. This array is determined by currentIndex useState and will display the quest and answers respectively*/}
function QuestionSearch() {
    const [answers, setAnswers] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    function handleToggle(answerId) {
        setAnswers({ ...answers, [currentIndex]: answerId });

        if (currentIndex < questions.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
            const searchValues = Object.values(answers).map((answer) => answer.id);
            const searchParam = searchValues.join('');
            navigate(`/searched/${searchParam}`);
        }
    }

    const currentQuestion = questions[currentIndex];


    return (
        <main>
            <article className="qsearch-question">
                <h3>{currentQuestion.question}</h3>
                <div className="qsearch-answers">
                    {currentQuestion.answers.map((answer) => (
                        <div
                            key={answer.id}
                            className={`qsearch-answer ${
                                answers[currentIndex] === answer 
                            }`}
                            onClick={() => handleToggle(answer)}
                        >
                            {answer.text}
                        </div>
                    ))}
                </div>
            </article>
        </main>
    );
}

export default QuestionSearch;