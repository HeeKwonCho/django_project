from django.shortcuts import render, get_object_or_404, redirect
from lecture.models import Categories, Lectures, Comments
from django.core.paginator import Paginator
from django.http import Http404
from .forms import CommentForm


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
    lecture_list = Lectures.objects.filter(
        category_id=category_list[0].id).order_by("-created_at")

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


def lecture_list_in_category(request, category_id):
    category_list = Categories.objects.all()
    lecture_list = Lectures.objects.filter(
        category_id=category_id).order_by("-created_at")

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


def lecture_detail(request, category_id, lecture_id):
    category_list = Categories.objects.all()

    # try:
    #     lecture = Lectures.objects.filter(
    #         id=lecture_id).prefetch_related("comments_set")
    # except Lectures.DoesNotExist:
    #     raise Http404
    # lecture = get_object_or_404(Lectures, id=lecture_id)
    # lecture_info = Lectures.objects.filter(id=lecture_id)
    lecture = Lectures.objects.filter(category_id=category_id).get(
        id=lecture_id)
    comment_list = lecture.comments_set.all()
    form = CommentForm()

    if request.method == "POST":
        form = CommentForm(request.POST)

        if form.is_valid():
            data = form.data
            comment = Comments(
                content=data["content"],
                lecture_id=lecture_id,
                user_id=request.user.id,
            )
            comment.save()
            return redirect(
                f"/lecture/category/{category_id}/detail/{lecture_id}")

    response = render(
        request,
        "lecture/lecture-detail.html",
        {
            "category_list": category_list,
            "lecture_info": lecture,
            "comment_list": comment_list,
            "form": form,
        },
    )
    return response
