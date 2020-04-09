import { useRef, useEffect } from 'react';

export default function() {
	return {
		useAnimation(cb, fps, isPlaying) {
			const cbRef = useRef();
			const animationFrameId = useRef();
			const then = useRef(window.performance.now());
			const now = useRef();
			const elapsed = useRef();
			const fpsInterval = useRef(1000 / fps);
			useEffect(
				() => {
					cbRef.current = cb;
				},
				[ cb ]
			);
			useEffect(
				() => {
					function loop() {
						animationFrameId.current = window.requestAnimationFrame(loop);
						now.current = window.performance.now();
						elapsed.current = now.current - then.current;
						if (elapsed.current > fpsInterval.current) {
							then.current = now.current - elapsed.current % fpsInterval.current;
							cbRef.current();
						}
					}
					if (isPlaying) {
						animationFrameId.current = window.requestAnimationFrame(loop);
						return () => {
							window.cancelAnimationFrame(animationFrameId.current);
						};
					}
				},
				[ isPlaying ]
			);
		}
	};
}
