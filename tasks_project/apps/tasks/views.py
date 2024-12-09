from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Task
from .serializers import TaskSerializer


TASKS_REPOSITORY = {}

class TaskListCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        """Obtener todas las tareas activas"""
        try:
            # tasks = Task.objects.filter(active=True) 
            tasks = [task for task in TASKS_REPOSITORY.values() if task.active]
            serializer = TaskSerializer(tasks, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {"detail": f"Error al obtener las tareas: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def post(self, request):
        """Crear una nueva tarea"""
        try:
            serializer = TaskSerializer(data=request.data)
            if serializer.is_valid():
                task = serializer.save()
                TASKS_REPOSITORY[task.id] = task #O quitarlo
                return Response({"message": "Registro almacenado correctamente"}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"detail": f"Error al crear la tarea: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class TaskDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, task_id):
        """Obtener tarea por ID"""
        try:
            # task = Task.objects.get(id=task_id, active=True)
            task = TASKS_REPOSITORY.get(task_id)
            if task is None or not task.active:
                return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
            serializer = TaskSerializer(task)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {"detail": f"Error al obtener la tarea: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def put(self, request, task_id):
        """Actualizar tarea existente"""
        try:
            # task = Task.objects.get(id=task_id, active=True)
            task = TASKS_REPOSITORY.get(task_id)
            if task is None or not task.active:
                return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

            serializer = TaskSerializer(task, data=request.data)
            if serializer.is_valid():
                task = serializer.save()
                TASKS_REPOSITORY[task.id] = task
                return Response({"message": "Registro almacenado correctamente"}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"detail": f"Error al actualizar la tarea: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def delete(self, request, task_id):
        """Eliminar tarea por ID (eliminación lógica)"""
        try:
            # task = Task.objects.get(id=task_id, active=True)
            task = TASKS_REPOSITORY.get(task_id)
            if task is None or not task.active:
                return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

            task.active = False  # Cambiar el estado a inactivo
            TASKS_REPOSITORY[task_id] = task
            return Response(
                {"detail": "Tarea eliminada localmente."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Exception as e:
            return Response(
                {"detail": f"Error al eliminar la tarea: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
