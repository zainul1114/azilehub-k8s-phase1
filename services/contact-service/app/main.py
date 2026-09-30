from fastapi import FastAPI
from pydantic import BaseModel, EmailStr


app = FastAPI(
    title="Azilehub Contact Service",
    version="1.0.0"
)


class ContactRequest(BaseModel):
    first_name: str
    last_name: str
    phone: str
    email: EmailStr
    message: str


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "contact-service"
    }


@app.post("/api/contact")
def create_contact(contact: ContactRequest):

    print("Contact received:")
    print(contact.model_dump())

    return {
        "status": "success",
        "message": "Thank you for contacting Azilehub Academy.",
        "contact": contact.model_dump()
    }
