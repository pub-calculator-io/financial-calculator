'use strict'

let switchTheme = null;
let theme = 'light';
if (localStorage.getItem('theme') === 'dark' || (localStorage.getItem('theme') === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) theme = 'dark';

const colors = {
	light: {
		purple: '#A78BFA',
		yellow: '#FBBF24',
		sky: '#7DD3FC',
		blue: '#1D4ED8',
		textColor: '#6B7280',
		yellowGradientStart: 'rgba(250, 219, 139, 0.33)',
		purpleGradientStart: 'rgba(104, 56, 248, 0.16)',
		skyGradientStart: 'rgba(56, 187, 248, 0.16)',
		tealGradientStart: 'rgba(56, 248, 222, 0.16)',
		yellowGradientStop: 'rgba(250, 219, 139, 0)',
		purpleGradientStop: 'rgba(104, 56, 248, 0)',
		gridColor: '#DBEAFE',
		tooltipBackground: '#fff',
		fractionColor: '#EDE9FE',
	},
	dark: {
		purple: '#7C3AED',
		yellow: '#D97706',
		sky: '#0284C7',
		blue: '#101E47',
		textColor: '#fff',
		yellowGradientStart: 'rgba(146, 123, 67, 0.23)',
		purpleGradientStart: 'rgba(78, 55, 144, 0.11)',
		skyGradientStart: 'rgba(56, 187, 248, 0.16)',
		tealGradientStart: 'rgba(56, 248, 222, 0.16)',
		yellowGradientStop: 'rgba(250, 219, 139, 0)',
		purpleGradientStop: 'rgba(104, 56, 248, 0)',
		gridColor: '#162B64',
		tooltipBackground: '#1C3782',
		fractionColor: '#41467D',
	},
};

let ctx = document.getElementById('chartFinancial').getContext('2d');

let yellowGradient = ctx.createLinearGradient(0, 0, 0, 1024);
yellowGradient.addColorStop(0, colors[theme].yellowGradientStart);
yellowGradient.addColorStop(1, colors[theme].yellowGradientStop);

let purpleGradient = ctx.createLinearGradient(0, 0, 0, 1024);
purpleGradient.addColorStop(0, colors[theme].purpleGradientStart);
purpleGradient.addColorStop(1, colors[theme].purpleGradientStop);

let skyGradient = ctx.createLinearGradient(0, 0, 0, 1024);
skyGradient.addColorStop(0, colors[theme].skyGradientStart);
skyGradient.addColorStop(1, colors[theme].purpleGradientStop);

let tealGradient = ctx.createLinearGradient(0, 0, 0, 1024);
tealGradient.addColorStop(0, colors[theme].tealGradientStart);
tealGradient.addColorStop(1, colors[theme].purpleGradientStop);

let tooltip = {
	enabled: false,
	external: function (context) {
		let tooltipEl = document.getElementById('chartjs-tooltip');

		// Create element on first render
		if (!tooltipEl) {
			tooltipEl = document.createElement('div');
			tooltipEl.id = 'chartjs-tooltip';
			tooltipEl.innerHTML = '<table></table>';
			document.body.appendChild(tooltipEl);
		}

		// Hide if no tooltip
		const tooltipModel = context.tooltip;
		if (tooltipModel.opacity === 0) {
			tooltipEl.style.opacity = 0;
			return;
		}

		// Set caret Position
		tooltipEl.classList.remove('above', 'below', 'no-transform');
		if (tooltipModel.yAlign) {
			tooltipEl.classList.add(tooltipModel.yAlign);
		} else {
			tooltipEl.classList.add('no-transform');
		}

		function getBody(bodyItem) {
			return bodyItem.lines;
		}

		if (tooltipModel.body) {
			const bodyLines = tooltipModel.body.map(getBody);

			let innerHtml = '<tbody>';

			bodyLines.forEach(function (body, i) {
				innerHtml += '<tr><td class="loan-chart__text">' + body + '</td></tr>';
			});
			innerHtml += '</tbody>';

			let tableRoot = tooltipEl.querySelector('table');
			tableRoot.innerHTML = innerHtml;
		}

		const position = context.chart.canvas.getBoundingClientRect();

		// Display, position, and set styles for font
		tooltipEl.style.opacity = 1;
		tooltipEl.style.position = 'absolute';
		tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX - tooltipEl.clientWidth / 2 + 'px';
		tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY - tooltipEl.clientHeight / 2 + 'px';
		// tooltipEl.style.font = bodyFont.string;
		tooltipEl.classList.add('loan-chart');
	},
};

const dataCharts = {
	labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
	datasets: [
		{
			data: [
				20000,
				21500,
				23225,
				25208.75,
				27490.06,
				30113.57,
				33130.61,
				36600.2,
				40590.23,
				45178.76,
				50455.58,
				56523.91,
				63502.5,
				71527.88,
				80757.06
			],
			type: 'line',
			order: 1,
			label: 'PV',
			pointHoverBackgroundColor: '#FFFFFF',
			pointHoverBorderWidth: 2,
			pointHoverRadius: 6,
			pointHoverBorderColor: '#5045E5',
			borderColor: colors[theme].yellow,
			backgroundColor: yellowGradient,
			fill: true,
		},
		{
			label: 'PMT',
			data: [
				-1500,
				-3000,
				-4500,
				-6000,
				-7500,
				-9000,
				-10500,
				-12000,
				-13500,
				-15000,
				-16500,
				-18000,
				-19500,
				-21000,
				-22500
			],
			type: 'line',
			order: 1,
			pointHoverBackgroundColor: '#FFFFFF',
			pointHoverBorderWidth: 2,
			pointHoverRadius: 6,
			pointHoverBorderColor: '#5045E5',
			borderColor: colors[theme].purple,
			backgroundColor: purpleGradient,
			fill: true,
		},
		{
			data: [
				3000,
				6225,
				9708.75,
				13490.06,
				17613.57,
				22130.61,
				27100.2,
				32590.23,
				38678.76,
				45455.58,
				53023.91,
				61502.5,
				71027.88,
				81757.06,
				93870.62
			],
			type: 'line',
			order: 1,
			label: 'Interest',
			pointHoverBackgroundColor: '#FFFFFF',
			pointHoverBorderWidth: 2,
			pointHoverRadius: 6,
			pointHoverBorderColor: '#5045E5',
			borderColor: '#38BDF8',
			backgroundColor: skyGradient,
			fill: true,
		},
		{
			label: 'FV',
			data: [
				-21500,
				-23225,
				-25208.75,
				-27490.06,
				-30113.57,
				-33130.61,
				-36600.2,
				-40590.23,
				-45178.76,
				-50455.58,
				-56523.91,
				-63502.5,
				-71527.88,
				-80757.06,
				-91370.62
			],
			type: 'line',
			order: 1,
			pointHoverBackgroundColor: '#FFFFFF',
			pointHoverBorderWidth: 2,
			pointHoverRadius: 6,
			pointHoverBorderColor: '#5045E5',
			borderColor: '#2DD4BF',
			backgroundColor: tealGradient,
			fill: true,
		},
	],
};

let chartFinancial = new Chart(document.getElementById('chartFinancial'), {
	data: dataCharts,
	options: {
		stepSize: 100,
		response: true,
		elements: {
			point: {
				radius: 0,
			},
		},
		plugins: {
			legend: {
				display: false,
			},
			tooltip: tooltip,
		},
		interaction: {
			mode: 'index',
			intersect: false,
		},
		scales: {
			y: {
				grid: {
					tickLength: 0,
					color: colors[theme].gridColor,
				},
				ticks: {
					display: false,
					stepSize: 1000,
				},
				border: {
					color: colors[theme].gridColor,
				},
			},
			x: {
				border: {
					color: colors[theme].gridColor,
				},
				ticks: {
					display: false,
					color: colors[theme].gridColor,
					stepSize: 100,
				},
				grid: {
					tickLength: 0,
					color: colors[theme].gridColor,
				},
			},
		},
	},
});

switchTheme = function(theme) {
	yellowGradient.addColorStop(0, colors[theme].yellowGradientStart);
	yellowGradient.addColorStop(1, colors[theme].yellowGradientStop);
	purpleGradient.addColorStop(0, colors[theme].purpleGradientStart);
	purpleGradient.addColorStop(1, colors[theme].purpleGradientStop);
	skyGradient.addColorStop(0, colors[theme].skyGradientStart);
	skyGradient.addColorStop(1, colors[theme].purpleGradientStop);
	tealGradient.addColorStop(0, colors[theme].tealGradientStart);
	tealGradient.addColorStop(1, colors[theme].purpleGradientStop);
	chartFinancial.data.datasets[0].borderColor = colors[theme].yellow;
	chartFinancial.data.datasets[1].borderColor = colors[theme].purple;
	chartFinancial.data.datasets[0].backgroundColor = yellowGradient;
	chartFinancial.data.datasets[1].backgroundColor = purpleGradient;
	chartFinancial.data.datasets[2].backgroundColor = skyGradient;
	chartFinancial.data.datasets[3].backgroundColor = tealGradient;
	chartFinancial.options.scales.y.grid.color = colors[theme].gridColor;
	chartFinancial.options.scales.x.grid.color = colors[theme].gridColor;
	chartFinancial.options.scales.y.ticks.color = colors[theme].gridColor;
	chartFinancial.options.scales.y.ticks.stepSize = 1000;
	chartFinancial.options.scales.x.ticks.color = colors[theme].gridColor;
	chartFinancial.options.scales.x.ticks.stepSize = 2;
	chartFinancial.options.scales.y.border.color = colors[theme].gridColor;
	chartFinancial.options.scales.x.border.color = colors[theme].gridColor;
	chartFinancial.update()
}

window.changeChartData = function(values) {
	chartFinancial.data.datasets[0].data = values[0]
	chartFinancial.data.datasets[1].data = values[1]
	chartFinancial.data.datasets[2].data = values[2]
	chartFinancial.data.datasets[3].data = values[3]
	chartFinancial.data.labels = values[4]
	chartFinancial.update()
}
