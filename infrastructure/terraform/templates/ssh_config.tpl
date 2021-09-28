Host bastion
   HostName ${bastion_host}
   User ${user}
   IdentityFile /Users/easternpeak/Downloads/sshKeyRyde.pem

Host 10.50.1.*
    ProxyJump bastion
    User ${user}
    IdentityFile /Users/easternpeak/Downloads/sshKeyRyde.pem