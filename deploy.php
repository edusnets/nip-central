<?php

exec("sshpass -p 'root' scp -rp /home/saul/Projects/nip-central/frontend/dist/* root@192.168.63.95:/var/www/frontend");
exec("sshpass -p 'root' scp -rp /home/saul/Projects/nip-central/backend/* root@192.168.63.95:/var/www/backend");

?>
