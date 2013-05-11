var express = require('express');
var async   = require('async');
var youtube = require('youtube-feeds');

// The youtube links of the videos.
var videos  = [
	['P4lwr-zMSnM', 'Latvia'          ], // PeR - Here We Go
	['xi8mZ2ejLcE', 'San Marino'      ], // Valentina Monetta - Crisalide
	['-LwGGo5ZfF8', 'F.Y.R. Macedonia'], // Esma & Lozano - Pred Da Se Razdeni
	['r5egVzkZGTg', 'Azerbaijan'      ], // Farid Mammadov - Hold Me
	['FdU02F9lT2g', 'Finland'         ], // Krista Siegfrids - Marry Me
	['8WmJXIR9xtw', 'Malta'           ], // Gianluca Bezzina - Tomorrow
	['bExp3aNOFsE', 'Bulgaria'        ], // Elitsa & Stoyan - Samo Shampioni
	['PtunhyMW1hM', 'Iceland'         ], // Eyþór Ingi Gunnlaugsson - Ég á Líf
	['G3k2MOJOkKg', 'Greece'          ], // Koza Mostra & Agathon Iakovidis - Alcohol Is Free
	['rYuSe5h-rrg', 'Israel'          ], // Moran Mazor - Rak bishvilo
	['JSs03Sp-4ME', 'Armenia'         ], // Dorians - Lonely Planet
	['UmjsIhihJMY', 'Hungary'         ], // ByeAlex - Kedvesem (Zoohacker Remix)
	['gjm-kCOMaPY', 'Norway'          ], // Margaret Berger - I Feed You My Love
	['_Pf-ZCI-UuA', 'Albania'         ], // Adrian Lulgjuraj & Bledar Sejko - Identitet
	['CvdcRmzuXKM', 'Georgia'         ], // Nodi Tatishvili & Sophie Gelovani - Waterfall
	['fBGpqq2LFSQ', 'Switzerland'     ], // Takasa - You And Me
	['8pNEEb6dzi8', 'Romania'         ], // Cesar - It's My Life
	['1RPLzJ5hqYc', 'Austria'         ], // Natália Kelly - Shine
	['02uHFbCN2JI', 'Estonia'         ], // Birgit Õigemeel - Et Uus Saaks Alguse
	['SqL0SP3zARg', 'Slovenia'        ], // Hannah - Straight Into Love
	['qdESBf3UFQI', 'Croatia'         ], // Klapa s Mora - Mižerja
	['k59E7T0H-Us', 'Denmark'         ], // Emmelie De Forest - Only Teardrops
	['1VwzdeRNjtA', 'Russia'          ], // Dina Garipova - What If
	['-onH40yB2uk', 'Ukraine'         ], // Zlata Ognevich - Gravity
	['1vtOwHHDAFc', 'The Netherlands' ], // Anouk - Birds
	['8BmHI_57vJk', 'Montenegro'      ], // Who See - Igranka
	['MCZ6RRwKcIE', 'Lithuania'       ], // Andrius Pojavis - Something
	['N4S4m9R-ffA', 'Belarus'         ], // Alyona Lanskaya - Solayoh
	['nkbEkuk2TKM', 'Moldova'         ], // Aliona Moon - O Mie
	['iGaZKoim43U', 'Ireland'         ], // Ryan Dolan - Only Love Survives
	['OEd1TsVBo9U', 'Cyprus'          ], // Despina Olympiou - An Me Thimáse
	['C9uExokZcIM', 'Belgium'         ], // Roberto Bellarosa - Love Kills
	['LW7TAdytfww', 'Serbia'          ], // Moje 3 - Ljubav je svuda
	['YQJaab8j4fU', 'France'          ], // Amandine Bourgeois - L'Enfer Et Moi
	['s8LPaowU9js', 'Germany'         ], // Cascada - Glorious
	['X2C-ePvHfAs', 'Italy'           ], // Marco Mengoni - L'Essenziale
	['Q5m8aCZSvws', 'Spain'           ], // ESDM - Contigo Hasta El Final (With You Until The End)
	['jBUJ0u7ZVaE', 'Sweden'          ], // Robin Stjernberg - You
	['HALTU11QE6g', 'United Kingdom'  ], // Bonnie Tyler - Believe In Me
];

// Express app.
var app     = express();

app.use(express.compress());
app.use(express.static(__dirname + '/static', {maxAge: 2592000000}));

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/views/index.html');
});

app.get('/video', function(req, res) {
	var data = [];

	async.each(videos, function(video, cb) {
		youtube.video(video[0]).details(function(err, details) {
	     	if (!err) {
				data.push({
					'title'  : details.title,
					'country': video[1],
					'views'  : details.viewCount
				});

				// Callback to let async know that it should proceed.
				cb();
			}
		});
	}, function(err) {
		res.send(data);
	});
});

var port = process.env.PORT || 8080;
app.listen(port, function () {
	console.log('Listening on port %d', port);
});
