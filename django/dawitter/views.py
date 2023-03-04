from django.db import IntegrityError
from django.http import HttpResponse, HttpRequest, HttpResponseBadRequest
from django.shortcuts import render
from django.views.generic import View

from dawitter.models import Tweet
from .forms import AddTweetForm


# Create your views here.

class MainPageView(View):
    def get(self, request: HttpRequest) -> HttpResponse:
        tweets = Tweet.objects.all().values()
        form = AddTweetForm()

        context = {'tweets': tweets, 'form': form}

        return render(request=request, template_name='main_page.html', context=context)

    def post(self, request: HttpRequest) -> HttpResponse:
        form = AddTweetForm(request.POST)
        if form.is_valid():
            try:
                tweet = form.save(commit=False)
                tweet.owner = request.user
                tweet.save()
            except IntegrityError:
                return HttpResponseBadRequest("Bad request")

            tweets = Tweet.objects.all().values() # Load all tweets once again
            form = AddTweetForm() # Load clean form
            context = {"form": form, "tweets": tweets}
        else:
            tweets = Tweet.objects.all().values()  # Load all tweets once again
            form = AddTweetForm()  # Load clean form
            context = {"form": form, "tweets": tweets}

        return render(request=request, template_name='main_page.html', context=context)




