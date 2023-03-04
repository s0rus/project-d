from django import forms
from dawitter.models import Tweet

class AddTweetForm(forms.ModelForm):
    content = forms.CharField(
    widget = forms.widgets.Textarea(
        attrs={
            "placeholder": "Dweet something...",
            "rows": "4",
        }
    ),
    label = "",
    )

    class Meta:
        model = Tweet
        exclude = ('owner', 'likes')