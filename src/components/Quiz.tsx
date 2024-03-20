import React, { useEffect, useState } from 'react'
import './Quiz.css'
import QuizQuestion from '../core/QuizQuestion';
import QuizCore from '../core/QuizCore';


interface QuizState {
  questions: QuizQuestion[]
  currentQuestionIndex: number
  selectedAnswer: string | null
  score: number
}

const Quiz: React.FC = () => {
  const [quizCore] = useState<QuizCore>(new QuizCore());
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(
    quizCore.getCurrentQuestion()
  );
  const [showSubmitButton, setShowSubmitButton] = useState<boolean>(false);
  const [showScore, setShowScore] = useState<boolean>(false);

  useEffect(() => {
    setCurrentQuestion(quizCore.getCurrentQuestion());
    setShowSubmitButton(!quizCore.hasNextQuestion());
  }, [quizCore]);

  // const initialQuestions: QuizQuestion[] = [
  //   {
  //     question: 'What is the capital of France?',
  //     options: ['London', 'Berlin', 'Paris', 'Madrid'],
  //     correctAnswer: 'Paris',
  //   },
  // ];
  // const [state, setState] = useState<QuizState>({
  //   questions: initialQuestions,
  //   currentQuestionIndex: 0,  // Initialize the current question index.
  //   selectedAnswer: null,  // Initialize the selected answer.
  //   score: 0,  // Initialize the score.
  // });

  const handleOptionSelect = (option: string): void => {
    // setState((prevState) => ({ ...prevState, selectedAnswer: option }));
    setSelectedAnswer(option);
  }

  const handleButtonClick = (): void => {
    // Task3: Implement the logic for button click, such as moving to the next question.
    if (selectedAnswer) {
      quizCore.answerQuestion(selectedAnswer);
      setSelectedAnswer(null);

      if (quizCore.hasNextQuestion()) {
        quizCore.nextQuestion();
        setCurrentQuestion(quizCore.getCurrentQuestion());
      } else {
        setShowSubmitButton(true);
      }
    }
  } 

  // const { questions, currentQuestionIndex, selectedAnswer, score } = state;
  // const currentQuestion = questions[currentQuestionIndex];

  const handleSubmitButtonClick = (): void => {
    setShowScore(true);
  };

  if (showScore) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {quizCore.getScore()} out of {quizCore.getTotalQuestions()}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion?.question}</p>
    
      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion?.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      {showSubmitButton ? (
        <button onClick={handleSubmitButtonClick}>Submit</button>
      ) : (
        <button onClick={handleButtonClick} disabled={!selectedAnswer}>
          Next Question
        </button>
      )}
    </div>
  );
};

export default Quiz;