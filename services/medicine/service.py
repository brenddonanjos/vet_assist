from fastapi import FastAPI, Response
import uvicorn
import mysql.connector
from mysql.connector import Error
import datetime
from pydantic import BaseModel

ALIVE = "True"

app = FastAPI()

class Medicine(BaseModel):
    name: str
    description: str
    manufacturer: str
    expiration_date: str
    quantity: int

@app.get("/info")
def get_info():
  return  Response("Serviço de medicamentos rodando na porta 8001", status_code=200, media_type="text/plain")

@app.get("/alive")
def is_alive():
  return Response(ALIVE, staus_code=200, media_type="text/plain")

@app.get("/")
def get_medicines():
  medicines = []
  connection = conn()
  if connection:
    try:
      cursor = connection.cursor()
      cursor.execute("SELECT * FROM medicines")
      medicines = cursor.fetchall()

      cursor.close()
      connection.close()
    except Error as e:
      print("Erro ao executar a consulta:", e)      

    return medicines if medicines else []
  else:     
    return {"error": "Não foi possível conectar ao banco de dados"}

@app.post("/")
def create_medicine(medicine: Medicine):
  connection = conn()
  if connection:
    try:
      current_date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
      cursor = connection.cursor()
      cursor.execute(
         "INSERT INTO medicines (name, description, manufacturer, expiration_date, quantity, created_at) VALUES (%s, %s, %s, %s, %s, %s)", 
         (medicine.name, medicine.description, medicine.manufacturer, medicine.expiration_date, medicine.quantity, current_date))
      connection.commit()
      
      cursor.close()
      connection.close()

      return {"message": "Medicamento criado com sucesso!"}
    except Error as e:
      return {"error": "Falha ao registrar medicamento", "message": str(e)}
  else:
    return {"error": "Não foi possível conectar ao banco de dados"}

#Conexão com banco de dados
def conn():
    try:
        connection = mysql.connector.connect(
            host="medicine_db",
            user="user",
            password="user",
            database="medicine_db"
        )
        if connection.is_connected():
            print("Conexão com o banco de dados estabelecida!")
            return connection
    except Error as e:
        print("Erro ao conectar no banco:", e)
    return None

if __name__ == "__main__":
  uvicorn.run("service:app", host="0.0.0.0", port=8000, reload=True)