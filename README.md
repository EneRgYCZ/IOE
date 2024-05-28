# Gomibo-IOE
## How to run the project:

### Requirements 
You should have composer and yarn installed. Docker should be installed and opened.

Inside the project directory:
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
$ ./vendor/bin/sail artisan migrate:fresh --seed 
```

```
$ yarn  
```

```
$ yarn dev  
```
The last command should run the app


## Development
[Development File](Development.md)

## Link to Features 
[Features File](Features.md)
