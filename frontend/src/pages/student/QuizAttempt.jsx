import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QuizTaker from '../../components/quiz/QuizTaker';

const QuizAttempt = () => {
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [result, setResult] = useState(null);

    useEffect(() => {
        fetchQuiz();
    }, [quizId]);

    const fetchQuiz = async () => {
        try {
            const response = await fetch(`/api/quizzes/${quizId}`);
            if (!response.ok) throw new Error('Failed to fetch quiz');
            const data = await response.json();
            setQuiz(data);
        } catch (error) {
            console.error('Error fetching quiz:', error);
        }
    };

    const handleSubmit = async (answers) => {
        try {
            const response = await fetch(`/api/quizzes/${quizId}/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ answers }),
            });

            if (!response.ok) throw new Error('Failed to submit quiz');
            
            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };

    if (!quiz) return <div>Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">{quiz.title}</h1>
            {result ? (
                <div className="text-center p-8">
                    <h2 className="text-xl mb-4">Quiz Results</h2>
                    <p className="text-lg">
                        Score: {result.score}%
                    </p>
                    <p className="text-lg">
                        Status: {result.passed ? 'Passed' : 'Failed'}
                    </p>
                </div>
            ) : (
                <QuizTaker quiz={quiz} onSubmit={handleSubmit} />
            )}
        </div>
    );
};

export default QuizAttempt; 