import React, { useState } from 'react';
import styled from 'styled-components';
import quizData from './quizData'; 

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Arial', sans-serif;
  justify-content: center;
  margin: 50px auto; 
  padding: 0 20px; 
`;

const BackgroundImage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/background.jpg'); 
  background-size: cover;
  background-position: center;
  z-index: -1;
`;

const QuestionCard = styled.div`
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  width: 90%; 
  max-width: 800px; 
  background-color: #F5F5DC;
  text-align: center;
`;

const AnswerCard = styled.div`
  padding: 20px;
  border-radius: 10px;
  background-color: #F5F5DC;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  width: 100%; 
  max-width: 800px; 
`;

const Question = styled.h2`
  font-size: 28px;;
  margin-bottom: 7px;
  text-align: center;
  font-weight: bold;
  font-family: 'Arial', sans-serif;
  color:  #800080;
`;


const Option = styled.label`
  display: block;
  margin-bottom: 6px;
  font-size: 22px;
  cursor: pointer;

  input[type="radio"] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 25px;
    height: 25px;
    border: 2px solid #F7ADE0;
    outline: none;
    margin-right: 10px;
    position: relative;
    vertical-align: middle;
  }

  input[type="radio"]:checked {
    background-color: #F7ADE0;
  }

  input[type="radio"]:checked::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 16px; 
    height: 16px; 
    background-color: #F7ADE0;
    border-radius: 2px; 
  }
`;




const Button = styled.button`
  background-color:  #800080;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 22px;
  margin-top: 6px;
  margin-bottom: 6px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #F7ADE0;
  }
`;

// const Image = styled.img`
//   width: 100%; 
//   max-width: 800px; 
//   height: 300px;
//   margin-top: 20px;
//   object-fit: cover;
//   border-radius: 10px;
//   margin-bottom: 20px;
// `;

const Image = styled.img`
  width: 100%; 
  max-width: 600px; 
  height: auto;     
  margin: 20px auto; 
  border-radius: 10px;
`;

const Comment = styled.p`
  font-size: 1.2rem; 
  margin-bottom: 10px;
  text-align: center;
  font-weight: bold;
  font-family: 'Arial', sans-serif;
`;


  const FinalScore = [
    {
      score: 0,
      comment: "did you even watch the show?",
      image: '/images/0to5.jpg'
    },
    {
      score: 5,
      comment: "you love friends, you just watched it a long time ago",
      image: '/images/5-10.jpg'
    },
    {
      score: 10,
      comment: "Great score, you’re a good fan of the show.",
      image: '/images/10-15.jpg'
    },
    {
      score: 15,
      comment: "Wow you know friends well, this is probably your comfort show.",
      image: '/images/15-19.png'
    },
    {
      score: 20,
      comment: "Congrats, you’re a hard core friend fan, now go touch some grass. 😱 ",
      image: '/images/20.png'

    }
  ]

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [comment, setComment] = useState('');
  const [image, setImage] = useState('');




  

  
  const questions = quizData; 
  const handleAnswerSelect = (selectedOption) => {
    setUserAnswers({...userAnswers, [currentQuestion]: selectedOption});
  };

  const handleSubmit = () => {
  const selectedOption = userAnswers[currentQuestion];
  if (selectedOption === questions[currentQuestion].correctAnswer) {
    setScore(score + 1);
  }
  setCurrentQuestion(currentQuestion + 1); 
  handleScore(score + 1);
};

  const handleScore = (score) => {
    if (score >= 0 && score < 5) {
        setComment(FinalScore[0].comment);
        setImage(FinalScore[0].image);
    } else if (score >= 5 && score < 10) {
        setComment(FinalScore[1].comment);
        setImage(FinalScore[1].image);
    } else if (score >= 10 && score < 15) {
        setComment(FinalScore[2].comment);
        setImage(FinalScore[2].image);
    } else if (score >= 15 && score < 20) {
        setComment(FinalScore[3].comment);
        setImage(FinalScore[3].image);
    } else if (score === 20) {
        setComment(FinalScore[4].comment);
        setImage(FinalScore[4].image);
    }
};



  const handleRestart = () => {
    setCurrentQuestion(0);
    setUserAnswers({});
    setScore(0);
  };

  return (
    <>
      <BackgroundImage />
      <Container>
        {currentQuestion < questions.length ? (
          <>
            <QuestionCard>
              <Question>{questions[currentQuestion].question}</Question>
              <Image src={questions[currentQuestion].image} />

            </QuestionCard>
            {questions[currentQuestion].options.map((option, index) => (
              <AnswerCard key={index}>
               <Option>
                  <input 
                    type="radio" 
                    name="option" 
                    value={option} 
                    onChange={() => handleAnswerSelect(option)}
              
                    checked={userAnswers[currentQuestion] === option} 
                   
                  />
                  {option} 
                </Option>
              </AnswerCard>
            ))}
            <Button onClick={handleSubmit}>Next</Button>
          </>
        ) : (
          <div>
            <Question>Quiz Completed!</Question>
            <Comment>{comment}</Comment>
            <br></br>
            <Image src={image} />
            <br></br>
            <p>{score} / {questions.length}</p>
            <br></br>
            <Button onClick={handleRestart}>Restart</Button>
            <p>Thanks for playing!</p>
          </div>
        )}
      </Container>
    </>
  );
};

export default Quiz;
