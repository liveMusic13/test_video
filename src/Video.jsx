import { useRef, useState } from 'react';

// const Video = () => {
// 	const videoRef = useRef(null); // Ссылка на элемент <video>
// 	const mediaRecorderRef = useRef(null); // Ссылка на MediaRecorder
// 	const [isRecording, setIsRecording] = useState(false); // Статус записи
// 	const [recordedChunks, setRecordedChunks] = useState([]); // Хранение записанных данных
// 	const streamRef = useRef(null); // Ссылка на видеопоток
// 	const [capturedPhoto, setCapturedPhoto] = useState(null); // Хранение сделанного фото
// 	const [useFrontCamera, setUseFrontCamera] = useState(true); // Состояние для переключения камеры

// 	// Открываем камеру с учётом выбранной камеры (фронтальная или задняя)
// 	async function openCamera() {
// 		try {
// 			const stream = await navigator.mediaDevices.getUserMedia({
// 				video: {
// 					facingMode: useFrontCamera ? 'user' : 'environment', // Переключение между камерами
// 				},
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

// 	// Сделать фото с камеры
// 	const capturePhoto = () => {
// 		const canvas = document.createElement('canvas');
// 		const context = canvas.getContext('2d');
// 		canvas.width = videoRef.current.videoWidth;
// 		canvas.height = videoRef.current.videoHeight;
// 		context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

// 		// Преобразуем canvas в изображение
// 		const dataUrl = canvas.toDataURL('image/png');
// 		setCapturedPhoto(dataUrl); // Сохраняем фото
// 	};

// 	// Переключение между камерами
// 	const toggleCamera = () => {
// 		closeCamera(); // Сначала отключаем текущую камеру
// 		setUseFrontCamera(prev => !prev); // Переключаемся между фронтальной и задней камерой
// 		openCamera(); // Открываем камеру с новым режимом
// 	};

// 	return (
// 		<div>
// 			<video ref={videoRef} width='400' height='300' autoPlay />
// 			<div>
// 				{!isRecording ? (
// 					<button onClick={startRecording}>Start Recording</button>
// 				) : (
// 					<button onClick={stopRecording}>Stop Recording</button>
// 				)}
// 				<button onClick={saveVideo} disabled={recordedChunks.length === 0}>
// 					Save Video
// 				</button>
// 				<button onClick={closeCamera}>Close Camera</button>
// 				<button onClick={capturePhoto}>Take Photo</button>
// 				<button onClick={toggleCamera}>
// 					{useFrontCamera ? 'Switch to Rear Camera' : 'Switch to Front Camera'}
// 				</button>
// 			</div>

// 			<button onClick={openCamera}>Open Camera</button>

// 			{/* Отображение сделанного фото */}
// 			{capturedPhoto && (
// 				<div>
// 					<h3>Captured Photo:</h3>
// 					<img
// 						src={capturedPhoto}
// 						alt='Captured'
// 						style={{ width: '400px', height: '300px' }}
// 					/>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

import { useEffect } from 'react';

const Video = () => {
	const videoRef = useRef(null);
	const mediaRecorderRef = useRef(null);
	const [isRecording, setIsRecording] = useState(false);
	const [recordedChunks, setRecordedChunks] = useState([]);
	const streamRef = useRef(null);
	const [capturedPhoto, setCapturedPhoto] = useState(null);
	const [useFrontCamera, setUseFrontCamera] = useState(true);

	// Открыть камеру
	async function openCamera() {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: {
					facingMode: useFrontCamera ? 'user' : 'environment',
				},
			});
			streamRef.current = stream;
			videoRef.current.srcObject = stream;
			videoRef.current.play();

			// Отключаем возможность открыть видео в полный экран
			videoRef.current.addEventListener('click', event =>
				event.preventDefault()
			);
			videoRef.current.webkitPlaysInline = true;
			videoRef.current.playsInline = true;

			// MediaRecorder для записи видео
			mediaRecorderRef.current = new MediaRecorder(stream, {
				mimeType: 'video/webm',
			});
			mediaRecorderRef.current.ondataavailable = event => {
				if (event.data.size > 0) {
					setRecordedChunks(prev => [...prev, event.data]);
				}
			};
		} catch (err) {
			console.error('Ошибка доступа к камере:', err);
		}
	}

	// Закрытие камеры
	const closeCamera = () => {
		if (streamRef.current) {
			streamRef.current.getTracks().forEach(track => track.stop());
			streamRef.current = null;
		}
	};

	// Начать запись
	const startRecording = () => {
		if (mediaRecorderRef.current) {
			setRecordedChunks([]);
			mediaRecorderRef.current.start();
			setIsRecording(true);
		} else {
			console.error('MediaRecorder не инициализирован');
		}
	};

	// Остановить запись
	const stopRecording = () => {
		if (mediaRecorderRef.current) {
			mediaRecorderRef.current.stop();
			setIsRecording(false);
		}
	};

	// Сохранить видео
	const saveVideo = () => {
		const blob = new Blob(recordedChunks, { type: 'video/webm' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.style.display = 'none';
		a.href = url;
		a.download = 'recorded-video.webm';
		document.body.appendChild(a);
		a.click();
		window.URL.revokeObjectURL(url);
	};

	// Сделать фото
	const capturePhoto = () => {
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');
		canvas.width = videoRef.current.videoWidth;
		canvas.height = videoRef.current.videoHeight;
		context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
		const dataUrl = canvas.toDataURL('image/png');
		setCapturedPhoto(dataUrl);
	};

	// Переключение камеры
	const toggleCamera = () => {
		closeCamera();
		setUseFrontCamera(prev => !prev);
		openCamera();
	};

	// Хук для инициализации камеры при загрузке компонента
	useEffect(() => {
		openCamera();
		return () => closeCamera();
	}, [useFrontCamera]);

	return (
		<div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
			<video
				ref={videoRef}
				width='100%'
				height='auto'
				autoPlay
				muted
				playsInline
				style={{
					objectFit: 'cover',
					width: '100%',
					height: '300px',
					touchAction: 'none',
					pointerEvents: 'none', // Запрет взаимодействия с видео
				}}
			/>

			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: '10px',
					background: 'rgba(0, 0, 0, 0.3)',
				}}
			>
				<button
					onClick={toggleCamera}
					style={{
						backgroundColor: 'white',
						borderRadius: '50%',
						padding: '10px',
					}}
				>
					{useFrontCamera ? '🔄 Задняя' : '🔄 Фронтальная'}
				</button>
				<div>
					{!isRecording ? (
						<button
							onClick={startRecording}
							style={{
								backgroundColor: 'red',
								color: 'white',
								padding: '10px 20px',
								borderRadius: '10px',
							}}
						>
							🎥 Запись
						</button>
					) : (
						<button
							onClick={stopRecording}
							style={{
								backgroundColor: 'red',
								color: 'white',
								padding: '10px 20px',
								borderRadius: '10px',
							}}
						>
							⏹ Остановить
						</button>
					)}
					<button
						onClick={capturePhoto}
						style={{
							backgroundColor: 'green',
							color: 'white',
							padding: '10px 20px',
							marginLeft: '10px',
							borderRadius: '10px',
						}}
					>
						📸 Фото
					</button>
				</div>
				<button
					onClick={closeCamera}
					style={{ backgroundColor: 'gray', padding: '10px 20px' }}
				>
					🚫 Закрыть камеру
				</button>
			</div>

			{capturedPhoto && (
				<div>
					<h3>Фото:</h3>
					<img src={capturedPhoto} alt='Captured' style={{ width: '100%' }} />
				</div>
			)}
		</div>
	);
};

export default Video;
