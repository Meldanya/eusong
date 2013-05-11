(function($) {
var spinner_settings = {
	lines     : 13,
	length    : 20,
	width     : 5,
	radius    : 30,
	corners   : 1,
	rotate    : 0,
	direction : 1,
	color     : '#000',
	speed     : 1.5,
	trail     : 100,
};

var spinner = new Spinner(spinner_settings);

var plot_settings = {
	series: {
		bars: {
			show       : true,
			barWidth   : 0.8,
			horizontal : true,
			align      : 'center',
		}
	},
	yaxis: {
		mode       : 'categories',
		tickLength : 0,
	},
	sorted: true
};

function pre_plot(xhr) {
	// Get target for spinner ...
	var target = document.getElementById('placeholder');
	// ... aaaand spin it!
	spinner.spin(target);
}

function plot(data) {
	spinner.stop();

	// Reformat the data
	var d = [];
	for (var i = 0; i < data.length; ++i) {
		var c = data[i].country;
		var v = data[i].views;
		d.push([v, c]);
	}

	// Plot the data
	$.plot('#placeholder', [d], plot_settings);
}

$.ajax({
	url: '/video',
	beforeSend: pre_plot,
	success: plot,
	dataType: 'json'
});
})($);