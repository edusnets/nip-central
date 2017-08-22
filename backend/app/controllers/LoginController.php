<?php

use \Firebase\JWT\JWT;

$app->post('/login', function() use ($app) {
	$body = $app->request->getBody();
	$data = json_decode($body, false);

	$username = $data->username;
	$password = $data->password;

	if(!$username OR !$password){
		return Helpers::jsonResponse(401, 'Ocorreram erros de validação', ['O usuário e a senha são obrigatorios']);
	}

	$user = User::where('login', '=', $username)->where('senha', '=', hash('SHA256', $password))->first();

	if(empty($user)){
		return Helpers::jsonResponse(401, 'Ocorreram erros de validação', ['Usuário ou senha inválidos']);
	}

	$payload = [
		'id' 		=> $user->id,
		'login' 	=> $user->login,
		'nome'		=> $user->nome,
		'iat'		=> time(),
		'jti'		=> Helpers::str_random(28)
	];

	$token 		= JWT::encode($payload, ConfigJWT::key());

	return Helpers::jsonResponse(200, 'Login efetuado com sucesso', [
		'token' => $token
	]);
});