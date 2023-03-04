from django.conf import settings
from django.db import models

USER = settings.AUTH_USER_MODEL
# Create your models here.


class Tweet(models.Model):
    owner = models.ForeignKey(USER, related_name='tweets', on_delete=models.CASCADE)
    content = models.CharField(max_length=255)
    likes = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Tweet: {self.content}"
