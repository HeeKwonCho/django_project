from django.shortcuts import render, redirect
from .forms import RegisterForm
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User


# Create your views here.
def register(request):
    form = RegisterForm()

    if request.method == "POST":
        form = RegisterForm(request.POST)

        if form.is_valid():
            user = form.save(commit=False)
            user.username = form.cleaned_data["email"]
            user.save()

            username = user.username
            password = form.data.get("password1")

            # 검증하는 함수. user가 존재하면 user리턴, 없으면 None return
            user = authenticate(username=username, password=password)

            # 로그인 진행 = 세션에 등록
            login(request, user)

            return redirect("/lecture")

    response = render(
        request,
        "user/signup.html",
        {"form": form},
    )
    return response
