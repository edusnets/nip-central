<?php

# === constants
define("_APP", dirname(__FILE__) . '/app');

# === slim
require 'vendor/autoload.php';

$app = new \Slim\Slim(array(
  'debug' => true
));

# === config
require_once _APP . '/config/jwt.php';
require_once _APP . '/config/database.php';

# === middleware
require_once _APP . '/middleware/middleware.php';

# === helpers
require_once _APP . '/helpers/appHelpers.php';

# === models
require_once _APP . "/models/User.php";
require_once _APP . "/models/Ligacao.php";

# === controllers
require_once _APP . "/controllers/LoginController.php";
require_once _APP . "/controllers/LigacaoController.php";

# === run slim
$app->run();