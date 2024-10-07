import { useRef, useState } from 'react';

import { useEffect } from 'react';

// const Video = () => {
// 	const videoRef = useRef(null);
// 	const mediaRecorderRef = useRef(null);
// 	const [isRecording, setIsRecording] = useState(false);
// 	const [recordedChunks, setRecordedChunks] = useState([]);
// 	const streamRef = useRef(null);
// 	const [capturedPhoto, setCapturedPhoto] = useState(null);
// 	const [capturedVideo, setCapturedVideo] = useState(null); // Для сохранения видео
// 	const [useFrontCamera, setUseFrontCamera] = useState(true);

// 	// Открыть камеру
// 	async function openCamera() {
// 		try {
// 			const stream = await navigator.mediaDevices.getUserMedia({
// 				video: {
// 					facingMode: useFrontCamera ? 'user' : 'environment',
// 				},
// 			});
// 			streamRef.current = stream;
// 			videoRef.current.srcObject = stream;
// 			videoRef.current.play();

// 			// Отключаем возможность открыть видео в полный экран
// 			videoRef.current.addEventListener('click', event =>
// 				event.preventDefault()
// 			);
// 			videoRef.current.webkitPlaysInline = true;
// 			videoRef.current.playsInline = true;

// 			// MediaRecorder для записи видео
// 			mediaRecorderRef.current = new MediaRecorder(stream, {
// 				mimeType: 'video/webm',
// 			});
// 			mediaRecorderRef.current.ondataavailable = event => {
// 				if (event.data.size > 0) {
// 					setRecordedChunks(prev => [...prev, event.data]);
// 				}
// 			};
// 		} catch (err) {
// 			console.error('Ошибка доступа к камере:', err);
// 		}
// 	}

// 	// Закрытие камеры
// 	const closeCamera = () => {
// 		if (streamRef.current) {
// 			streamRef.current.getTracks().forEach(track => track.stop());
// 			streamRef.current = null;
// 		}
// 	};

// 	// Начать запись
// 	const startRecording = () => {
// 		if (mediaRecorderRef.current) {
// 			setRecordedChunks([]);
// 			mediaRecorderRef.current.start();
// 			setIsRecording(true);
// 		} else {
// 			console.error('MediaRecorder не инициализирован');
// 		}
// 	};

// 	// Остановить запись
// 	const stopRecording = () => {
// 		if (mediaRecorderRef.current) {
// 			mediaRecorderRef.current.stop();
// 			setIsRecording(false);
// 		}
// 	};

// 	// Сохранить и показать видео
// 	useEffect(() => {
// 		if (recordedChunks.length > 0) {
// 			const blob = new Blob(recordedChunks, { type: 'video/webm' });
// 			const url = URL.createObjectURL(blob);
// 			setCapturedVideo(url); // Сохраняем URL для просмотра видео
// 		}
// 	}, [recordedChunks]);

// 	// Сделать фото
// 	const capturePhoto = () => {
// 		const canvas = document.createElement('canvas');
// 		const context = canvas.getContext('2d');
// 		canvas.width = videoRef.current.videoWidth;
// 		canvas.height = videoRef.current.videoHeight;
// 		context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
// 		const dataUrl = canvas.toDataURL('image/png');
// 		setCapturedPhoto(dataUrl); // Сохраняем фото для просмотра
// 	};

// 	// Переключение камеры
// 	const toggleCamera = () => {
// 		closeCamera();
// 		setUseFrontCamera(prev => !prev);
// 		openCamera();
// 	};

// 	// Хук для инициализации камеры при загрузке компонента
// 	useEffect(() => {
// 		openCamera();
// 		return () => closeCamera();
// 	}, [useFrontCamera]);

// 	return (
// 		<div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
// 			<video
// 				ref={videoRef}
// 				width='100%'
// 				height='auto'
// 				autoPlay
// 				muted
// 				playsInline
// 				style={{
// 					objectFit: 'cover',
// 					width: '100%',
// 					height: '300px',
// 					touchAction: 'none',
// 					pointerEvents: 'none', // Запрет взаимодействия с видео
// 				}}
// 			/>

// 			<div
// 				style={{
// 					position: 'absolute',
// 					top: 0,
// 					left: 0,
// 					right: 0,
// 					bottom: 0,
// 					display: 'flex',
// 					flexDirection: 'column',
// 					justifyContent: 'space-between',
// 					alignItems: 'center',
// 					padding: '10px',
// 					background: 'rgba(0, 0, 0, 0.3)',
// 				}}
// 			>
// 				<button
// 					onClick={toggleCamera}
// 					style={{
// 						backgroundColor: 'white',
// 						borderRadius: '50%',
// 						padding: '10px',
// 					}}
// 				>
// 					{useFrontCamera ? '🔄 Задняя' : '🔄 Фронтальная'}
// 				</button>
// 				<div>
// 					{!isRecording ? (
// 						<button
// 							onClick={startRecording}
// 							style={{
// 								backgroundColor: 'red',
// 								color: 'white',
// 								padding: '10px 20px',
// 								borderRadius: '10px',
// 							}}
// 						>
// 							🎥 Запись
// 						</button>
// 					) : (
// 						<button
// 							onClick={stopRecording}
// 							style={{
// 								backgroundColor: 'red',
// 								color: 'white',
// 								padding: '10px 20px',
// 								borderRadius: '10px',
// 							}}
// 						>
// 							⏹ Остановить
// 						</button>
// 					)}
// 					<button
// 						onClick={capturePhoto}
// 						style={{
// 							backgroundColor: 'green',
// 							color: 'white',
// 							padding: '10px 20px',
// 							marginLeft: '10px',
// 							borderRadius: '10px',
// 						}}
// 					>
// 						📸 Фото
// 					</button>
// 				</div>
// 				<button
// 					onClick={closeCamera}
// 					style={{ backgroundColor: 'gray', padding: '10px 20px' }}
// 				>
// 					🚫 Закрыть камеру
// 				</button>
// 			</div>

