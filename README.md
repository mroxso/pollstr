# pollstr
A Poll Website for Nostr

# Docker
Run pre-built Docker Image:
```
docker run --rm -p 8080:80 ghcr.io/mroxso/pollstr
```

or build it yourself with:
```
git clone git@github.com:mroxso/pollstr.git
cd pollstr
docker build -t pollstr:local .
docker run --rm -p 8080:80 pollstr:local
```

# Contribution
Feel free to contribute