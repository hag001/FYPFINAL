from rest_framework import serializers
from .models import DifficultyLevel, Question

class DifficultyLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = DifficultyLevel
        fields = ['id', 'level']

class QuestionSerializer(serializers.ModelSerializer):
    difficulty = DifficultyLevelSerializer(read_only=True)
    difficulty_id = serializers.PrimaryKeyRelatedField(
        queryset=DifficultyLevel.objects.all(), write_only=True, source='difficulty')

    class Meta:
        model = Question
        fields = ['id', 'question_text', 'answer', 'difficulty', 'difficulty_id', 'image_url']

    def validate(self, data):
        difficulty = data.get('difficulty')

        # Custom validation logic for question based on difficulty
        if difficulty and difficulty.level == DifficultyLevel.EASY and not data.get('image_url'):
            data['image_url'] = None  # Ensure no image URL for easy level questions
        elif difficulty and difficulty.level == DifficultyLevel.MEDIUM and not data.get('image_url'):
            raise serializers.ValidationError("Image URL is required for Medium level questions.")
        
        return data
