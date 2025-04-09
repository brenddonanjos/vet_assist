FROM python:latest

RUN pip install "fastapi[standard]" 
RUN pip install uvicorn pydantic mysql-connector-python

RUN mkdir /app
WORKDIR /app