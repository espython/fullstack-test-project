

function Alert({text}: {text: string}) {
	return (
		<div className="w-full bg-red-100 border-l-4 border-red-500  px-4 py-2" role="alert">
		<p className="font-bold text-red-700">Error</p>
		<p className="text-red-700 text-sm">{text}.</p>
	</div>
	)
}

export default Alert