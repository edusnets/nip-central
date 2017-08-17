<?php

use \Firebase\JWT\JWT;

$app->post('/api/login', function() use ($app) {
	$username = $app->request->post('username');
	$password = $app->request->post('password');

	if(!$username OR !$password){
		return Helpers::jsonResponse(401, 'Ocorreram erros de validação', ['O usuário e a senha são obrigatorios']);
	}

	$user = User::where('login', '=', $username)->where('senha', '=', $password)->first();

	if(empty($user)){
		return Helpers::jsonResponse(401, 'Ocorreram erros de validação', ['Usuário ou senha inválidos']);
	}

	$payload = array(
		'login' 	=> $user->login,
		'nome'		=> $user->nome
	);

	$token 		= JWT::encode($payload, ConfigJWT::key());

	return Helpers::jsonResponse(200, 'Login efetuado com sucesso', [
		'token' => $token
	]);
});