// 			{capturedPhoto && (
// 				<div>
// 					<h3>Фото:</h3>
// 					<img src={capturedPhoto} alt='Captured' style={{ width: '100%' }} />
// 				</div>
// 			)}

// 			{capturedVideo && (
// 				<div>
// 					<h3>Видео:</h3>
// 					<video src={capturedVideo} controls style={{ width: '100%' }}></video>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default Video;

const Video = () => {
	const videoRef = useRef(null);
	const mediaRecorderRef = useRef(null);
	const [isRecording, setIsRecording] = useState(false);
	const [recordedChunks, setRecordedChunks] = useState([]);
	const streamRef = useRef(null);
	const [capturedPhoto, setCapturedPhoto] = useState(null);
	const [capturedVideo, setCapturedVideo] = useState(null); // Для сохранения видео
	const [useFrontCamera, setUseFrontCamera] = useState(true);
	const [cameraActive, setCameraActive] = useState(false); // Флаг активности камеры

	// Открыть камеру
	const openCamera = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: {
					facingMode: useFrontCamera ? 'user' : 'environment',
				},
			});
			streamRef.current = stream;

			// Проверяем, что videoRef.current существует
			if (videoRef.current) {
				videoRef.current.srcObject = stream;
				videoRef.current.play();

				// Удаляем возможность открыть видео в полный экран
				videoRef.current.addEventListener('click', event =>
					event.preventDefault()
				);
				videoRef.current.webkitPlaysInline = true;
				videoRef.current.playsInline = true;
			} else {
				console.error('Video element is not available');
			}

			mediaRecorderRef.current = new MediaRecorder(stream, {
				mimeType: 'video/webm;codecs=vp8',
			});

			mediaRecorderRef.current.ondataavailable = event => {
				if (event.data.size > 0) {
					setRecordedChunks(prev => [...prev, event.data]);
				}
			};

			setCameraActive(true); // Камера активна
		} catch (err) {
			console.error('Ошибка доступа к камере:', err);
		}
	};

	// Закрыть камеру
	const closeCamera = () => {
		if (streamRef.current) {
			streamRef.current.getTracks().forEach(track => track.stop());
			streamRef.current = null;
		}
		setCameraActive(false); // Камера неактивна
	};

	// Начать запись
	const startRecording = () => {
		if (
			mediaRecorderRef.current &&
			mediaRecorderRef.current.state !== 'recording'
		) {
			setRecordedChunks([]); // Очищаем перед началом записи
			mediaRecorderRef.current.start(1000); // Начинаем запись (1000ms для разделения фрагментов)
			setIsRecording(true);
		}
	};

	// Остановить запись
	const stopRecording = () => {
		if (
			mediaRecorderRef.current &&
			mediaRecorderRef.current.state === 'recording'
		) {
			mediaRecorderRef.current.stop();
			setIsRecording(false);
		}
	};

	// Сохранить и показать видео
	useEffect(() => {
		if (recordedChunks.length > 0) {
			const blob = new Blob(recordedChunks, { type: 'video/webm' });
			const url = URL.createObjectURL(blob);
			setCapturedVideo(url); // Сохраняем URL для просмотра видео
		}
	}, [recordedChunks]);

	// Сделать фото
	const capturePhoto = () => {
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');
		canvas.width = videoRef.current.videoWidth;
		canvas.height = videoRef.current.videoHeight;
		context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
		const dataUrl = canvas.toDataURL('image/png');
		setCapturedPhoto(dataUrl); // Сохраняем фото для просмотра
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
			{cameraActive ? (
				<>
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
				</>
			) : (
				<button
					onClick={openCamera}
					style={{
						padding: '10px 20px',
						backgroundColor: 'blue',
						color: 'white',
					}}
				>
					Открыть камеру
				</button>
			)}

			{capturedPhoto && (
				<div>
					<h3>Фото:</h3>
					<img src={capturedPhoto} alt='Captured' style={{ width: '100%' }} />
				</div>
			)}

			{capturedVideo && (
				<div>
					<h3>Видео:</h3>
					<video src={capturedVideo} controls style={{ width: '100%' }}></video>
				</div>
			)}
		</div>
	);
};

export default Video;
