from django.urls import path
from django.views.generic import TemplateView
from . import views
from . import api

urlpatterns = [
    path('', TemplateView.as_view(template_name='airport/index.html'), name='index'),
    path('api/questions/', api.QuestionListCreateAPIView.as_view(), name='question-list-create'),
    path('questions/<int:pk>/', api.QuestionDetailAPIView.as_view(), name='question-detail'),
    path('api/difficulty-levels/', api.DifficultyLevelListAPIView.as_view(), name='difficulty-level-list'),

]

# urlpatterns = [
#     path('difficulty-levels/', DifficultyLevelListAPIView.as_view(), name='difficulty-level-list'),
#     path('questions/', QuestionListCreateAPIView.as_view(), name='question-list-create'),
#     path('questions/<int:pk>/', QuestionDetailAPIView.as_view(), name='question-detail'),
# ]