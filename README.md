# Dillinger

### Installation

First, you need to build the container.

```sh
$ sudo docker build -f Dockerfile -t the-cap-tts:1.0 .
```

Then you can run it 

```sh
sudo docker run -p9990:9990 --name thecaptts the-cap-tts:1.0
```

### How yo use it

Go to the POST url, enter the string you want to speech.
Once it's done, go to your GET url and get your base64 file.

| METHOD | URL |
| ------ | ------ |
| POST | 0.0.0.0:9990/post |
| GET | 0.0.0.0:9990/get |



