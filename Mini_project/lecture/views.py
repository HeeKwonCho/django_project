from django.shortcuts import render
from lecture.models import Categories, Lectures, Comments


# Create your views here.
def lecture_list(request):
    category_list = Categories.objects.all()
    lecture_list = Lectures.objects.prefetch_related("comments_set").all()
    response = render(
        request,
        "lecture/lecture-list.html",
        {
            "category_list": category_list,
            "lecture_list": lecture_list
        },
    )
    return response
