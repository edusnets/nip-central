<?php
use \Firebase\JWT\JWT;

$app->post('/api/ligacao', $JWTMiddleware, \CorsSlim\CorsSlim::routeMiddleware(), function() use ($app) {
	$range 			= $app->request->post('range');
	$date_start		= isset($range['date_start']) ? $range['date_start'] : NULL;
	$date_end		= isset($range['date_end']) ? $range['date_end'] : NULL;

	$ligacoes 		= Ligacao::where('id', '!=', 0);

	if(!empty($date_start) and !empty($date_end)){
		$ligacoes = $ligacoes->whereBetween('calldate', [$date_start . ' 00:00:00', $date_end . ' 23:59:59']);
	}

	$ligacoes 		= $ligacoes->get();
	$return 		= [];
	
	foreach($ligacoes as $ligacao){
		/*
		Fields:
		`calldate` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
		`duration` int(11) NOT NULL DEFAULT '0',
		`billsec` int(11) NOT NULL DEFAULT '0',
		`realsrc` varchar(80) NOT NULL DEFAULT '',
		`realdst` varchar(80) NOT NULL DEFAULT '',
		`audio` varchar(255) NOT NULL DEFAULT '',
 		*/

		$return[] = [
			'date' 		=> $ligacao->calldate,
			'duracao' 	=> $ligacao->duration,
			'faturado' 	=> $ligacao->billsec,
			'origem' 	=> $ligacao->realsrc,
			'destino' 	=> $ligacao->realdst,
			'audio' 	=> $ligacao->audio
		];
	}

	print_r($ligacoes);

	return Helpers::jsonResponse(200, 'Okey', $return);
});

