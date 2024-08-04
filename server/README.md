# Server-Side Project

This project serves as the backend for the image sharing application, providing APIs and real-time communication for client-side interactions.

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
2. Navigate into the server directory:
    ```sh
    cd server
    ```
3. Create virtual environment:
    ```sh
    python -m venv env
    ```

4. Active virtual environment:
    ```sh
    source env/Script/Active
    ```

5. Install libraries:
    ```sh
    pip install -r requirements/dev.txt
    ```

## Usage

To run the FastAPI development server locally, run:
```sh
python src/main.py
```

## Features

- **User Authentication**: Secure user authentication using JWT tokens.
- **Database Management**: PostgreSQL for robust and scalable database management.
- **ORM**: Object-Relational Mapping (ORM) for seamless interaction with the database.
- **Containerization**: Docker for containerizing the application, ensuring consistency across different environments.

## Technologies Used


### Python

[Python](https://www.python.org/) is a versatile programming language that allows for rapid development and deployment. It is widely used in web development, data analysis, artificial intelligence, and more.

### FastAPI

[FastAPI](https://fastapi.tiangolo.com/) is a modern, fast (high-performance), web framework for building APIs with **Python 3.7+** based on standard Python type hints. It provides automatic interactive API documentation and high performance comparable to NodeJS and Go.

### PostgreSQL

[PostgreSQL](https://www.postgresql.org/) is a powerful, open source object-relational database system with over 30 years of active development. It is known for its reliability, robustness, and performance.

### SQLAlchemy

[SQLAlchemy](https://www.sqlalchemy.org/) is a SQL toolkit and Object-Relational Mapping (ORM) library for Python. It provides a full suite of well-known enterprise-level persistence patterns, designed for efficient and high-performing database access.

### Docker

[Docker](https://www.docker.com/) is a distributed event streaming platform capable of handling trillions of events a day. It is used in this project to manage real-time messaging and event streaming.

### ORM

An Object-Relational Mapper (ORM) is used to interact with the database in an object-oriented manner. This project uses SQLAlchemy to handle the database operations seamlessly.
