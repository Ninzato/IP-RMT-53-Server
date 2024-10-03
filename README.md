# Druis Elor Vendur API Documentation

---

## Endpoints :

### Base URL

All API endpoints start with the following base URL: `http://localhost:3000/api/v1`

### List of available endpoints:

#### Auth

- `POST /auth/register`: Registers an account to the application
- `POST /auth/login`: Logs into an existing account

#### Characters

- `GET /characters/`: Retrieves all characters
- `GET /characters/:id`: Retrieves a character by id
- `POST /characters/`: Creates a character
- `DELETE /characters/:id`: Deletes a character by id

#### Battle

- `POST /battle/`: Generates a battle
- `GET /battle/:battleId`: Retrieves a battle by id
- `PATCH /battle/:battleId`: Patch the result battle of a certain id

#### Resource

- `Get /resource/races`: Retrieves all races
- `GET /resource/occupations`: Retrieves all occupations

&nbsp;

## 1. POST /auth/register

---

### Request:

This endpoint does not require any parameters.

### Response:

- #### **Status Code:** 201 Created

**Response Body:**

```json
{
  "id": 1,
  "username": "Mugiwara Luffy",
  "email": "luffy@yonkou.com",
  "updatedAt": "2024-10-03T04:50:48.371Z",
  "createdAt": "2024-10-03T04:50:48.371Z"
}
```

- #### **Status Code:** 400 Bad Request

**Response Body:**

```json
{
  "status": "fail",
  "message": "Email is required!" / "Password is required!"
}
```

- #### **Status Code:** 500 Internal Server Error

**Response Body:**

```json
{
  "status": "fail",
  "message": "Internal Server Error"
}
```

### Error Code for this Endpoint:

- **400 Bad Request**: The request could not be understood by the server.
- **500 Internal Server Error**: An error occured on the server

&nbsp;

## 2. POST /auth/login

---

### Request:

This endpoint does not require any parameters.

### Response:

- #### **Status Code:** 200 OK

**Response Body:**

```json
{
  "access_token": "<jwt token>",
  "id": 1
}
```

- #### **Status Code:** 400 Bad Request

**Response Body:**

```json
{
  "status": "fail",
  "message": "Please input your email" / "Please input your password"
}
```

- #### **Status Code:** 401 Unauthorized

**Response Body:**

```json
{
  "status": "fail",
  "message": "Invalid email / password"
}
```

- #### **Status Code:** 500 Internal Server Error

**Response Body:**

```json
{
  "status": "fail",
  "message": "Internal Server Error"
}
```

### Error Code for this Endpoint:

- **400 Bad Request**: The request could not be understood by the server.
- **401 Unauthorized**: An error occured on the server
- **500 Internal Server Error**: An error occured on the server

&nbsp;

## 3. GET /characters/

---

### Request:

This endpoint does not require any parameters.

### Headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

### Response:

- #### **Status Code:** 200 OK

**Response Body:**

```json
[
  {
    "id": 1,
    "userId": 1,
    "name": "Luffy",
    "raceId": 2,
    "occupationId": 8,
    "health": 100,
    "armor": 0,
    "backstory": "<backstory>",
    "skills": [
      {
        "id": 70,
        "name": "Cure Wounds",
        "index": "cure-wounds",
        "level": 1,
        "effect": {
          "type": "heal",
          "value": 10
        },
        "classes": ["bard", "cleric", "druid", "paladin", "ranger"],
        "createdAt": "2024-10-03T10:28:03.840Z",
        "updatedAt": "2024-10-03T10:28:03.840Z"
      },
      {
        "id": 46,
        "name": "Command",
        "index": "command",
        "level": 1,
        "effect": {
          "type": "attackBuff",
          "value": 1
        },
        "classes": ["cleric", "paladin"],
        "createdAt": "2024-10-03T10:28:03.840Z",
        "updatedAt": "2024-10-03T10:28:03.840Z"
      }
    ],
    "createdAt": "2024-10-03T10:33:52.223Z",
    "updatedAt": "2024-10-03T10:33:52.223Z"
  }
  ...
]
```

- #### **Status Code:** 500 Internal Server Error

**Response Body:**

```json
{
  "status": "fail",
  "message": "Internal Server Error"
}
```

### Error Code for this Endpoint:

- **500 Internal Server Error**: An error occured on the server

&nbsp;

## 4. GET /characters/:id

---

### Request:

**URL Parameters:**

- `id` (integer): The ID of the character to retrieve.

**Example Request:**

```http
GET /characters/123
```

### Headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

### Response:

- #### **Status Code:** 200 OK

**Response Body:**

