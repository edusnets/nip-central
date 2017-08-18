<?php
use Illuminate\Database\Capsule\Manager as Capsule;

class Ligacao extends Illuminate\Database\Eloquent\Model
{
	public function __construct(){
		$capsule = new Capsule;
		$capsule->addConnection(Database::nipcdr());
		$capsule->bootEloquent();

		/*
		Fields:
		`calldate` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
		`duration` int(11) NOT NULL DEFAULT '0',
		`billsec` int(11) NOT NULL DEFAULT '0',
		`realsrc` varchar(80) NOT NULL DEFAULT '',
		`realdst` varchar(80) NOT NULL DEFAULT '',
		`audio` varchar(255) NOT NULL DEFAULT '',
		*/
	}

	protected $table = 'a_cdr';
}
