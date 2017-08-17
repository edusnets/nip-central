<?php
use \Firebase\JWT\JWT;

$app->get('/api/ligacao', $JWTMiddleware, function() use ($app) {
	$ligacoes 	= Ligacao::all();
	$return 	= [];

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

