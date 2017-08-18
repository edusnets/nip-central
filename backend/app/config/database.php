<?php
class Database{

	public static function nipdb(){
		$settings = [
			'driver'	=> 'mysql',
			'host'		=> '192.168.64.34',
			'database'	=> 'nipdb',
			'username'	=> 'nextipweb',
			'password'	=> 'teste',
			'charset'	=> 'utf8',
			'collation' => 'utf8_unicode_ci',
			'prefix'	=> ''
		];

		return $settings;
	}

	public static function nipcdr(){
		$settings = [
			'driver'	=> 'mysql',
			'host'		=> '192.168.64.34',
			'database'	=> 'nipcdr',
			'username'	=> 'nextipweb',
			'password'	=> 'teste',
			'charset'	=> 'utf8',
			'collation' => 'utf8_unicode_ci',
			'prefix'	=> ''
		];

		return $settings;
	}
}

		