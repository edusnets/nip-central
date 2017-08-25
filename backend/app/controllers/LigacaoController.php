<?php

$app->post('/ligacao', $JWTMiddleware, \CorsSlim\CorsSlim::routeMiddleware(), function() use ($app) {
	$user 	= Helpers::user();

	$body 	= $app->request->getBody();
	$data 	= json_decode($body, false);

	$date_start		= isset($data->date_start) ? $data->date_start : NULL;
	$date_end		= isset($data->date_end) ? $data->date_end : NULL;

	$selectFields = [
		'id as id',
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
		'linkedid as ligacao_id',
		'motivofalha as motivo_falha'
	];

	$ligacoes 		= Ligacao::select($selectFields);

	if(!empty($date_start) and !empty($date_end)){
		$ligacoes = $ligacoes->whereBetween('calldate', [substr($date_start, 0, 10) . ' 00:00:00', substr($date_end, 0, 10) . ' 23:59:59']);
	}

	if($user->admin == 0){
		$contas 		= null;
		$origemdestino 	= null;

		foreach($user->entidade as $entidade){
			if($entidade->conta == 1){
				$contas[] = $entidade->filtro;
			}

			if($entidade->origemdestino == 1){
				$origemdestino[] = $entidade->filtro;
			}
		}

		if($contas or $origemdestino){
			$ligacoes->where(function($query) use ($origemdestino, $contas){
				$returnQuery = null;

				if($origemdestino AND $contas){
					$returnQuery = $query->orWhereIn('realsrc', $origemdestino)->orWhereIn('realdst', $origemdestino)->orWhereIn('accountcode', $contas);
				}else if($origemdestino){
					$returnQuery = $query->orWhereIn('realsrc', $origemdestino)->orWhereIn('realdst', $origemdestino);
				}else if($contas){
					$returnQuery = $query->orWhereIn('accountcode', $contas);
				}

				return $returnQuery;
			});
		}else{
			return Helpers::jsonResponse(200, 'Okey', []);
		}
	}

	$ligacoes = $ligacoes->orderBy('date','desc')->get();
	$return = [];

	foreach($ligacoes as $ligacao){
		$return[] = Helpers::createLigacaoObject($ligacao);
	}

	return Helpers::jsonResponse(200, 'Okey', $return);
});

$app->get('/ligacao/:id', $JWTMiddleware, \CorsSlim\CorsSlim::routeMiddleware(), function($id) use ($app) {

	if(!$ligacao = Helpers::canUserSeeThisCall($id)){
		return Helpers::jsonResponse(401, 'Operação não permitida', ['Operação não permitida']);
	}

	$ligacao = Helpers::createLigacaoObject($ligacao);

	return Helpers::jsonResponse(200, 'Okey', $ligacao); 
});

$app->get('/ligacao/audio/:id', $JWTMiddleware, \CorsSlim\CorsSlim::routeMiddleware(), function($id) use ($app) {

	// verifico se o usuário tem permissao para ver este arquivo e pego a ligacao
	if(!$ligacao = Helpers::canUserSeeThisCall($id)){
		return Helpers::jsonResponse(401, 'Operação não permitida', ['Operação não permitida']);
	}
	// verifico se o usuário tem permissao para ver este arquivo e pego a ligacao

	$audioPath 	= BASEPATH . '/../monitor/';
	$audioFile 	= $audioPath . $ligacao->audio;
	$file 		= file_get_contents($audioFile);

	return Helpers::jsonResponse(200, 'Okey', [
		'audio' => 'data:audio/x-wav;base64,' . base64_encode($file)
	]);
});