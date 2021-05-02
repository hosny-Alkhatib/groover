/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react';
import fire from '../fire';
import firebase from 'firebase';
import { Container } from 'react-bootstrap';
import Style from '../style/grinder.module.css';
import TinderCard from 'react-tinder-card';
<<<<<<< HEAD
import { Database } from 'react-feather';
=======
>>>>>>> f10caebfad7ff88e50878e79e4188c8e19a70221

const db = [
  {
    name: 'Richard Hendricks',
    url: '../assets/icons/search.svg',
  },
  {
    name: 'Erlich Bachman',
    url: '../assets/icons/search.svg',
  },
  {
    name: 'Monica Hall',
    url: '../assets/icons/search.svg',
  },
  {
    name: 'Jared Dunn',
    url: '../assets/icons/search.svg',
  },
  {
    name: 'Dinesh Chugtai',
    url: '../assets/icons/search.svg',
  },
];
const alreadyRemoved = [];
let charactersState = db;

const Grinder = () => {
  const [user, setUser] = useState(null);
  const [characters, setCharacters] = useState(db);
  const [lastDirection, setLastDirection] = useState();
  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
<<<<<<< HEAD
    []
=======
    [],
>>>>>>> f10caebfad7ff88e50878e79e4188c8e19a70221
  );

  const obServer = () => {
    const authObserver = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    return authObserver;
  };
  useEffect(() => {
    obServer();
  }, [user]);

  if (!user) {
    return (
      <Container>
        <p>
<<<<<<< HEAD
          Sorry, you have to <a href='/login'>login</a> to see your profile.
=======
          Sorry, you have to <a href="/login">login</a> to see your profile.
>>>>>>> f10caebfad7ff88e50878e79e4188c8e19a70221
        </p>
      </Container>
    );
  }

  const swiped = (direction, nameToDelete) => {
<<<<<<< HEAD
    // if (direction === 'left') {
    //   var leftswaped = firebase.database.ref(user.id);
    //   console.log(leftswaped);
    // const users = firebase.database().child(user.id).set({
    //   leftswaped: leftswaped,
    // });
    // }
=======
>>>>>>> f10caebfad7ff88e50878e79e4188c8e19a70221
    console.log('removing: ' + nameToDelete);
    setLastDirection(direction);
    alreadyRemoved.push(nameToDelete);
  };

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!');
    charactersState = charactersState.filter(
<<<<<<< HEAD
      (character) => character.name !== name
=======
      (character) => character.name !== name,
>>>>>>> f10caebfad7ff88e50878e79e4188c8e19a70221
    );
    setCharacters(charactersState);
  };

  const swipe = (dir) => {
    const cardsLeft = characters.filter(
<<<<<<< HEAD
      (person) => !alreadyRemoved.includes(person.name)
=======
      (person) => !alreadyRemoved.includes(person.name),
>>>>>>> f10caebfad7ff88e50878e79e4188c8e19a70221
    );
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name; // Find the card object to be removed
      const index = db.map((person) => person.name).indexOf(toBeRemoved); // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir); // Swipe the card!
    }
  };

  return (
    <>
      <Container>
        <div className={Style.grinder_main}>
          <h1 className={`text-center`}>Grinder!</h1>
          <div className={`${Style.grinder__container}`}>
<<<<<<< HEAD
            <div className='cardContainer'>
              {characters.map((character, index) => (
                <TinderCard
                  ref={childRefs[index]}
                  className='swipe'
=======
            <div className="cardContainer">
              {characters.map((character, index) => (
                <TinderCard
                  ref={childRefs[index]}
                  className="swipe"
>>>>>>> f10caebfad7ff88e50878e79e4188c8e19a70221
                  key={character.name}
                  onSwipe={(dir) => swiped(dir, character.name)}
                  onCardLeftScreen={() => outOfFrame(character.name)}
                >
                  <div
                    style={{ backgroundImage: 'url(' + character.url + ')' }}
<<<<<<< HEAD
                    className='card'
=======
                    className="card"
>>>>>>> f10caebfad7ff88e50878e79e4188c8e19a70221
                  >
                    <h3 style={{ color: '#000' }}>{character.name}</h3>
                  </div>
                </TinderCard>
              ))}
            </div>
<<<<<<< HEAD
            <div className='buttons'>
=======
            <div className="buttons">
>>>>>>> f10caebfad7ff88e50878e79e4188c8e19a70221
              <button onClick={() => swipe('left')}>Swipe left!</button>
              <button onClick={() => swipe('up')}>Swipe up!</button>

              <button onClick={() => swipe('right')}>Swipe right!</button>
            </div>
            {lastDirection ? (
<<<<<<< HEAD
              <h2 key={lastDirection} className='infoText'>
                Swiped {lastDirection}
              </h2>
            ) : (
              <h2 className='infoText'>Start Swipin' !</h2>
=======
              <h2 key={lastDirection} className="infoText">
                Swiped {lastDirection}
              </h2>
            ) : (
              <h2 className="infoText">Start Swipin' !</h2>
>>>>>>> f10caebfad7ff88e50878e79e4188c8e19a70221
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Grinder;

/*
        <Container>
          <p>
            Sorry, you have to <a href="/login">login</a> to see your profile.
          </p>
        </Container>

        */

// const handleDragStart = (e) => {
//   e.target.style.transform = 'rotate(10deg)';
//   console.log(e.pageX, e.pageY);
// };

// const handleDragEnd = (e) => {
//   e.target.style.transform = 'rotate(0deg)';
//   console.log(e.pageX, e.pageY);
// };
// const handleDrag = (e) => {
//   // Grinder.js:31 673 314
//   // default X: 673, 314
//   if (e.pageX > 750 && e.pageX > 0) {
//     e.target.style.transform = 'rotate(10deg)';
//   } else if (e.pageX < 685 && e.pageX > 0) {
//     e.target.style.transform = 'rotate(-10deg)';
//   } else {
//     e.target.style.transform = 'rotate(0deg)';
//   }
// };
// let offsetX, offsetY;
// const move = (e) => {
//   const el = e.target;
//   el.style.left = `${e.pageX - offsetX}px`;
//   el.style.top = `${e.pageY - offsetY}px`;
// };
// const add = (e) => {
//   const el = e.target;
//   offsetX = e.clientX - el.getBoundingClientRect().left;
//   offsetY = e.clientY - el.getBoundingClientRect().top;
//   el.addEventListener('mousemove', move);
// };
// const remove = (e) => {
//   const el = e.target;
//   el.removeEventListener('mousemove', move);
// };
