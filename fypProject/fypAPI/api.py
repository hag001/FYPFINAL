from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Question, DifficultyLevel
from .serializers import QuestionSerializer, DifficultyLevelSerializer

# API View to list all difficulty levels
class DifficultyLevelListAPIView(generics.ListCreateAPIView):
    queryset = DifficultyLevel.objects.all()
    serializer_class = DifficultyLevelSerializer


# API View to list and create questions
class QuestionListCreateAPIView(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def perform_create(self, serializer):
        # Create a question based on the difficulty level
        serializer.save()

# API View to retrieve, update, or delete a specific question
class QuestionDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
