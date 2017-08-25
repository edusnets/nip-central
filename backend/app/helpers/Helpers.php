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

	static function canUserSeeThisCall($ligacao_id){
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

		$ligacao = Ligacao::select($selectFields)->where('id', '=', $ligacao_id);
		
		$user = Helpers::user();

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
				$ligacao->where(function($query) use ($origemdestino, $contas){
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

		$ligacao = $ligacao->first();

		if(empty($ligacao)){
			return false;
		}

		return $ligacao;



	}

	static function createLigacaoObject($ligacao){
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

		$return = [
			'id' 					=> $ligacao->id,
			'date' 					=> $ligacao->date,
			'duracao' 				=> (int) $ligacao->duracao,
			'audio' 				=> $ligacao->audio,
			'faturado' 				=> (int) $ligacao->faturado,
			'origem' 				=> $ligacao->origem,
			'destino' 				=> $ligacao->destino,
			'caller_id' 			=> $ligacao->caller_id,
			'status' 				=> $ligacao->status,
			'valor' 				=> $valor,
			'conta' 				=> $ligacao->conta,
			'transferido_por' 		=> $ligacao->transferido_por,
			'tipo_transferencia' 	=> $ligacao->tipo_transferencia,
			'sentido' 				=> $sentido,
			'ligacao_id' 			=> $ligacao->ligacao_id,
			'motivo_falha' 			=> $ligacao->motivo_falha,
		];

		return $return;
	}
}