<?php
use Slim\Slim;
use \Firebase\JWT\JWT;

class Helpers {
	static function jsonResponse( $status = 200, $message = '', $data = array() ) {
		$app 		= Slim::getInstance();
		$response 	= new stdClass();
		$error 		= false;

		if($status > 300){
			$error = true;
		}

		$response->error   = $error;
		$response->message = $message;
		$response->data    = $data;

		$app->response->setStatus($status);
		$app->response()->header('Content-Type', 'application/json');
		return $app->response()->body( json_encode($response) );
	}

	static function str_random($length = 12){
		$strs = 'abcdefghijklmnopqrstuvxyzwABCDEFGHIJKLMNOPRSTUVXYZW1234567890';
		$random = null;

		for($i = 0; $i <= $length; $i++){
			$random .= $strs{rand(0, strlen($strs-1))};
		}

		return $random;
	}

	static function user(){
		$app 	 	= $app = new \Slim\Slim;
		$token 		= $app->request->headers->get('Authorization');
		$payload 	= JWT::decode($token, ConfigJWT::key(), ConfigJWT::cypher());
		$user 		= User::where('login', '=', $payload->login)->first();

		return $user;
	}
}