from django.db import models

class Task(models.Model):
    class Status(models.TextChoices):
        PENDING = 'Pendiente'
        IN_PROGRESS = 'En Progreso'
        COMPLETED = 'Completada'
    
    class Priority(models.TextChoices):
        LOW = 'Baja'
        MEDIUM = 'Media'
        HIGH = 'Alta'

    name = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField()
    active = models.BooleanField(default=True)
    updated = models.DateTimeField(auto_now=True)
    status = models.CharField(
        max_length=15,
        choices=Status.choices,
        default=Status.PENDING
    )
    priority = models.CharField(
        max_length=10,
        choices=Priority.choices,
        default=Priority.LOW
    )

    def __str__(self):
        return self.name
