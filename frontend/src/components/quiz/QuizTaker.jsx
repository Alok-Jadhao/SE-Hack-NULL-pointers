import React, { useState, useEffect } from 'react';

const QuizTaker = ({ quiz, onSubmit }) => {
    const [answers, setAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(quiz.timeLimit * 60);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (timeLeft > 0 && !isSubmitted) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && !isSubmitted) {
            handleSubmit();
        }
    }, [timeLeft, isSubmitted]);

    const handleAnswerSelect = (questionIndex, optionIndex) => {
        setAnswers(prev => {
            const newAnswers = [...prev];
            newAnswers[questionIndex] = optionIndex;
            return newAnswers;
        });
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
        onSubmit(answers);
    };

    return (
        <div className="space-y-6">
            <div className="fixed top-0 right-0 p-4 bg-white shadow rounded-bl">
                Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>

            {quiz.questions.map((question, qIndex) => (
                <div key={qIndex} className="border p-4 rounded-md">
                    <h3 className="text-lg font-medium mb-4">
                        {question.questionText}
                    </h3>
                    <div className="space-y-2">
                        {question.options.map((option, oIndex) => (
                            <label
                                key={oIndex}
                                className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded"
                            >
                                <input
                                    type="radio"
                                    name={`question-${qIndex}`}
                                    checked={answers[qIndex] === oIndex}
                                    onChange={() => handleAnswerSelect(qIndex, oIndex)}
                                    disabled={isSubmitted}
                                />
                                <span>{option.text}</span>
                            </label>
                        ))}
                    </div>
                </div>
            ))}

            <button
                onClick={handleSubmit}
                disabled={isSubmitted}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
                Submit Quiz
            </button>
        </div>
    );
};

export default QuizTaker; 