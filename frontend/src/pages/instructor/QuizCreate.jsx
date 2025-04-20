import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import QuizForm from '../../components/quiz/QuizForm';

const QuizCreate = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();

    const handleSubmit = async (quizData) => {
        try {
            const response = await fetch('/api/quizzes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(quizData),
            });

            if (!response.ok) throw new Error('Failed to create quiz');

            navigate(`/instructor/courses/${courseId}`);
        } catch (error) {
            console.error('Error creating quiz:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Create New Quiz</h1>
            <QuizForm onSubmit={handleSubmit} courseId={courseId} />
        </div>
    );
};

export default QuizCreate; 