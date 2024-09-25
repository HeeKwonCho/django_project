from django.urls import path
from . import views

urlpatterns = [
    path("", views.lecture_list, name="lecture-list"),
    path(
        "category/<int:category_id>",
        views.lecture_list_in_category,
        name="lecture-list-in-category",
    ),
    path("detail/<int:lecture_id>",
         views.lecture_detail,
         name="lecture-detail"),
]
