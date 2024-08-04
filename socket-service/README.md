# Socket service

This is a service responsible for real-time communication for client-side interactions.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)

## Installation

To get started with the project, follow these steps:

1. Clone the repository:
    ```sh
    https://github.com/nguyenduchuy71/ShareYourImage
    ```
2. Navigate into the socket-service directory:
    ```sh
    cd socket-service
    ```
3. Install libraries:
    ```sh
    npm install
    ```

## Usage

To run the FastAPI development server locally, run:
```sh
npm start
```

## Features

- **Real-Time Image Sharing**: WebSocket integration for real-time image sharing between users.
- **Containerization**: Docker for containerizing the application, ensuring consistency across different environments.

## Technologies Used

### NodeJS

[NodeJS](https://nodejs.org) is a free, open-source, cross-platform JavaScript runtime environment that lets developers create servers, web apps, command line tools and scripts.

### WebSocket

[WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) is a protocol providing full-duplex communication channels over a single TCP connection. This project uses WebSocket to enable real-time communication between the server and clients.

### Docker

[Docker](https://www.docker.com/) is a distributed event streaming platform capable of handling trillions of events a day. It is used in this project to manage real-time messaging and event streaming.
