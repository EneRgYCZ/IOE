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
$ ./vendor/bin/sail artisan migrate:fresh --seed 
```

```
$ yarn  
```

```
$ yarn dev  
```
The last command should run the app


## Running the CI tests:
Backend-Style: 
```
./vendor/bin/pint
```
Backend-Static: 
```
./vendor/bin/phpstan
```
Frontend-Style:
```
yarn run style:test
```
Frontend-Lint:
```
yarn run lint:test
```
Frontend-Type:
```
yarn run type:test
```

## Development
[Development File](Development.md)

## Link to Features 
[Features File](Features.md)
