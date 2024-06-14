export const calc = () => {
	const btnWrapper = document.querySelector('.calc__btn-wrapper');
	const x = document.querySelector('#x');
	const y = document.querySelector('#y');

	function calc(event) {
		const operation = event.target.closest('.calc__btn').textContent;

		switch (operation) {
			case "+":
				calcAddition(x.value, y.value);
				break;
			case "-":
				calcSubtraction(x.value, y.value);
				break;
			case "х":
				calcMultiplication(x.value, y.value);
				break;
			case "÷":
				calcDivision(x.value, y.value);
				break;
			default:
				break;
		}
	}

	function calcAddition(x, y) {
		const result = +x + +y;
		const output = document.querySelector('.calc__result');
		output.textContent = result;
	}
	function calcSubtraction(x, y) {
		const result = +x - +y;
		const output = document.querySelector('.calc__result');
		output.textContent = result;
	}
	function calcMultiplication(x, y) {
		const result = +x * +y;
		const output = document.querySelector('.calc__result');
		output.textContent = result;
	}
	function calcDivision(x, y) {
		let result = +x / +y;
		result = result.toFixed(2);
		const output = document.querySelector('.calc__result');
		output.textContent = result;
	}


	btnWrapper.addEventListener('click', calc);
}