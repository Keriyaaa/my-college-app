# MyCollegeApp

Это новый проект на **React Native**, созданный с помощью [`@react-native-community/cli`](https://github.com/react-native-community/cli).

## Начало работы

Важно: Убедитесь, что вы выполнили все шаги из руководства [Настройка окружения](https://reactnative.dev/docs/set-up-your-environment), прежде чем продолжить.

## Шаг 1: Запуск Metro

Сначала необходимо запустить **Metro** — инструмент сборки JavaScript для React Native.

Чтобы запустить сервер разработки Metro, выполните следующую команду из корневой папки вашего проекта:

```sh
# Используя npm
npm start

# Или используя Yarn
yarn start
```

## Шаг 2: Сборка и запуск приложения

Когда Metro запущен, откройте новое окно терминала из корневой папки проекта и выполните одну из команд ниже, чтобы собрать и запустить приложение на Android или iOS.

### Android

```sh
# Используя npm
npm run android

# Или используя Yarn
yarn android
```

### iOS

Для iOS не забудьте установить зависимости CocoaPods (это нужно сделать только при первом клонировании или после обновления нативных зависимостей).

При первом создании нового проекта выполните установку самого CocoaPods через Ruby bundler:

```sh
bundle install
```

Затем, а также каждый раз после обновления нативных зависимостей, выполните:

```sh
bundle exec pod install
```

Подробнее читайте в руководстве [CocoaPods Getting Started](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Используя npm
npm run ios

# Или используя Yarn
yarn ios
```

Если всё настроено правильно, вы увидите новое приложение, запущенное в эмуляторе Android, симуляторе iOS или на подключённом физическом устройстве.

Это один из способов запуска приложения. Вы также можете собрать его напрямую через Android Studio или Xcode.

## Шаг 3: Внесение изменений в приложение

Теперь, когда вы успешно запустили приложение, давайте внесём изменения.

Откройте файл `App.tsx` в любом текстовом редакторе и внесите правки. После сохранения приложение автоматически обновится и отобразит изменения — это работает благодаря механизму [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

Если вам нужно принудительно перезагрузить приложение, например, чтобы сбросить состояние, выполните полную перезагрузку:

- **Android**: Нажмите клавишу R дважды или выберите **"Reload"** в **Dev Menu**, которое вызывается сочетанием Ctrl + M (Windows/Linux) или Cmd + M (macOS).
- **iOS**: Нажмите R в симуляторе iOS.

## Поздравляем

Вы успешно запустили и изменили своё React Native приложение.

### Что дальше

- Если вы хотите добавить этот код React Native в существующее приложение, ознакомьтесь с [руководством по интеграции](https://reactnative.dev/docs/integration-with-existing-apps).
- Если вы хотите узнать больше о React Native, изучите [документацию](https://reactnative.dev/docs/getting-started).

## Устранение неполадок

Если у вас возникли проблемы с выполнением шагов выше, обратитесь к странице [Устранение неполадок](https://reactnative.dev/docs/troubleshooting).

## Дополнительные ресурсы

Чтобы узнать больше о React Native, посмотрите следующие ресурсы:

- [Веб-сайт React Native](https://reactnative.dev) — основная информация о React Native.
- [Начало работы](https://reactnative.dev/docs/environment-setup) — обзор React Native и настройка окружения.
- [Изучение основ](https://reactnative.dev/docs/getting-started) — экскурсия по основам React Native.
- [Блог](https://reactnative.dev/blog) — последние официальные новости React Native.
- [`@facebook/react-native`](https://github.com/facebook/react-native) — открытый репозиторий React Native на GitHub.
