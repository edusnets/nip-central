<?php

$corsOptions = [
	"origin" => "*",
	"exposeHeaders" => ["X-My-Custom-Header", "X-Another-Custom-Header"],
	"maxAge" => 1728000,
	"allowCredentials" => True,
	"allowMethods" => ["POST, GET"],
	"allowHeaders" => ["X-PINGOTHER"]
];

$cors = new \CorsSlim\CorsSlim($corsOptions);

