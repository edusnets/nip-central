<?php

/*
** Rota raiz
**
*/

$app->get('/', function() use ($app) {
	return Helpers::jsonResponse(false, 'Para acessar a API, utilize o endpoint /api/', null);
});

/*

	$app->get('/api/v1/brands', function() use ($app) {
		$results = Brands::all();
		return helpers::jsonResponse(false, 'results', $results );
	});

	$app->get('/api/v1/series', function() use ($app) {
		$results = Series::all();
		return helpers::jsonResponse(false, 'results', $results );
	});

	$app->get('/api/v1/guitars', function() use ($app) {
		$results = [];
		$description = $app->request->get('description');
		if ( $description ) {
			$results = Guitars::with('Brand')->with('Serie')->where('description','LIKE',"%{$description}%")->get();
		} else {
			$results = Guitars::with('Brand')->with('Serie')->get();
		}
		
		$message = $results->count() . ' results';
		return helpers::jsonResponse(false, $message, $results );
	});
*/