```json
{
  "id": 1,
  "userId": 1,
  "name": "Luffy",
  "raceId": 2,
  "occupationId": 8,
  "health": 100,
  "armor": 0,
  "backstory": "<backstory>",
  "skills": [
    {
      "id": 70,
      "name": "Cure Wounds",
      "index": "cure-wounds",
      "level": 1,
      "effect": {
        "type": "heal",
        "value": 10
      },
      "classes": ["bard", "cleric", "druid", "paladin", "ranger"],
      "createdAt": "2024-10-03T10:28:03.840Z",
      "updatedAt": "2024-10-03T10:28:03.840Z"
    },
    {
      "id": 46,
      "name": "Command",
      "index": "command",
      "level": 1,
      "effect": {
        "type": "attackBuff",
        "value": 1
      },
      "classes": ["cleric", "paladin"],
      "createdAt": "2024-10-03T10:28:03.840Z",
      "updatedAt": "2024-10-03T10:28:03.840Z"
    }
  ],
  "createdAt": "2024-10-03T10:33:52.223Z",
  "updatedAt": "2024-10-03T10:33:52.223Z"
}
```

- #### **Status Code:** 500 Internal Server Error

**Response Body:**

```json
{
  "status": "fail",
  "message": "Internal Server Error"
}
```

### Error Code for this Endpoint:

- **500 Internal Server Error**: An error occured on the server

&nbsp;

## 5. POST /characters/

---

### Request:

This endpoint does not require any parameters.

### Headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

### Response:

- #### **Status Code:** 201 Created

**Response Body:**

```json
{
  "health": 100,
  "armor": 0,
  "id": 2,
  "userId": 1,
  "name": "Lorian Blackguard",
  "raceId": 8,
  "occupationId": 2,
  "backstory": "<backstory>",
  "skills": [
    {
      "id": 46,
      "name": "Command",
      "index": "command",
      "level": 1,
      "effect": {
        "type": "attackBuff",
        "value": 1
      },
      "classes": ["cleric", "paladin"],
      "createdAt": "2024-10-03T10:28:03.840Z",
      "updatedAt": "2024-10-03T10:28:03.840Z"
    },
    {
      "id": 251,
      "name": "Sanctuary",
      "index": "sanctuary",
      "level": 1,
      "effect": {
        "type": "attackBuff",
        "value": 1
      },
      "classes": ["cleric"],
      "createdAt": "2024-10-03T10:28:03.840Z",
      "updatedAt": "2024-10-03T10:28:03.840Z"
    }
  ],
  "updatedAt": "2024-10-03T16:50:19.818Z",
  "createdAt": "2024-10-03T16:50:19.818Z"
}
```

- #### **Status Code:** 400 Bad Request

**Response Body:**

```json
{
  "status": "fail",
  "message": "Name is required!" / "raceId is required!" / "occupationId is required!"
}
```

- #### **Status Code:** 500 Internal Server Error

**Response Body:**

```json
{
  "status": "fail",
  "message": "Internal Server Error"
}
```

### Error Code for this Endpoint:

- **400 Bad Request**: The request could not be understood by the server.
- **500 Internal Server Error**: An error occured on the server

&nbsp;

## 6. DELETE /characters/:id

---

### Request:

**URL Parameters:**

- `id` (integer): The ID of the character to delete.

**Example Request:**

```http
DELETE /characters/123
```

### Headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

### Response:

- #### **Status Code:** 200 OK

**Response Body:**

```json
{
  "message": "Successfully delete a character",
  "deletedCharacter": {
    "id": 1,
    "userId": 1,
    "name": "Luffy",
    "raceId": 2,
    "occupationId": 8,
    "health": 100,
    "armor": 0,
    "backstory": "<backstory>",
    "skills": [
      {
        "id": 70,
        "name": "Cure Wounds",
        "index": "cure-wounds",
        "level": 1,
        "effect": {
          "type": "heal",
          "value": 10
        },
        "classes": ["bard", "cleric", "druid", "paladin", "ranger"],
        "createdAt": "2024-10-03T10:28:03.840Z",
        "updatedAt": "2024-10-03T10:28:03.840Z"
      },
      {
        "id": 46,
        "name": "Command",
        "index": "command",
        "level": 1,
        "effect": {
          "type": "attackBuff",
          "value": 1
        },
        "classes": ["cleric", "paladin"],
        "createdAt": "2024-10-03T10:28:03.840Z",
        "updatedAt": "2024-10-03T10:28:03.840Z"
      }
    ],
    "createdAt": "2024-10-03T10:33:52.223Z",
    "updatedAt": "2024-10-03T10:33:52.223Z"
  }
}
```

- #### **Status Code:** 404 Not Found

**Response Body:**

```json
{
  "status": "fail",
  "message": "The character that you want to delete does not exist!"
}
```

- #### **Status Code:** 500 Internal Server Error

**Response Body:**

