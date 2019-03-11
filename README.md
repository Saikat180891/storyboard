# Storyboard Frontend

## Getting Started

Run the following commands to get started:

```
npm install
npm build
npm start
```

This will start the Angular development server. By default, the Angular development server runs at `http://localhost:4200/`. If you want to run the whole Storyboard application locally, you'll need to also follow instructions for running the backend locally.

## Code formatting and linting

We use [TSLint](https://palantir.github.io/tslint/) to perform code linting. This is the default linter initialized when generating an Angular project. To lint the entire project, run `npm run lint`.

This only fixes a subset of linting issues, since there are some linting issues caught by TSlint that either can't be automatically fixed (for example, cyclomatic complexity) or have the potential to introduce behavior changes (for example, turning == into ===).

We use [Prettier](https://prettier.io/) to perform code formatting. There's a pre-commit hook that enforces this.
You can run `npm run format:check` to check formatting of the entire repository.
You can also run `npm run format:fix` to fix the format of staged files, though the pre-commit hook does this automatically for you.

## Auto-generated Angular Documentation

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.

#### Development server

Run `npm start` for a dev server (Triggers `ng serve` with proxy configurations). Navigate to `http://localhost:4200/`.
The app will automatically reload if you change any of the source files.

#### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

#### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

#### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

#### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
