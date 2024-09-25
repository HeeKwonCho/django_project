from django.db import models
from django.utils import timezone
from django.core import validators
from django.contrib.auth import get_user_model

User = get_user_model()


# Create your models here.
class Sites(models.Model):
    site_name = models.CharField(max_length=50)
    site_url = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Categories(models.Model):
    cat_name = models.CharField(max_length=200)
    cat_parent = models.IntegerField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Lecturers(models.Model):
    lecturer_name = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Lectures(models.Model):
    site = models.ForeignKey(Sites, on_delete=models.SET_NULL, null=True)
    category = models.ForeignKey(Categories,
                                 on_delete=models.SET_NULL,
                                 null=True)
    lecturer = models.ForeignKey(Lecturers,
                                 on_delete=models.SET_NULL,
                                 null=True)
    lec_title = models.CharField(max_length=200)
    lec_img_link = models.CharField(max_length=500)
    lec_link = models.CharField(max_length=500)
    rating = models.DecimalField(max_digits=2, decimal_places=1)
    review_count = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Comments(models.Model):
    lecture = models.ForeignKey(Lectures, on_delete=models.SET_NULL, null=True)
    content = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
