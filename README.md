# Макаревич Мария, БПИ228
 Домашнее задание 6 по НИСу "Промышленная web-разработка на React"
## Запуск сервера
Для запуска сервера следует ввести в терминал команду ```npm start```.
## Использование сервера в проекте из предыдущих дз
Обновленный сайт склада, использующий данный сервер, можно найти по [ссылке](https://github.com/makar-with-tea/warehouse-v3).
## База данных
Я использовала Firebase для выполнения этого задания. Для ее настройки существует файл [firebaseConfig.ts](src/utils/firebaseConfig.ts), а также json-файл с информацией для доступа к БД. В настоящих проектах данный файл нельзя размещать в открытом доступе, но в рамках учебного проекта для облегчения проверки я оставила его в репозитории в той же папке utils. Однако опубликовать актуальное значение ключа на гитхаб нельзя, тогда он считается скомпроментированным и перестает работать. Поэтому вот значение, которое надо вставить в поле private_key_id в [файле](src/utils/serviceAccountKey.json), чтобы получить доступ к Firebase: `c1f76d15a0ac79e0fafd0c94877caaa9b9d003fa`.
## Тестирование сервера на Postman
### Авторизаация
#### Регистрация
![Screenshot 2025-03-19 211912](https://github.com/user-attachments/assets/dc1a573f-1e5a-4739-9374-05ff59a36191)

#### Вход
![Screenshot 2025-03-19 211901](https://github.com/user-attachments/assets/cf83ab73-6e4d-47af-a2a8-a8fea761fb96)

#### Выход
![Screenshot 2025-03-19 214052](https://github.com/user-attachments/assets/d59fb4ed-1538-4d72-8e3b-024ec42cd874)

#### Запрос с валидным токеном
![Screenshot 2025-03-19 214214](https://github.com/user-attachments/assets/1327f62f-01d8-496e-b2f6-bd10df689f06)


#### Запрос без валидного токена
![Screenshot 2025-03-19 214234](https://github.com/user-attachments/assets/3f4e081f-6dbc-4a9b-a92f-73c8cac0728f)

### Управление категориями с разным уровнем доступа
#### Изменение категории, к которой у пользователя есть доступ
![Screenshot 2025-03-19 222236](https://github.com/user-attachments/assets/d1e7f355-b734-4de0-a719-1bf818e27302)

#### Изменение категории, к которой у пользователя нет доступа
![Screenshot 2025-03-19 222505](https://github.com/user-attachments/assets/84c3ee31-f25a-475c-9d91-ac1f46fc93f5)

### Управление товарами
#### Создание товара (Create)
![Screenshot 2025-02-23 193004](https://github.com/user-attachments/assets/d5907726-dc68-4e9d-8cdf-fcdf3eccbc61)
#### Получение списка товаров (Read)
![Screenshot 2025-02-23 193040](https://github.com/user-attachments/assets/332f57ad-c449-497e-a98e-2720c5667fce)

#### Получение деталей товара (Read)
![Screenshot 2025-02-23 193454](https://github.com/user-attachments/assets/1ee229bb-5dc4-44db-ae8c-36c1cb57fd23)

#### Обновление товара (Update)
![Screenshot 2025-02-23 193921](https://github.com/user-attachments/assets/de13a866-1d5e-4357-a12b-eaaf931d787a)

#### Удаление товара (Delete)
![Screenshot 2025-02-23 193952](https://github.com/user-attachments/assets/5a04782a-8560-4dfc-b775-2e77d03e40f1)

### Управление категориями товаров
#### Создание категории (Create)

![Screenshot 2025-02-23 194544](https://github.com/user-attachments/assets/46d2a47e-e20a-418b-b35d-ba57b2e7c549)
#### Получение списка категорий (Read)

![Screenshot 2025-02-23 194036](https://github.com/user-attachments/assets/b8d5f87a-e4c1-4dd9-a7e1-a909b8691680)
#### Получение деталей категории (Read)
![Screenshot 2025-02-23 194645](https://github.com/user-attachments/assets/33b2c345-7585-491c-9b49-db63f697b78c)

#### Обновление категории (Update)
![Screenshot 2025-02-23 194726](https://github.com/user-attachments/assets/8e76a14b-8ae2-4ee0-885d-91ab5ef5d4ea)

#### Удаление категории (Delete)
![Screenshot 2025-02-23 194750](https://github.com/user-attachments/assets/2cfd242a-cba6-4499-b58b-12fe241a6b88)

### Валидация данных и обработка ошибок
![Screenshot 2025-02-23 194829](https://github.com/user-attachments/assets/e89e2854-0447-48c2-9050-ae2a65b55183)
![Screenshot 2025-02-23 194905](https://github.com/user-attachments/assets/47e63af8-0652-428f-9c0a-c4b57ab3a3df)

### Логирование запросов и ошибок в консоль

![Screenshot 2025-02-23 224255](https://github.com/user-attachments/assets/dacbffad-6314-408a-a6b3-17a89f1b6f6b)
