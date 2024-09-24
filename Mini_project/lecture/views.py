from django.shortcuts import render
from lecture.models import Categories, Lectures, Comments
from django.core.paginator import Paginator


# Create your views here.
def lecture_list(request):
    # page = int(request.GET.get("page", 1))
    # PAGE_SIZE = 20

    # start, end = (page - 1) * PAGE_SIZE, page * PAGE_SIZE

    # category_list = Categories.objects.all()
    # lecture_list = Lectures.objects.prefetch_related(
    #     "comments_set").all()[start:end]

    # page_numbers = list(range(start + 1, end + 2))
    category_list = Categories.objects.all()
    lecture_list = Lectures.objects.prefetch_related("comments_set").all()
    
    PAGE_SIZE = 20
    paginator = Paginator(lecture_list, PAGE_SIZE)

    page_number = request.GET.get("page")
    lecture_page_obj = paginator.get_page(page_number)

    response = render(
        request,
        "lecture/lecture-list.html",
        {
            "category_list": category_list,
            "lecture_list": lecture_page_obj,
        },
    )
    return response
