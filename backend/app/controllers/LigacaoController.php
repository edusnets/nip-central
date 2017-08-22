<?php
use \Firebase\JWT\JWT;

$app->post('/ligacao', $JWTMiddleware, \CorsSlim\CorsSlim::routeMiddleware(), function() use ($app) {
	$token 		= $app->request->headers->get('Authorization');
	$payload 	= JWT::decode($token, ConfigJWT::key(), ConfigJWT::cypher());
	$user 		= User::where('login', '=', $payload->login)->first();

	$body = $app->request->getBody();
	$data = json_decode($body, false);

	$date_start		= isset($data->date_start) ? $data->date_start : NULL;
	$date_end		= isset($data->date_end) ? $data->date_end : NULL;

	$selectFields = [
		'calldate as date',
		'duration as duracao',
		'audio as audio',
		'billsec as faturado',
		'realsrc as origem',
		'realdst as destino',
		'realclid as caller_id',
		'disposition as status',
		'valor as valor',
		'accountcode as conta',
		'realtransf as transferido_por',
		'realtipotransf as tipo_transferencia',
		'realsentido as sentido',
		'linkedid as id',
		'motivofalha as motivo_falha'
	];

	$ligacoes 		= Ligacao::select($selectFields);

	if(!empty($date_start) and !empty($date_end)){
		$ligacoes = $ligacoes->whereBetween('calldate', [substr($date_start, 0, 10) . ' 00:00:00', substr($date_end, 0, 10) . ' 23:59:59']);
	}

	if($user->admin == 0){
		$entidades = null;
		foreach($user->entidade as $entidade){
			$entidades[] = $entidade->numero_entidade;
		}

		if($entidades){
			$ligacoes->where(function($query) use ($entidades){
				return $query->orWhereIn('realsrc', $entidades)->orWhereIn('realdst', $entidades);
			});
		}else{
			return Helpers::jsonResponse(200, 'Okey', []);
		}
	}

	$ligacoes = $ligacoes->orderBy('date','desc')->get();
	$return = [];

	foreach($ligacoes as $ligacao){
		$valor 		= 'R$ ' . money_format('%.2n', $ligacao->valor);
		$status 	= null;
		$sentido 	= null;

		switch($ligacao->status){
			case 'ANSWERED':
				$status = 'Atendida';
				break;

			case 'NO ANSWER':
				$status = 'Não atendida';
				break;
		}

		switch($ligacao->sentido){
			case 'I':
				$sentido = 'Interno';
				break;

			case 'E':
				$sentido = 'Entrante';
				break;

			case 'S':
				$sentido = 'Sainte';
				break;

			case 'F':
				$sentido = 'Forward';
				break;

		}


		/*
		Interno / Entrante / Sainte / Forwad
		*/

		$return[] = [
			'date' 					=> $ligacao->date,
			'duracao' 				=> (int) $ligacao->duracao,
			'audio' 				=> $ligacao->audio,
			'faturado' 				=> (int) $ligacao->faturado,
			'origem' 				=> $ligacao->origem,
			'destino' 				=> $ligacao->destino,
			'caller_id' 			=> $ligacao->caller_id,
			'status' 				=> $status,
			'valor' 				=> $valor,
			'conta' 				=> $ligacao->conta,
			'transferido_por' 		=> $ligacao->transferido_por,
			'tipo_transferencia' 	=> $ligacao->tipo_transferencia,
			'sentido' 				=> $sentido,
			'id' 					=> $ligacao->id,
			'motivo_falha' 			=> $ligacao->motivo_falha,
		];
	}

	return Helpers::jsonResponse(200, 'Okey', $return);
});

