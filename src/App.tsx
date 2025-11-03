import { Activity, useEffect, useState } from "react";

export default function App() {
	const [localError, setLocalError] = useState<null | string>(null);
	const [position, setPosition] = useState<null | GeolocationPosition>(null);

	useEffect(() => {
		if (!navigator.geolocation) {
			setLocalError("Geolocalização não é suportada pelo navegador.");
			return;
		}

		const watcher = navigator.geolocation.watchPosition(
			(position) => setPosition(position),
			(error) => setLocalError(error.message),
			{ enableHighAccuracy: true },
		);

		return () => navigator.geolocation.clearWatch(watcher);
	}, []);

	return (
		<main className="min-h-dvh min-w-dvw container p-8 flex flex-col">
			<Activity mode={localError === null ? "hidden" : "visible"}>
				<div className="w-full bg-rose-400 border-rose-800 border-2 rounded shadow-2xl shadow-rose-500 text-rose-50 min-h-32 h-fit p-4 text-pretty">
					{localError}
				</div>
			</Activity>

			<pre>
				<code>{JSON.stringify(position, null, 2)}</code>
			</pre>
		</main>
	);
}
