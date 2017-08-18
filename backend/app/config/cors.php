<?php

$corsOptions = array(
    "origin" => "*",
    "exposeHeaders" => array("X-My-Custom-Header", "X-Another-Custom-Header"),
    "maxAge" => 1728000,
    "allowCredentials" => True,
    "allowMethods" => array("POST, GET"),
    "allowHeaders" => array("X-PINGOTHER")
    );
$cors = new \CorsSlim\CorsSlim($corsOptions);

