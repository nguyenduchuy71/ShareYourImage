# Use the official Python image as the base image
FROM python:3.12

# Set the working directory in the container
WORKDIR /app

COPY . .

# Install any dependencies needed
RUN pip3 install --upgrade pip

RUN pip3 install -r requirements.txt

# Expose port 8000
EXPOSE 8000

# Command to run the FastAPI server
CMD ["python3", "main.py"]
