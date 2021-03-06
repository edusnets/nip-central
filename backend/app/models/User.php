<?php
use Illuminate\Database\Capsule\Manager as Capsule;

class User extends Illuminate\Database\Eloquent\Model
{
	public function __construct(){
		$capsule = new Capsule;
		$capsule->addConnection(Database::nipdb());
		$capsule->bootEloquent();
	}

	protected $table = 'n_usuario_view';

	public function entidade(){
		return $this->hasMany('UserEntidade', 'id_usuario', 'id');
	}
}
