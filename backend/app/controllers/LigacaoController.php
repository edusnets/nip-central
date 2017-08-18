<?php
use \Firebase\JWT\JWT;

$app->post('/ligacao', $JWTMiddleware, \CorsSlim\CorsSlim::routeMiddleware(), function() use ($app) {
	$token 		= $app->request->headers->get('Authorization');
	$payload 	= JWT::decode($token, ConfigJWT::key(), ConfigJWT::cypher());
	$user 		= User::where('login', '=', $payload->login)->first();

	$range 			= $app->request->post('range');

	$date_start		= isset($range['date_start']) ? $range['date_start'] : NULL;
	$date_end		= isset($range['date_end']) ? $range['date_end'] : NULL;

	$ligacoes 		= Ligacao::select([
		'calldate as date',
		'duration as duracao',
		'audio as audio',
		'billsec as faturado',
		'realsrc as origem',
		'realdst as destino',
		'realclid as caller_id',
		'billsec as faturado',
		'disposition as status',
		'valor as valor',
		'accountcode as conta',
		'realtransf as transferido_por',
		'realtipotransf as tipo_transferencia',
		'realsentido as sentido',
		'linkedid as id',
		'motivofalha as motivo_falha'
	]);

	if($user->admin == 0){
		$entidades = null;
		foreach($user->entidade as $entidade){
			$entidades[] = $entidade->numero_entidade;
		}

		$ligacoes->orWhereIn('src', $entidades)->orWhereIn('dst', $entidades);
	}

	if(!empty($date_start) and !empty($date_end)){
		$ligacoes = $ligacoes->whereBetween('calldate', [$date_start . ' 00:00:00', $date_end . ' 23:59:59']);
	}

	$ligacoes 		= $ligacoes->get();
	$return 		= [];

	return Helpers::jsonResponse(200, 'Okey', $ligacoes->toArray());
});

