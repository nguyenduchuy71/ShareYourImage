# Client-Side Project

This client is a web application that enables users to share images in real-time. The client-side of the application is built using modern web technologies to ensure a responsive and dynamic user experience.

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
2. Navigate into the project directory:
    ```sh
    cd client-typescript
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

## Usage

To start the development server, run:
```sh
npm run dev
```

## Features

- **User Authentication**: Secure user authentication ensures that only registered users can upload and view images.
- **Real-Time Image Sharing**: Users can upload images and share them with others in real-time using WebSocket technology.
- **Responsive Design**: The application is styled with TailwindCSS to ensure it looks great on all devices, from mobile phones to desktops.
- **State Management**: Zustand is used for efficient state management, ensuring smooth interaction and real-time updates across the application.
- **Firebase Storage**: Uploaded images are securely stored in Firebase Storage, leveraging its robust and scalable infrastructure.


## Technologies Used

### ReactJS

[ReactJS](https://reactjs.org/) is a popular JavaScript library for building user interfaces. It allows developers to create large web applications that can update and render efficiently in response to data changes. React's component-based architecture makes it easy to build reusable UI components.

### TypeScript

[TypeScript](https://www.typescriptlang.org/) is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. By adding static types, TypeScript improves developer productivity and code maintainability. It helps catch errors early through type checking and provides powerful IDE features like auto-completion and refactoring.

### TailwindCSS

[TailwindCSS](https://tailwindcss.com/) is a utility-first CSS framework that provides low-level utility classes to build custom designs directly in your markup. It enables rapid UI development and eliminates the need for custom CSS. With its responsive design utilities and extensive configurability, TailwindCSS helps streamline the styling process.

### Zustand

[Zustand](https://github.com/pmndrs/zustand) is a small, fast, and scalable state management library for React applications. It provides a simple API to manage and update state without the boilerplate typically associated with state management libraries. Zustand’s minimalistic approach and optimized performance make it an excellent choice for managing state in React applications.

### Firebase Storage

[Firebase Storage](https://firebase.google.com/products/storage) provides secure file uploads and downloads for Firebase apps. It is backed by Google Cloud Storage and offers robust and scalable object storage solutions. Firebase Storage is easy to integrate with other Firebase services and provides a simple and efficient way to handle user-generated content, such as photos and videos.
