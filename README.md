# Markdown tools

## Build the image

```bash
docker build -t greenfox/markdown-tools:latest .
```

## Push to Docker Hub

Use the `foxyfox` DockerHub user to add yourself to the greenfox organization.

```bash
docker login
```

Hopefully you'll get Login Succeeded.

```bash
docker push greenfox/markdown-tools:latest
```
