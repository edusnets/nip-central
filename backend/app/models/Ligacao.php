<?php
use Illuminate\Database\Capsule\Manager as Capsule;

class Ligacao extends Illuminate\Database\Eloquent\Model
{
	public function __construct(){
		$capsule = new Capsule;
		$capsule->addConnection(Database::nipcdr());
		$capsule->bootEloquent();
	}

	protected $table = 'a_cdr';
}
