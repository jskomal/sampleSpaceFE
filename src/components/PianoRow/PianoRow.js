import React from 'react'
import './PianoRow.css'

<<<<<<< HEAD
const PianoRow = ({ name, note, steps, currentStepIndex, setSteps }) => {
=======
const PianoRow = ({ name, note, steps, currentStepIndex, setSteps, isPlaying}) => {

>>>>>>> 159fa2e (Pass isPlaying as props)
  const toggleNote = (note, i) => {
    let newSteps = [...steps]

    if (!steps[i]) {
      newSteps[i] = [note]
      setSteps(newSteps)
      return
    } else if (steps[i].includes(note)) {
      newSteps[i] = newSteps[i].filter((nt) => nt !== note)
      if (newSteps[i].length === 0) newSteps[i] = null
      setSteps(newSteps)
      return
    } else {
      newSteps[i].push(note)
      setSteps(newSteps)
      return
    }
  }

  let row = (
    <div className='row'>
      {/* {name ? <p>{name}</p> : <p> </p>} */}
      {name
        ? steps.map((step, index) =>
            steps[index] && steps[index].includes(note) ? (
              <button
                onClick={() => toggleNote(note, index)}
                key={index}
                className='active piano-button'
              ></button>
            ) : (
              <button
                onClick={() => toggleNote(note, index)}
                key={index}
                className='piano-button'
              ></button>
            )
          )
        : steps.map((step, index) => <p key={index}>{index + 1}</p>)}
    </div>
  )

  return <>{row}</>
}

export default PianoRow
