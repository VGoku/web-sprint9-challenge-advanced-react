// import React, { useState } from 'react'

// // Suggested initial states
// const initialMessage = ''
// const initialEmail = ''
// const initialSteps = 0
// const initialIndex = 4 // the index the "B" is at

// export default function AppFunctional(props) {
//   // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
//   // You can delete them and build your own logic from scratch.

//   function getXY() {
//     // It it not necessary to have a state to track the coordinates.
//     // It's enough to know what index the "B" is at, to be able to calculate them.
//   }

//   function getXYMessage() {
//     // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
//     // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
//     // returns the fully constructed string.
//   }

//   function reset() {
//     // Use this helper to reset all states to their initial values.
//   }

//   function getNextIndex(direction) {
//     // This helper takes a direction ("left", "up", etc) and calculates what the next index
//     // of the "B" would be. If the move is impossible because we are at the edge of the grid,
//     // this helper should return the current index unchanged.
//   }

//   function move(evt) {
//     // This event handler can use the helper above to obtain a new index for the "B",
//     // and change any states accordingly.
//   }

//   function onChange(evt) {
//     // You will need this to update the value of the input.
//   }

//   function onSubmit(evt) {
//     // Use a POST request to send a payload to the server.
//   }

//   return (
//     <div id="wrapper" className={props.className}>
//       <div className="info">
//         <h3 id="coordinates">Coordinates (2, 2)</h3>
//         <h3 id="steps">You moved 0 times</h3>
//       </div>
//       <div id="grid">
//         {
//           [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
//             <div key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
//               {idx === 4 ? 'B' : null}
//             </div>
//           ))
//         }
//       </div>
//       <div className="info">
//         <h3 id="message"></h3>
//       </div>
//       <div id="keypad">
//         <button id="left">LEFT</button>
//         <button id="up">UP</button>
//         <button id="right">RIGHT</button>
//         <button id="down">DOWN</button>
//         <button id="reset">reset</button>
//       </div>
//       <form>
//         <input id="email" type="email" placeholder="type email"></input>
//         <input id="submit" type="submit"></input>
//       </form>
//     </div>
//   )
// }



import React, { useState } from 'react';
import axios from 'axios';

const initialIndex = 4; // The starting index (center of the grid)
const initialSteps = 0;

const AppFunctional = () => {
  const [index, setIndex] = useState(initialIndex);
  const [steps, setSteps] = useState(initialSteps);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const getCoordinates = (index) => {
    const x = (index % 3) + 1;
    const y = Math.floor(index / 3) + 1;
    return `(${x},${y})`;
  };

  const move = (direction) => {
    setMessage('');
    if (direction === 'up' && index > 2) {
      setIndex(index - 3);
      setSteps(steps + 1);
    } else if (direction === 'down' && index < 6) {
      setIndex(index + 3);
      setSteps(steps + 1);
    } else if (direction === 'left' && index % 3 !== 0) {
      setIndex(index - 1);
      setSteps(steps + 1);
    } else if (direction === 'right' && index % 3 !== 2) {
      setIndex(index + 1);
      setSteps(steps + 1);
    } else {
      setMessage(`You can't go ${direction}`);
    }
  };

  const reset = () => {
    setIndex(initialIndex);
    setSteps(initialSteps);
    setMessage('');
    setEmail('');
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const x = (index % 3) + 1;
    const y = Math.floor(index / 3) + 1;
    const payload = { x, y, steps, email };

    axios.post('http://localhost:9000/api/result', payload)
      .then(response => {
        setMessage(response.data.message);
        setEmail('');
      })
      .catch(error => {
        setMessage(error.response.data.message);
      });
  };

  return (
    <div id="wrapper">
      <div className="info">
        <h3 id="coordinates">Coordinates {getCoordinates(index)}</h3>
        <h3 id="steps">You moved {steps} {steps === 1 ? 'time' : 'times'}</h3>
      </div>
      <div id="grid">
        {Array(9).fill(null).map((_, i) => (
          <div key={i} className={`square${i === index ? ' active' : ''}`}>
            {i === index ? 'B' : ''}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="up" onClick={() => move('up')}>UP</button>
        <button id="down" onClick={() => move('down')}>DOWN</button>
        <button id="left" onClick={() => move('left')}>LEFT</button>
        <button id="right" onClick={() => move('right')}>RIGHT</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={handleSubmit}>
        <input 
          id="email" 
          type="email" 
          placeholder="type email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input id="submit" type="submit" />
      </form>
    </div>
  );
};

export default AppFunctional;
