# FDH Systems

This is the repo used for hosting the [MedusaJS](https://medusajs.com/) powered sales platform for [my storefront](https://fdh.one/store).  
It's based on:
- A [MedusaJS](https://medusajs.com/) powered backend server
    * A Postgres database
- A [Next.js](https://nextjs.org/) powered frontend

## Setup

This project uses Docker for easy maintenance / development. If you desire, you can technically go into `backend` and `storefront` in order to manually run them. You will still need `.env` for each of those folders.

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/) installed
- A valid `.env` file in the root of the project

1. **Clone the Repo**
    ```bash
    git clone https://github.com/FromDarkHell/fdh.store
    cd fdh.store
    ```
2. **Configure Variables**
    - Copy `.env.example` to `.env`
    - Update things like `POSTGRES_DB`, `POSTGRES_PASSWORD` especially.
        * `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` will need to be configured once the backend has ran for the first time, so you will need to configure/restart the docker container in order to set up a publishable key.
3. **Starting**
    - Start the full website via `docker-compose up --build`
        * This spins up a Postgres database, automatically runs all available MedusaJS migrations, and then starts the backend and then the frontend.

You can then access the storefront via `http://localhost:8000` and you can access the admin panel via `http://localhost:9000`.