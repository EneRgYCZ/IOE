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
$ ./vendor/bin/sail artisan key:generate
```

```
$ ./vendor/bin/sail up -d  
```

```
$ yarn  
```

```
$ yarn dev  
```
The last command should run the app
