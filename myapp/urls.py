from django.urls import path
from .views import *

urlpatterns = [

# Form authentication endpoints
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),

# Task management endpoints
    path('addtask/', TaskListCreateView.as_view(), name='addtask'),
    path('addtask/<int:pk>/', TaskRetrieveUpdateDestroyView.as_view(), name='task-detail'),

    
]