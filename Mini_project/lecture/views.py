from django.shortcuts import render
from lecture.models import Lectures, Comments


# Create your views here.
def lecture_list(request):
    lecture_list = Lectures.objects.prefetch_related("comments_set").all()
    response = render(
        request,
        "lecture/lecture-list.html",
        {"lecture_list": lecture_list},
    )
    return response
