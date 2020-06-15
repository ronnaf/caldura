import * as React from 'react'
import { StyleSheet, css } from 'aphrodite'

type Props = {}
type SingleInputState = {
  value: string
  error: string
}
type SingleResultState = {
  duration: string
  decimal: number
}

const App: React.FC<Props> = () => {
  const initialInput: SingleInputState = { value: '', error: '' }
  const initialResult: SingleResultState = { duration: '00:00', decimal: 0.0 }

  const [inputs, setInputs] = React.useState<SingleInputState[]>([initialInput])
  const [result, setResult] = React.useState<SingleResultState>(initialResult)

  const addInput = (): void => {
    setInputs([...inputs, initialInput])
  }

  const handleInput = (index: number, value: string): void => {
    let newInputs = [...inputs]
    newInputs[index].value = value
    setInputs(newInputs)
  }

  const removeInput = (index: number): void => {
    if (inputs.length > 1) {
      let newInputs = [...inputs]
      newInputs.splice(index, 1)
      setInputs(newInputs)
    }
  }

  const validateInput = (index: number, value: string): void => {
    let newInputs = [...inputs]

    const durationRegex = /^\d{2}:\d{2}(:\d{2})?$/
    if (!durationRegex.test(value)) {
      newInputs[index].error = '⚠️ Invalid format!'
    } else {
      newInputs[index].error = ''
    }
    setInputs(newInputs)
  }

  const calculate = (): void => {
    if (!inputs[0].value) {
      return
    }

    // calculate duration in decimal
    let totalHours = 0.0
    for (let i = 0; i < inputs.length; i++) {
      const element = inputs[i].value
      const splits = element.split(':')
      const hours = parseFloat(splits[0])
      const minsToHours = parseFloat(splits[1]) / 60
      const secsToHours = (parseFloat(splits[2]) / 3600) || 0
      totalHours += hours + minsToHours + secsToHours
    }

    // calculate duration in 00:00 format based on totalHours
    const decimalSplits = `${totalHours}`.split('.')
    const hours = parseInt(decimalSplits[0])
    const duration = `${decimalSplits[0]}:${(totalHours - hours) * 60}`

    setResult({ decimal: totalHours, duration })
  }

  const clear = (): void => {
    setInputs([initialInput])
    setResult(initialResult)
  }

  return (
    <div style={{ margin: 16, fontFamily: 'sans-serif' }}>
      <h1>Calculate Duration</h1>

      {/* horizontal break */}
      <div
        style={{
          width: 60,
          height: 5,
          borderRadius: 5,
          background: 'lightblue'
        }}
      />

      {/* input list */}
      <div style={{ marginTop: 24, width: 420 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <div>Input a time duration in string to get started</div>
          <button onClick={addInput}>Add field</button>
        </div>

        {/* inputs */}
        <div style={{ marginTop: 16 }}>
          {inputs.map((el, i) => {
            return (
              <div key={`inputs${i}`} style={{ margin: '14px 0', height: 24 }}>
                <input
                  type="text"
                  style={{ height: 'inherit', marginRight: 6 }}
                  value={el.value}
                  onBlur={e => validateInput(i, e.target.value)}
                  onChange={e => handleInput(i, e.target.value)}
                />
                <button style={{ height: 30 }} onClick={() => removeInput(i)}>
                  x
                </button>
                {el.error && (
                  <span style={{ marginLeft: 16, fontSize: 14, color: '#EF5D7B' }}>
										{el.error}
									</span>
                )}
              </div>
            )
          })}
        </div>

        <div style={{ marginTop: 24 }}>
          <button className={css([styles.defaultButton, styles.calculateButton])} onClick={calculate}>Calculate!</button>
          <button className={css([styles.defaultButton, styles.clearButton])} onClick={clear}>x</button>
          <span className={css(styles.result)}>{result.decimal.toFixed(2)}</span>
          <span className={css(styles.result)}>{result.duration}</span>
        </div>

        {/* footer */}
        <div style={{ marginTop: 64 }}>
          <div style={{ fontSize: 13, color: '#B3B3B3' }}>Ronna Firmo ©2020</div>
          <div style={{ fontSize: 9, color: '#D9D9D9' }}>Made to calculate total duration in decimal for my timesheet</div>
        </div>
      </div>
    </div>
  )
}

const styles = StyleSheet.create({
  defaultButton: {
    marginTop: 12,
    border: 0,
    borderRadius: 2,
    boxShadow: '0 4px 0 0 #C9C9C9',
    outline: 'none',
    ':hover': {
      background: '#EBEBEB'
    },
    ':active': {
      background: '#E4E4E4',
      boxShadow: '0 2px 0 0 #C9C9C9',
      transform: 'translate(0, 2px)'
    }
  },
  calculateButton: {
    padding: '12px 18px',
  },
  clearButton: {
    padding: 12,
    marginLeft: 4
  },
  result: {
    marginLeft: 24,
    fontSize: 18,
    fontWeight: 'bold',
    background: 'yellow',
    padding: '0px 6px'
  }
})

export default App
