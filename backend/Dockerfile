# Use official Python image
FROM python:3.12

# Set working directory
WORKDIR /app

# Copy backend files
COPY . .

# Install dependencies
RUN pip install --upgrade pip \
    && pip install poetry==1.7.1 \
    && poetry install --no-interaction --no-ansi

# Expose port 8000
EXPOSE 8000

# Run Django server
CMD ["poetry", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]
