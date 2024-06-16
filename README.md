# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

Notice that you need .env file in root with REACT_APP_API_URL pointing to your backend url

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Дополнительно

Сверху - описание запуска Create React App по умолчанию. Кроме этого для запуска фронтенд - части требуется создать `.env` в корне проекта с параметром `REACT_APP_API_URL` и значением, предоставленным бэкендом.

Пример: `REACT_APP_API_URL = http://127.0.0.1:8080`

### Что требуется знать еще

- Эндпоинты и их типы генерируются скриптом `api-gen` с помощью библиотеки `swagger-typescript-api`. 

- Верстка страниц курса основывается на определенном формате строк, который приходит с бэкенда, парсится и обрабатывается библиотекой `markdown-to-jsx`. 

- Для установки и запуска бэкенда локально необходим Docker 

- Используется `material-ui` в качестве ui-kit библиотеки. Изначально использовались css-модули, которые не так удобны в использовании с `material-ui`, возможно стоит отказаться от них и перейти на `styled-components`.


