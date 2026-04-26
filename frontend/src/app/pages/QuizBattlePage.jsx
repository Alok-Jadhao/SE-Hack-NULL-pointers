import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Trophy, Users, Clock, Zap, Crown, Medal, Target, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { apiFetch } from '../lib/api';
import { useAuth } from '../context/AuthContext';




export function QuizBattlePage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('available');
  const [quizzes, setQuizzes] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joinCode, setJoinCode] = useState('');

  // Battle state
  const [inBattle, setInBattle] = useState(false);
  const [battleQuiz, setBattleQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [battleComplete, setBattleComplete] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        const res = await apiFetch('/quizzes');
        if (res.success && res.data.length > 0) {
          setQuizzes(res.data.map((q) => ({
            id: q._id,
            title: q.title,
            course: q.course?.title || 'General',
            participants: q.participants?.length || 0,
            duration: `${Math.ceil((q.questions?.length || 5) * 0.5)} min`,
            questions: q.questions?.length || 0,
            difficulty: q.questions?.length > 10 ? 'Hard' : q.questions?.length > 5 ? 'Medium' : 'Easy',
            status: q.isLive ? 'live' : 'upcoming',
            quizCode: q.quizCode,
          })));
        } else {
          setQuizzes(getMockQuizzes());
        }
      } catch {
        setQuizzes(getMockQuizzes());
      } finally {
        setLoading(false);
      }
    }
    fetchQuizzes();
  }, []);

  useEffect(() => {
    setLeaderboard([
      { rank: 1, name: 'Alice Johnson', score: 950, accuracy: 95, time: '8:45', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
      { rank: 2, name: 'Bob Smith', score: 920, accuracy: 92, time: '9:12', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop' },
      { rank: 3, name: 'Carol Davis', score: 895, accuracy: 90, time: '9:34', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
      { rank: 4, name: 'David Lee', score: 870, accuracy: 87, time: '10:05', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
      { rank: 5, name: 'Emma Wilson', score: 845, accuracy: 85, time: '10:28', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' },
    ]);
  }, []);

  // Timer for battle mode
  useEffect(() => {
    if (!inBattle || showResult || battleComplete) return;
    if (timeLeft <= 0) {
      handleAnswerSelect(-1); // Time's up, no answer
      return;
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [inBattle, timeLeft, showResult, battleComplete]);

  const startBattle = async (quiz) => {
    try {
      const res = await apiFetch(`/quizzes/${quiz.id}`);
      if (res.success && res.data.questions?.length > 0) {
        setBattleQuiz({
          title: res.data.title,
          questions: res.data.questions.map((q) => ({
            id: q._id,
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            points: q.points || 10,
            timeLimit: q.timeLimit || 30,
          })),
        });
      } else {
        setBattleQuiz(getMockBattleQuiz());
      }
    } catch {
      setBattleQuiz(getMockBattleQuiz());
    }
    setInBattle(true);
    setCurrentQuestion(0);
    setScore(0);
    setCorrectCount(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setBattleComplete(false);
    setTimeLeft(30);
  };

  const handleAnswerSelect = useCallback((answerIndex) => {
    if (showResult || !battleQuiz) return;
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    const q = battleQuiz.questions[currentQuestion];
    const isCorrect = answerIndex === q.correctAnswer;
    if (isCorrect) {
      const timeBonus = Math.floor(timeLeft * 2);
      setScore(s => s + q.points + timeBonus);
      setCorrectCount(c => c + 1);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < battleQuiz.questions.length) {
        setCurrentQuestion(c => c + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(battleQuiz.questions[currentQuestion + 1]?.timeLimit || 30);
      } else {
        setBattleComplete(true);
      }
    }, 1500);
  }, [showResult, battleQuiz, currentQuestion, timeLeft]);

  const handleJoinByCode = async () => {
    if (!joinCode.trim()) return;
    try {
      const res = await apiFetch(`/quizzes/join/${joinCode.trim().toUpperCase()}`);
      if (res.success) {
        const q = res.data;
        setBattleQuiz({
          title: q.title,
          questions: q.questions.map((qq) => ({
            id: qq._id,
            question: qq.question,
            options: qq.options,
            correctAnswer: qq.correctAnswer,
            points: qq.points || 10,
            timeLimit: qq.timeLimit || 30,
          })),
        });
        setInBattle(true);
        setCurrentQuestion(0);
        setScore(0);
        setCorrectCount(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setBattleComplete(false);
        setTimeLeft(30);
      }
    } catch {
      // fallback to mock
      setBattleQuiz(getMockBattleQuiz());
      setInBattle(true);
      setCurrentQuestion(0);
      setScore(0);
      setCorrectCount(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setBattleComplete(false);
      setTimeLeft(30);
    }
  };

  const exitBattle = () => {
    setInBattle(false);
    setBattleQuiz(null);
    setBattleComplete(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'Medium': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      case 'Hard': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400';
    }
  };

  // Battle complete screen
  if (inBattle && battleComplete && battleQuiz) {
    const total = battleQuiz.questions.length;
    const accuracy = Math.round((correctCount / total) * 100);
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
          <Trophy className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-2">Battle Complete!</h2>
          <p className="text-white/90 text-lg">{battleQuiz.title}</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-primary">{score}</div>
            <div className="text-sm text-muted-foreground mt-1">Total Score</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-600">{accuracy}%</div>
            <div className="text-sm text-muted-foreground mt-1">Accuracy</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="text-3xl font-bold">{correctCount}/{total}</div>
            <div className="text-sm text-muted-foreground mt-1">Correct</div>
          </div>
        </div>

        <div className="flex gap-4">
          <button onClick={exitBattle} className="flex-1 py-3 border border-border rounded-lg hover:bg-accent transition-colors flex items-center justify-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            Back to Quizzes
          </button>
          <button onClick={() => startBattle({ id: '', title: '', course: '', participants: 0, duration: '', questions: 0, difficulty: 'Easy', status: 'live' })} className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2">
            <Zap className="w-5 h-5" />
            Play Again
          </button>
        </div>
      </div>
    );
  }

  // In-battle view
  if (inBattle && battleQuiz) {
    const q = battleQuiz.questions[currentQuestion];
    const total = battleQuiz.questions.length;
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <button onClick={exitBattle} className="text-white/80 hover:text-white mb-2 flex items-center gap-1 text-sm">
                <ArrowLeft className="w-4 h-4" /> Exit Battle
              </button>
              <h2 className="text-white mb-2">{battleQuiz.title}</h2>
              <p className="text-white/90">Question {currentQuestion + 1} of {total}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{score}</div>
              <div className="text-white/90 text-sm">Points</div>
            </div>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all" style={{ width: `${((currentQuestion + 1) / total) * 100}%` }} />
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${timeLeft <= 10 ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 animate-pulse' : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'}`}>
              <Clock className="w-4 h-4 inline mr-1" />
              {timeLeft}s left
            </span>
            <span className="text-sm text-muted-foreground">{q.points} pts</span>
          </div>

          <h3 className="text-xl mb-8">{q.question}</h3>

          <div className="space-y-3">
            {q.options.map((option, index) => {
              let borderClass = 'border-border hover:border-primary hover:bg-accent';
              if (showResult) {
                if (index === q.correctAnswer) {
                  borderClass = 'border-green-500 bg-green-50 dark:bg-green-900/20';
                } else if (index === selectedAnswer && index !== q.correctAnswer) {
                  borderClass = 'border-red-500 bg-red-50 dark:bg-red-900/20';
                } else {
                  borderClass = 'border-border opacity-50';
                }
              } else if (selectedAnswer === index) {
                borderClass = 'border-primary bg-primary/10';
              }

              return (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full p-4 text-left border-2 rounded-xl transition-all ${borderClass}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 border-2 rounded-full flex items-center justify-center font-semibold ${
                      showResult && index === q.correctAnswer ? 'border-green-500 bg-green-500 text-white' :
                      showResult && index === selectedAnswer ? 'border-red-500 bg-red-500 text-white' :
                      'border-border'
                    }`}>
                      {showResult && index === q.correctAnswer ? <CheckCircle2 className="w-5 h-5" /> : String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 lg:p-12 text-white">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-8 h-8" />
            <h1 className="text-white">Quiz Battles</h1>
          </div>
          <p className="text-white/90 text-lg mb-6">
            Compete in real-time with peers, climb the leaderboards, and prove your knowledge!
          </p>

          {/* Join by Code */}
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              placeholder="Enter quiz code..."
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              className="flex-1 px-4 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              maxLength={6}
            />
            <button
              onClick={handleJoinByCode}
              className="px-6 py-3 bg-white text-purple-600 font-medium rounded-lg hover:bg-white/90 transition-colors"
            >
              Join Battle
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="text-3xl font-bold mb-1">{quizzes.reduce((a, q) => a + q.participants, 0)}</div>
              <div className="text-white/80 text-sm">Active Players</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="text-3xl font-bold mb-1">{quizzes.filter(q => q.status === 'live').length}</div>
              <div className="text-white/80 text-sm">Live Battles</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="text-3xl font-bold mb-1">{quizzes.length}</div>
              <div className="text-white/80 text-sm">Total Quizzes</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 border-b border-border">
        <button onClick={() => setActiveTab('available')} className={`px-6 py-3 font-medium transition-colors border-b-2 ${activeTab === 'available' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
          Available Battles
        </button>
        <button onClick={() => setActiveTab('leaderboard')} className={`px-6 py-3 font-medium transition-colors border-b-2 ${activeTab === 'leaderboard' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
          Leaderboard
        </button>
      </div>

      {activeTab === 'available' ? (
        <div className="grid md:grid-cols-2 gap-6">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{quiz.title}</h3>
                  <p className="text-sm text-muted-foreground">{quiz.course}</p>
                  {quiz.quizCode && <p className="text-xs text-primary font-mono mt-1">Code: {quiz.quizCode}</p>}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                  {quiz.difficulty}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-border">
                <div className="text-center">
                  <Users className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
                  <div className="font-semibold">{quiz.participants}</div>
                  <div className="text-xs text-muted-foreground">Players</div>
                </div>
                <div className="text-center">
                  <Clock className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
                  <div className="font-semibold">{quiz.duration}</div>
                  <div className="text-xs text-muted-foreground">Duration</div>
                </div>
                <div className="text-center">
                  <Target className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
                  <div className="font-semibold">{quiz.questions}</div>
                  <div className="text-xs text-muted-foreground">Questions</div>
                </div>
              </div>

              <button
                onClick={() => startBattle(quiz)}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Join Battle
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-6 border-b border-border bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
              <h2 className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-600" />
                Top Performers
              </h2>
              <p className="text-muted-foreground mt-1">This week's leaderboard</p>
            </div>
            <div className="divide-y divide-border">
              {leaderboard.map((entry, index) => (
                <div key={index} className={`p-6 flex items-center gap-4 hover:bg-accent transition-colors ${entry.rank <= 3 ? 'bg-accent/30' : ''}`}>
                  <div className="relative">
                    {entry.rank === 1 && <Crown className="absolute -top-3 -right-2 w-6 h-6 text-yellow-500 fill-yellow-500" />}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                      entry.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white' :
                      entry.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white' :
                      entry.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {entry.rank}
                    </div>
                  </div>
                  <img src={entry.avatar} alt={entry.name} className="w-12 h-12 rounded-full border-2 border-border" />
                  <div className="flex-1">
                    <h4 className="font-semibold">{entry.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span>{entry.accuracy}% accuracy</span>
                      <span>{entry.time} avg time</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{entry.score}</div>
                    <div className="text-xs text-muted-foreground">points</div>
                  </div>
                  {entry.rank <= 3 && <Medal className={`w-8 h-8 ${entry.rank === 1 ? 'text-yellow-500' : entry.rank === 2 ? 'text-gray-400' : 'text-orange-600'}`} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getMockQuizzes() {
  return [
    { id: '1', title: 'React Hooks Challenge', course: 'Advanced Web Development', participants: 24, duration: '15 min', questions: 10, difficulty: 'Medium', status: 'live' },
    { id: '2', title: 'Algorithm Speed Run', course: 'Data Structures & Algorithms', participants: 18, duration: '20 min', questions: 15, difficulty: 'Hard', status: 'live' },
    { id: '3', title: 'JavaScript Fundamentals', course: 'Modern JavaScript', participants: 32, duration: '10 min', questions: 8, difficulty: 'Easy', status: 'live' },
    { id: '4', title: 'ML Concepts Quiz', course: 'Machine Learning Fundamentals', participants: 15, duration: '15 min', questions: 12, difficulty: 'Medium', status: 'live' },
  ];
}

function getMockBattleQuiz() {
  return {
    title: 'Quick Knowledge Quiz',
    questions: [
      { id: '1', question: 'What is the purpose of the useEffect hook in React?', options: ['To manage component state', 'To handle side effects in functional components', 'To create context providers', 'To optimize component rendering'], correctAnswer: 1, points: 10, timeLimit: 30 },
      { id: '2', question: 'Which data structure uses LIFO (Last In, First Out)?', options: ['Queue', 'Stack', 'Linked List', 'Tree'], correctAnswer: 1, points: 10, timeLimit: 30 },
      { id: '3', question: 'What does CSS stand for?', options: ['Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets', 'Colorful Style Sheets'], correctAnswer: 1, points: 10, timeLimit: 30 },
      { id: '4', question: 'Which HTTP method is used to update a resource?', options: ['GET', 'POST', 'PUT', 'DELETE'], correctAnswer: 2, points: 10, timeLimit: 30 },
      { id: '5', question: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'], correctAnswer: 1, points: 10, timeLimit: 30 },
    ],
  };
}
