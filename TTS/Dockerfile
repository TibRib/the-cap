FROM alpine
#We need some libraries in our alpine in order to build the project
RUN apk add build-base && apk add python3 && apk add py3-flask

COPY . /app
WORKDIR /app

#Configuration and make 
RUN ./configure && make

ENTRYPOINT ["python3", "-u", "api.py"]

EXPOSE 9990

