FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
#COPY api .
#COPY ranking ranking


RUN pip3 install .

#EXPOSE 5000
ENTRYPOINT [ "python", "./api/api.py" ]