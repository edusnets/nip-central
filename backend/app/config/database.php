<?php
// Database configuration
/*
$settings = array(
	'driver'    => 'mysql',
	'host'      => 'localhost',
	'database'  => 'slim',
	'username'  => 'root',
	'password'  => 'root',
	'charset'   => 'utf8',
	'collation' => 'utf8_unicode_ci',
	'prefix'    => ''
);

use Illuminate\Database\Capsule\Manager as Capsule;

$capsule = new Capsule;
$capsule->addConnection( $settings );
$capsule->bootEloquent();
*/

class Database{

	public static function nipdb(){
		$settings = array(
			'driver'	=> 'mysql',
			'host'		=> '192.168.64.34',
			'database'	=> 'nipdb',
			'username'	=> 'nextipweb',
			'password'	=> 'teste',
			'charset'	=> 'utf8',
			'collation' => 'utf8_unicode_ci',
			'prefix'	=> ''
		);

		return $settings;
	}

	public static function nipcdr(){
		$settings = array(
			'driver'	=> 'mysql',
			'host'		=> '192.168.64.34',
			'database'	=> 'nipcdr',
			'username'	=> 'nextipweb',
			'password'	=> 'teste',
			'charset'	=> 'utf8',
			'collation' => 'utf8_unicode_ci',
			'prefix'	=> ''
		);

		return $settings;
	}
}

		