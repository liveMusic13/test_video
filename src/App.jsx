import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useState } from 'react';
import './App.css';

function App() {
	// Начальные значения диапазона
	const [values, setValues] = useState([0, 20000]);

	const handleSliderChange = newValues => {
		setValues(newValues);
	};
	return (
		<div>
			<h1>test</h1>

			<p>{values[0]}</p>
			<p>{values[1]}</p>

			<Slider
				range
				min={0}
				max={20000}
				defaultValue={[5000, 20000]}
				onChange={handleSliderChange}
				styles={{
					rail: { backgroundColor: '#e9e9e9', height: 2 }, // Передается объект
					track: { backgroundColor: '#007bff', height: 2 }, // Передается объект
					handle: {
						borderColor: '#007bff',
						height: 20,
						width: 20,
						marginTop: '-10px',
					}, // Передается объект
				}}
			/>
		</div>
	);
}

export default App;
