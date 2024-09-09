from django.db import models

class DifficultyLevel(models.Model):
    EASY = 'easy'
    MEDIUM = 'medium'
    HARD = 'hard'

    DIFFICULTY_CHOICES = [
        (EASY, 'Easy'),
        (MEDIUM, 'Medium'),
        (HARD, 'Hard'),
    ]

    level = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES, unique=True)

    def __str__(self):
        return self.get_level_display()

class Question(models.Model):
    difficulty = models.ForeignKey(DifficultyLevel, on_delete=models.CASCADE)
    question_text = models.CharField(max_length=255)
    answer = models.CharField(max_length=255, null=True, blank=True)  # Allow NULL and blank values
    image_url = models.CharField(max_length=255, null=True, blank=True)  # Allow NULL and blank values

    def __str__(self):
        return f"{self.difficulty} - {self.question_text}"
