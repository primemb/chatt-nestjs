<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

# NestJS Chat Application with Microservices Architecture

This repository contains a simple **Chat Application** built with **NestJS**, showcasing a modular **microservices architecture**. The project includes real-time messaging powered by **WebSockets**, as well as **RESTful APIs** for chat management and user authentication.

## Features

### Auth Service

- **JWT Authentication**: Secure authentication using **private/public key** for token signing and verification.
- **Token Validation**: Seamless token validation across all microservices.
  run on port _3002_ by default
- **Endpoints**:
  - `/login`: Authenticate users and issue tokens.
  - `/register`: create new user.

### Chat Service

- **RESTful API**: Provides endpoints to create and manage chat sessions.
  run on port _3000_ by default
- **Endpoints**:
  - `/chats`: Create new chats.

### WebSocket Service

- **Real-Time Messaging**: Enables users to subscribe to and exchange messages in real-time. run on port _3001_ by default
- **WebSocket Events**:
  - `chat_created`: Subscribe to chat

## Architecture

- **Microservices**: Each service is isolated and communicates via **RMQ transport**.
- **Dockerized**: Fully containerized for simplified deployment and scaling.
- **Shared Modules**: Reusable modules for common functionality across services.

## Getting Started

### Prerequisites

- Docker & Docker Compose installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-link.git
   cd your-repo-link
   ```
2. Change `.env.development` inside each /apps if needed

3. Run
   ```bash
   docker compose up --build
   ```
