# Gomibo-IOE
## How to run the project:

### Requirements 
You should have docker installed.

Inside the project directory
```
$ composer install
```

```
$ cp .env.example .env
```

```
$ ./vendor/bin/sail up -d  
```
```
$ ./vendor/bin/sail artisan key:generate
```

```
$ yarn  
```

```
$ yarn dev  
```

```
$ ./vendor/bin/sail artisan migrate:fresh --seed
```
The last command should run the app
