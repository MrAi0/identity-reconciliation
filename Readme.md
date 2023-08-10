## Prerequisite

- [Docker](https://www.docker.com/get-started/)


## Get Started

- If you want to run this code in your local machine then this step is required, else skip this step and directly test the example for the hosted application.

```
 docker-compose up --build
```

This command would initialize the docker containers one running postgres and the other one running the node application.

## Sample POST request

- Import this into postman or run from terminal to start interacting with the application. This example is when you are running the application locally.

```
curl --location 'http://127.0.0.1:3000/identity' \
--header 'Content-Type: application/json' \
--data-raw '{   "email":"akshay@gmail.com",
"phoneNumber":"1234567890"
}'
```

- The following example is for the hosted application.

```
curl --location 'http://3.6.89.220/identity' \
--header 'Content-Type: application/json' \
--data-raw '{   "email":"akshay@gmail.com",
"phoneNumber":"1234567890"
}'
```

### Notes
- If the user has a primary contact mapped to either an email or phoneNumber it would create a secondary contact mapped to the respective primary contact, else it would create a primary contact with the given email and phoneNumber.


