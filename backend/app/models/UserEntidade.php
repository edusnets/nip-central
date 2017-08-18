<?php
use Illuminate\Database\Capsule\Manager as Capsule;

class UserEntidade extends Illuminate\Database\Eloquent\Model
{
	public function __construct(){
		$capsule = new Capsule;
		$capsule->addConnection(Database::nipdb());
		$capsule->bootEloquent();
	}

	protected $table = 'n_usuario_entidade_view';
}
