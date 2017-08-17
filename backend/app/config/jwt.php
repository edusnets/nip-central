<?php

class ConfigJWT{
	public static function key(){
		$jwtkey = 'UYziDw7ibuwArXt3uSM7cCsdbbbZPBTTclK3G8HXSnnv3UToVjkEdmLX';
		return $jwtkey;
	}

	public static function cypher(){
		return array('HS256');
	}
}
