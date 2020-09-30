import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  if (props.total === 0 && props.alert === true) {
    return (
      <tr>
        <td>No feedback given</td>
      </tr>
    )
  }

  else if (props.total === 0) {
    return (
      <tr></tr>
    )
  }

  else return (
    <tr>
      <td>{props.text} {props.value}</td>
    </tr>
  )
}

const Button = ({ handleClick, text }) => (  
  <button onClick={handleClick}>    
    {text}  
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <div>
        <h1>Give Feedback</h1>
			<Button handleClick={handleGoodClick} text='good' />
			<Button handleClick={handleNeutralClick} text='neutral' />
			<Button handleClick={handleBadClick} text='bad' />
        <h1>Statistics</h1>
        <table>
			<tbody>
				<Statistics alert={true} total={good+bad+neutral}/>
				<Statistics text="good" value={good} total={good+bad+neutral} />
				<Statistics text="neutral" value={neutral} total={good+bad+neutral}/>
				<Statistics text="bad" value={bad} total={good+bad+neutral}/>
				<Statistics text="all" value={good+bad+neutral} total={good+bad+neutral}/>
				<Statistics text="average" value={(good-bad)/(good+bad+neutral)} total={good+bad+neutral}/>
				<Statistics text="positive" value={(good)/(bad+good+neutral)*100} total={good+bad+neutral}/>
			</tbody>
        </table>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)