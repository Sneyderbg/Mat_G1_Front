export function MatriculaInfo(props) {

	return (
		<div className="flex-box">
			<div className="flex-box--horizontal">
				<div className="dato">
					<label>Tiempo restante: </label>
					<label className="important-label">
						{`${("0" + props.timeLeft.getMinutes()).slice(-2)}:${(
							"0" + props.timeLeft.getSeconds()
						).slice(-2)}`}
					</label>
				</div>
			</div>
		</div>
	);
}
