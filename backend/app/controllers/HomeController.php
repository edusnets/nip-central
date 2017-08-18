<?php

/*
** Rota raiz
**
*/

$app->get('/', function() use ($app) {
	return Helpers::jsonResponse(false, 'Para acessar a API, utilize o endpoint /api/', null);
});
