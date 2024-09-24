from django.shortcuts import render
from lecture.models import Categories, Lectures, Comments


# Create your views here.
def lecture_list(request):
    page = int(request.GET.get("page", 1))
    PAGE_SIZE = 20

    start, end = (page - 1) * PAGE_SIZE, page * PAGE_SIZE

    category_list = Categories.objects.all()
    lecture_list = Lectures.objects.prefetch_related(
        "comments_set").all()[start:end]
    response = render(
        request,
        "lecture/lecture-list.html",
        {
            "category_list": category_list,
            "lecture_list": lecture_list
        },
    )
    return response
