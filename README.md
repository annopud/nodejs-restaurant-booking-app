# Documentation

## Getting Started

### Start Application with npm

**Install dependencies:**

```bash
npm install
```

**Start the application:**

```bash
npm run start
```

**Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.**

### Start Application Using Docker

**Create and start containers:**

 ```bash
 docker compose up -d
 ```

The `-d` option is optional if you want to run the container in the background.

**Alternatively, build or rebuild the service by executing:**

```bash
docker compose build
```

Then start the containers:

```bash
docker compose up -d
```

**By default, port 3000 will be used. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.**

**To customize the listening port, create a new file in the root directory named `.env` with the following content:**

```env
PORT=8000
```

## Development or Local Run

**Install dependencies:**

```bash
npm install
```

**Run the project for development:**

```bash
npm run dev
```

**By default, port 3000 will be used. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.**

**To customize the listening port, create a new file in the root directory named `.env.local` with the following content:**

```env
PORT=3300
```

## Testing

**Unit testing:**

```bash
npm run test
```

**Unit testing with automatic reload:**

```bash
npm run test:watch
```
