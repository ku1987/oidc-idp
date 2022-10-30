CREATE DATABASE oidc_database;
create user oidc_user password 'oidc_user';
grant all on database oidc_database to oidc_user;
