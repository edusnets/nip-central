<?php
use Illuminate\Database\Capsule\Manager as Capsule;

class User extends Illuminate\Database\Eloquent\Model
{
	public function __construct(){
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

		$capsule = new Capsule;
		$capsule->addConnection( $settings );
		$capsule->bootEloquent();

		/*
		Fields:
		`id` int(11) NOT NULL AUTO_INCREMENT,
		`login` varchar(128) NOT NULL,
		`admin` int(1) NOT NULL DEFAULT '0',
		`nome` varchar(128) NOT NULL,
		`senha` varchar(128) NOT NULL,
		`id_entidade` int(11) NOT NULL DEFAULT '0',
		`acp` int(11) NOT NULL DEFAULT '0',
		*/
	}

	protected $table = 'n_usuario_view';
}
