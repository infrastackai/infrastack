import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import User


@csrf_exempt
def user_list(request):
    if request.method == 'GET':
        users = list(User.objects.all().values('id', 'name', 'age'))
        return JsonResponse(users, safe=False)
    elif request.method == 'POST':
        try:
            data = json.loads(request.body)
            user = User.objects.create(name=data['name'], age=data['age'])
            return JsonResponse({'id': user.id, 'name': user.name, 'age': user.age}, status=201)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except KeyError:
            return JsonResponse({'error': 'Missing required fields'}, status=400)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)