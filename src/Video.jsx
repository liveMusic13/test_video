import { useRef, useState } from 'react';

// const Video = () => {
// 	const videoRef = useRef(null); // Ссылка на элемент <video>
// 	const mediaRecorderRef = useRef(null); // Ссылка на MediaRecorder
// 	const [isRecording, setIsRecording] = useState(false); // Статус записи
// 	const [recordedChunks, setRecordedChunks] = useState([]); // Хранение записанных данных
// 	const streamRef = useRef(null); // Ссылка на видеопоток

// 	// Открываем камеру и транслируем видео в <video> элемент
// 	async function openCamera() {
// 		try {
// 			const stream = await navigator.mediaDevices.getUserMedia({
// 				video: true, // Запрашиваем доступ к камере
// 			});
// 			streamRef.current = stream; // Сохраняем поток для последующего отключения
// 			videoRef.current.srcObject = stream; // Отображаем поток в элементе <video>
// 			videoRef.current.play();

// 			// Инициализируем MediaRecorder для записи видео
// 			mediaRecorderRef.current = new MediaRecorder(stream, {
// 				mimeType: 'video/webm', // Формат записи
// 			});

// 			// Событие, которое срабатывает при получении данных во время записи
// 			mediaRecorderRef.current.ondataavailable = event => {
// 				if (event.data.size > 0) {
// 					setRecordedChunks(prev => [...prev, event.data]);
// 				}
// 			};
// 		} catch (err) {
// 			console.error('Ошибка доступа к камере:', err);
// 		}
// 	}

// 	// Отключаем камеру, останавливая все потоки
// 	const closeCamera = () => {
// 		if (streamRef.current) {
// 			streamRef.current.getTracks().forEach(track => track.stop()); // Останавливаем все треки
// 			streamRef.current = null; // Очищаем ссылку на поток
// 		}
// 	};

// 	// Начать запись видео
// 	const startRecording = () => {
// 		if (mediaRecorderRef.current) {
// 			setRecordedChunks([]); // Очищаем предыдущие данные
// 			mediaRecorderRef.current.start(); // Начинаем запись
// 			setIsRecording(true); // Устанавливаем статус записи
// 		} else {
// 			console.error('MediaRecorder не инициализирован');
// 		}
// 	};

// 	// Остановить запись видео
// 	const stopRecording = () => {
// 		if (mediaRecorderRef.current) {
// 			mediaRecorderRef.current.stop(); // Останавливаем запись
// 			setIsRecording(false); // Обновляем статус
// 		}
// 	};

// 	// Сохранить записанное видео
// 	const saveVideo = () => {
// 		const blob = new Blob(recordedChunks, { type: 'video/webm' });
// 		const url = URL.createObjectURL(blob);
// 		const a = document.createElement('a');
// 		a.style.display = 'none';
// 		a.href = url;
// 		a.download = 'recorded-video.webm'; // Название файла
// 		document.body.appendChild(a);
// 		a.click();
// 		window.URL.revokeObjectURL(url);
// 	};

// 	return (
// 		<div>
// 			<video ref={videoRef} width='400' height='300' controls />
// 			<div>
// 				{!isRecording ? (
// 					<button onClick={startRecording}>Start Recording</button>
// 				) : (
// 					<button onClick={stopRecording}>Stop Recording</button>
// 				)}
// 				<button onClick={saveVideo} disabled={recordedChunks.length === 0}>
// 					Save Video
// 				</button>
// 				<button onClick={closeCamera}>Close Camera</button>{' '}
// 				{/* Кнопка для отключения камеры */}
// 			</div>
// 			<button onClick={openCamera}>Open Camera</button>
// 		</div>
// 	);
// };

const Video = () => {
	const videoRef = useRef(null); // Ссылка на элемент <video>
	const mediaRecorderRef = useRef(null); // Ссылка на MediaRecorder
	const [isRecording, setIsRecording] = useState(false); // Статус записи
	const [recordedChunks, setRecordedChunks] = useState([]); // Хранение записанных данных
	const streamRef = useRef(null); // Ссылка на видеопоток
	const [capturedPhoto, setCapturedPhoto] = useState(null); // Хранение сделанного фото

	// Открываем камеру и транслируем видео в <video> элемент
	async function openCamera() {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true, // Запрашиваем доступ к камере
			});
			streamRef.current = stream; // Сохраняем поток для последующего отключения
			videoRef.current.srcObject = stream; // Отображаем поток в элементе <video>
			videoRef.current.play();

			// Инициализируем MediaRecorder для записи видео
			mediaRecorderRef.current = new MediaRecorder(stream, {
				mimeType: 'video/webm', // Формат записи
			});

			// Событие, которое срабатывает при получении данных во время записи
			mediaRecorderRef.current.ondataavailable = event => {
				if (event.data.size > 0) {
					setRecordedChunks(prev => [...prev, event.data]);
				}
			};
		} catch (err) {
			console.error('Ошибка доступа к камере:', err);
		}
	}

	// Отключаем камеру, останавливая все потоки
	const closeCamera = () => {
		if (streamRef.current) {
			streamRef.current.getTracks().forEach(track => track.stop()); // Останавливаем все треки
			streamRef.current = null; // Очищаем ссылку на поток
		}
	};

	// Начать запись видео
	const startRecording = () => {
		if (mediaRecorderRef.current) {
			setRecordedChunks([]); // Очищаем предыдущие данные
			mediaRecorderRef.current.start(); // Начинаем запись
			setIsRecording(true); // Устанавливаем статус записи
		} else {
			console.error('MediaRecorder не инициализирован');
		}
	};

	// Остановить запись видео
	const stopRecording = () => {
		if (mediaRecorderRef.current) {
			mediaRecorderRef.current.stop(); // Останавливаем запись
			setIsRecording(false); // Обновляем статус
		}
	};

	// Сохранить записанное видео
	const saveVideo = () => {
		const blob = new Blob(recordedChunks, { type: 'video/webm' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.style.display = 'none';
		a.href = url;
		a.download = 'recorded-video.webm'; // Название файла
		document.body.appendChild(a);
		a.click();
		window.URL.revokeObjectURL(url);
	};

	// Сделать фото с камеры
	const capturePhoto = () => {
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');
		canvas.width = videoRef.current.videoWidth;
		canvas.height = videoRef.current.videoHeight;
		context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

		// Преобразуем canvas в изображение
		const dataUrl = canvas.toDataURL('image/png');
		setCapturedPhoto(dataUrl); // Сохраняем фото
	};

	return (
		<div>
			<video ref={videoRef} width='400' height='300' controls />
			<div>
				{!isRecording ? (
					<button onClick={startRecording}>Start Recording</button>
				) : (
					<button onClick={stopRecording}>Stop Recording</button>
				)}
				<button onClick={saveVideo} disabled={recordedChunks.length === 0}>
					Save Video
				</button>
				<button onClick={closeCamera}>Close Camera</button>
				{/* Кнопка для захвата фото */}
				<button onClick={capturePhoto}>Take Photo</button>
			</div>

			<button onClick={openCamera}>Open Camera</button>

			{/* Отображение сделанного фото */}
			{capturedPhoto && (
				<div>
					<h3>Captured Photo:</h3>
					<img
						src={capturedPhoto}
						alt='Captured'
						style={{ width: '400px', height: '300px' }}
					/>
				</div>
			)}
		</div>
	);
};

export default Video;
