<?php
use Slim\Slim;

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
}