```json
{
  "status": "fail",
  "message": "Internal Server Error"
}
```

### Error Code for this Endpoint:

- **404 Not Found**: The requested resource could not be found.
- **500 Internal Server Error**: An error occured on the server

&nbsp;

## 7. POST /battle/

---

### Request:

This endpoint does not require any parameters.

### Headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

### Response:

- #### **Status Code:** 201 Created

**Response Body:**

```json
{
  "id": 4,
  "characterId": 1,
  "enemyId": 8,
  "turn": "player",
  "characterHealth": 100,
  "enemyHealth": 190,
  "result": "undecided",
  "updatedAt": "2024-10-03T17:08:38.822Z",
  "createdAt": "2024-10-03T17:08:38.822Z"
}
```

- #### **Status Code:** 400 Bad Request

**Response Body:**

```json
{
    "status": "fail",
    "message": "characterId is required!" / "characterHealth is required!"
}
```

- #### **Status Code:** 500 Internal Server Error

**Response Body:**

```json
{
  "status": "fail",
  "message": "Internal Server Error"
}
```

### Error Code for this Endpoint:

- **400 Bad Request**: The request could not be understood by the server.
- **500 Internal Server Error**: An error occured on the server

&nbsp;

## 8. GET /battle/:battleId

---

### Request:

**URL Parameters:**

- `id` (integer): The ID of the battle to retrieve.

**Example Request:**

```http
GET /battle/123
```

### Headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

### Response:

- #### **Status Code:** 201 Created

**Response Body:**

```json
{
  "id": 4,
  "characterId": 1,
  "enemyId": 8,
  "turn": "player",
  "characterHealth": 100,
  "enemyHealth": 190,
  "result": "undecided",
  "updatedAt": "2024-10-03T17:08:38.822Z",
  "createdAt": "2024-10-03T17:08:38.822Z"
}
```

- #### **Status Code:** 404 Not Found

**Response Body:**

```json
{
  "status": "fail",
  "message": "Battle not found"
}
```

- #### **Status Code:** 500 Internal Server Error

**Response Body:**

```json
{
  "status": "fail",
  "message": "Internal Server Error"
}
```

### Error Code for this Endpoint:

- **404 Not Found**: The requested resource could not be found.
- **500 Internal Server Error**: An error occured on the server

&nbsp;

## 9. PATCH /battle/:battleId

---

### Request:

**URL Parameters:**

- `id` (integer): The ID of the battle to retrieve.

**Example Request:**

```http
PATCH /battle/123
```

### Headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

### Response:

- #### **Status Code:** 200 Ok

**Response Body:**

```json
{
  "id": 4,
  "characterId": 1,
  "enemyId": 8,
  "turn": "player",
  "characterHealth": 100,
  "enemyHealth": 190,
  "result": "win",
  "updatedAt": "2024-10-03T17:08:38.822Z",
  "createdAt": "2024-10-03T17:08:38.822Z"
}
```

- #### **Status Code:** 404 Not Found

**Response Body:**

```json
{
  "status": "fail",
  "message": "Battle not found"
}
```

- #### **Status Code:** 500 Internal Server Error

**Response Body:**

```json
{
  "status": "fail",
  "message": "Internal Server Error"
}
```

### Error Code for this Endpoint:

- **404 Not Found**: The requested resource could not be found.
- **500 Internal Server Error**: An error occured on the server

&nbsp;

## 10. GET /resource/races

---

### Request:

This endpoint does not require any parameters.

### Headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

### Response:

- #### **Status Code:** 200 OK

**Response Body:**

```json
[
    {
        "id": 1,
        "index": "dragonborn",
        "name": "Dragonborn",
        "createdAt": "2024-10-03T10:27:52.098Z",
        "updatedAt": "2024-10-03T10:27:52.098Z"
    },
    ...
]
```

- #### **Status Code:** 500 Internal Server Error

**Response Body:**

```json
{
  "status": "fail",
  "message": "Internal Server Error"
}
```

### Error Code for this Endpoint:

- **500 Internal Server Error**: An error occured on the server

&nbsp;

## 11. GET /resource/occupations

---

### Request:

This endpoint does not require any parameters.

### Headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

### Response:

- #### **Status Code:** 200 OK

**Response Body:**

```json
[
    {
        "id": 1,
        "index": "bard",
        "name": "Bard",
        "createdAt": "2024-10-03T10:27:52.093Z",
        "updatedAt": "2024-10-03T10:27:52.093Z"
    },
    ...
]
```

- #### **Status Code:** 500 Internal Server Error

**Response Body:**

```json
{
  "status": "fail",
  "message": "Internal Server Error"
}
```

### Error Code for this Endpoint:

- **500 Internal Server Error**: An error occured on the server

&nbsp;
