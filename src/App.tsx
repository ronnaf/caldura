import * as React from 'react'
import { StyleSheet, css } from 'aphrodite'

type Props = {}
type SingleInputState = {
	value: string
}

const App: React.FC<Props> = () => {
	const [inputs, setInputs] = React.useState<SingleInputState[]>([
		{ value: '' }
	])

	const addInput = (): void => {
		setInputs([...inputs, { value: '' }])
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
							<div style={{ margin: '14px 0', height: 24 }}>
								<input
									type="text"
									style={{ height: 'inherit', marginRight: 6 }}
									value={el.value}
									
									onChange={e => handleInput(i, e.target.value)}
								/>
								<button style={{ height: 30 }} onClick={() => removeInput(i)}>
									x
								</button>
							</div>
						)
					})}

					<button className={css(styles.calculateButton)}>Calculate!</button>
				</div>
			</div>
		</div>
	)
}

const styles = StyleSheet.create({
	calculateButton: {
		marginTop: 12,
		padding: '12px 18px',
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
	}
})

export default App
