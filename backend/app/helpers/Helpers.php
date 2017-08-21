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

	static function str_random($length = 12){
		$strs = 'abcdefghijklmnopqrstuvxyzwABCDEFGHIJKLMNOPRSTUVXYZW1234567890';
		$random = null;

		for($i = 0; $i <= $length; $i++){
			$random .= $strs{rand(0, strlen($strs-1))};
		}

		return $random;
	}
}