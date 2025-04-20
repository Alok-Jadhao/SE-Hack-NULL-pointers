import React, { useState } from 'react';

const QuizForm = ({ initialData, onSubmit, courseId }) => {
    const [quiz, setQuiz] = useState(initialData || {
        title: '',
        description: '',
        questions: [],
        timeLimit: 30,
        passingScore: 70,
        attempts: 1
    });

    const [currentQuestion, setCurrentQuestion] = useState({
        questionText: '',
        options: [
            { text: '', isCorrect: false },
            { text: '', isCorrect: false }
        ],
        explanation: '',
        points: 1
    });

    const handleQuizChange = (e) => {
        const { name, value } = e.target;
        setQuiz(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddQuestion = () => {
        setQuiz(prev => ({
            ...prev,
            questions: [...prev.questions, currentQuestion]
        }));
        setCurrentQuestion({
            questionText: '',
            options: [
                { text: '', isCorrect: false },
                { text: '', isCorrect: false }
            ],
            explanation: '',
            points: 1
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...quiz, courseId });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Title
                </label>
                <input
                    type="text"
                    name="title"
                    value={quiz.title}
                    onChange={handleQuizChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Description
                </label>
                <textarea
                    name="description"
                    value={quiz.description}
                    onChange={handleQuizChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                />
            </div>

            {/* Question Form */}
            <div className="border p-4 rounded-md">
                <h3 className="text-lg font-medium">Add Question</h3>
                {/* Question input fields */}
                {/* Options input fields */}
                <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add Question
                </button>
            </div>

            {/* Quiz Settings */}
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Time Limit (minutes)
                    </label>
                    <input
                        type="number"
                        name="timeLimit"
                        value={quiz.timeLimit}
                        onChange={handleQuizChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        min="1"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Passing Score (%)
                    </label>
                    <input
                        type="number"
                        name="passingScore"
                        value={quiz.passingScore}
                        onChange={handleQuizChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        min="0"
                        max="100"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Attempts Allowed
                    </label>
                    <input
                        type="number"
                        name="attempts"
                        value={quiz.attempts}
                        onChange={handleQuizChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        min="1"
                    />
                </div>
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
                Save Quiz
            </button>
        </form>
    );
};

export default QuizForm; 