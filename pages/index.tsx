import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import questions from '../assets/questions.json';

const Home: NextPage = () => {
  const result : any[] = [];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(result);

  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerOption = (answer: string) => {
    setSelectedOptions([(selectedOptions[currentQuestion] = { answerByUser: answer })]);
    setSelectedOptions([...selectedOptions]);
  };

  const handlePrevious = () => {
    const prevQues = currentQuestion - 1;
    prevQues >= 0 && setCurrentQuestion(prevQues);
  };
  const handleNext = () => {
    const nextQues = currentQuestion + 1;
    nextQues < questions.length && setCurrentQuestion(nextQues);
  };

  const handleSubmitButton = () => {
    let newScore = 0;
    for (let i = 0; i < questions.length; i++) {
      questions[i].answerOptions.map((answer) => answer.isCorrect && answer.answer === selectedOptions[i]?.answerByUser && (newScore += 1));
    }
    setScore(newScore);
    setShowScore(true);
  };

  const myLoader = ({ src, width, quality }): string => {
    return `https://images.unsplash.com/${typeToSrcSwith(src)}&auto=format&fit=crop&w=${width}&q=${quality}`;
  };

  return (
    <div className="flex flex-col my-20 w-screen px-5 h-screen justify-center items-center">
      <Head>
        <title>Noortje quiz</title>
      </Head>
      {showScore ? (
        Result(score)
      ) : (
        <>
          <div className="flex flex-col items-center md:flex-row w-full">
            <Image src={questions[currentQuestion].questionType} alt="Vercel Logo" width={250} height={16} loader={myLoader} />
            <div className="flex flex-col justify-between p-4 leading-normal w-full">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{questions[currentQuestion].question}</h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Vraag {currentQuestion + 1} van {questions.length} | {questions[currentQuestion].questionType}
              </p>
            </div>
          </div>

          <div className="flex flex-col w-full">
            {questions[currentQuestion].answerOptions.map((answer, index) => (
              <div
                key={index}
                className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-white/10 rounded-xl bg-white/5"
                onClick={(e) => handleAnswerOption(answer.answer)}>
                <input
                  type="radio"
                  name={answer.answer}
                  value={answer.answer}
                  checked={answer.answer === selectedOptions[currentQuestion]?.answerByUser}
                  onChange={(e) => handleAnswerOption(answer.answer)}
                  className="w-6 h-6 bg-black"
                />
                <p className="ml-6 text-white">{answer.answer}</p>
              </div>
            ))}
          </div>
          <div className="flex bg-[#1A1A1A] mt-10 justify-between w-full mt-4 text-white">
            <button
              onClick={handlePrevious}
              className={`w-[49%] py-3 ${currentQuestion === 0 ? 'bg-indigo-400' : 'bg-indigo-600'} rounded-lg`}
              disabled={currentQuestion === 0}>
              Vorige
            </button>
            <button
              onClick={currentQuestion + 1 === questions.length ? handleSubmitButton : handleNext}
              className="w-[49%] py-3 bg-indigo-600 rounded-lg">
              {currentQuestion + 1 === questions.length ? 'Inleveren' : 'Volgende'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const typeToSrcSwith = (questiontype: string): string => {
  switch (questiontype) {
    case 'Hemel & Aarde':
      return 'photo-1614730321146-b6fa6a46bcb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8';
    case 'Beeld & Geluid':
      return 'photo-1509281373149-e957c6296406?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGVsZXZpc2lvbnxlbnwwfHwwfHw%3D';
    case 'Vroeger & Later':
      return 'photo-1461360370896-922624d12aa1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8';
    case 'Kunst & Cultuur':
      return 'photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXJ0fGVufDB8fDB8fA%3D%3D';
    case 'Natuur & Techniek':
      return 'photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dGVjaG5vbG9neXxlbnwwfHwwfHw%3D';
    case 'Sport & Hobby':
      return 'flagged/photo-1574786351749-2c2b5984a541?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Zm9ybXVsYSUyMDF8ZW58MHx8MHx8';
    default:
      return 'photo-1614730321146-b6fa6a46bcb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8';
  }
};

export default Home;

function Result(score: number) {
  return (<>
  <h1 className="text-3xl font-semibold text-center text-white">
  🎉🎉 Gefliciteerd! 🎉🎉
  </h1>
  <h1 className="text-3xl font-semibold text-center text-white/40">
    {score} vragen van de {questions.length} goed
  </h1>
  <p className="font-semibold mt-10 text-center text-white">Ga naar boven</p>
  </>);
}

