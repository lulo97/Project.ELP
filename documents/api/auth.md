# Authentication API Documentation

Base URL: `/api/auth`

## Endpoints

### Sign Up

**URL:** `/signup`  
**Method:** `POST`  
**Description:** Create a new user account.

**Request Body:**
```json
{
  "username": string,
  "password": string
}
```

**Responses:**

- **201 Created**
```json
{
  "error": null,
  "data": null
}
```

* **400 Bad Request**

```json
{
  "error": "Username is null!",
  "data": null
}
```

```json
{
  "error": "Password is null!",
  "data": null
}
```

```json
{
  "error": "Some error from DB",
  "data": null
}
```

---

### Log In

**URL:** `/login`
**Method:** `POST`
**Description:** Log in an existing user and set a JWT cookie.

**Request Body:**

```json
{
  "username": string,
  "password": string
}
```

**Responses:**

* **200 OK**

```json
{
  "error": null,
  "data": null
}
```

Sets a cookie `token` containing the JWT.

* **400 Bad Request**

```json
{
  "error": "User not exist!",
  "data": null
}
```

```json
{
  "error": "Password incorrect!",
  "data": null
}
```

---

### Log Out

**URL:** `/logout`
**Method:** `POST`
**Description:** Log out the current user by clearing the authentication cookie.

**Responses:**

* **200 OK**

```json
{
  "error": null,
  "data": null
}
```

* **200 OK (no token)**

```json
{
  "error": "No token detected to delete!",
  "data": null
}
```

---

### Get Current User

**URL:** `/me`
**Method:** `GET`
**Description:** Retrieve the currently authenticated user's info from JWT cookie.

**Responses:**

* **200 OK (valid token)**

```json
{
  "error": null,
  "data": {
    "user": {
      "username": "exampleUser",
      "iat": 1700000000,
      "exp": 1700003600
    }
  }
}
```

* **200 OK (no or invalid token)**

```json
{
  "error": "No token provided",
  "data": null
}
```

```json
{
  "error": "Invalid or expired token",
  "data": null
}
```

* **200 OK (other errors)**

```json
{
  "error": "Error message here",
  "data": null
}
```

---

### Notes

* Login sets an HTTP-only cookie named `token`.
* Passwords are hashed with bcrypt.
* JWT setting like `secret` and `maxAge` stored in table CONSTS in database