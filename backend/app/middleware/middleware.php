<?php

use \Firebase\JWT\JWT;

$JWTMiddleware = function() use ($app){
	$token 		= $app->request->headers->get('Authorization');

	try{
		$decoded 	= JWT::decode($token, ConfigJWT::key(), ConfigJWT::cypher());
	}catch(Exception $e){
  		header("WWW-Authenticate: Basic realm=\"Secure Page\"");
 		header("HTTP\ 1.0 401 Unauthorized");
		header('Content-Type: application/json');
	    echo Helpers::jsonResponse(401, 'Acesso não autorizado', ['O Token enviado não está autorizado. Efetue o login novamente.']);
	    die();
	}
};
