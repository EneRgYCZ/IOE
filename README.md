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
$ ./vendor/bin/sail artisan migrate:fresh --seed 
```

```
$ yarn  
```

```
$ yarn dev  
```
The last command should run the app




## Coding responsibilities

- Catalin: Table component
  
- Aurelie: Navigation component
  
- Luca: Teams and Employee pages
  
- Rishab: Equipment and Logs pages

## Link with features
Features: Below, we have listed the features and BDDs that we have attempted to complete.

• Database visualisation

Relevant BDDs: Teams overview (BDD1), Employees Overview (BDD8), Equipment Overview (BDD12), Logs Overview (BDD19), Familiarity with Google Sheets (BDD28)

• Navigation and page view access

Relevant BDDs: Toggle between overviews (BDD24), Highlighting Current Page (BDD25), Fixed Menu Position (BDD26)


We still need to do:

Team Members Overview (BDD2), Sorting of Columns (BDD22) and  Keyboard Shortcuts (BDD29) for the overviews and the navigation.

All BDDs under Database Manipulation and Search.

