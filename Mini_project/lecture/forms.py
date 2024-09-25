from django import forms
from .models import Comments


class BootstrapModelForm(forms.ModelForm):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._widget_update()

    def _widget_update(self):
        for visible in self.visible_fields():
            visible.field.widget.attrs["class"] = "form-control"


class CommentForm(BootstrapModelForm):

    class Meta:
        model = Comments
        fields = ["content"]
        widgets = {
            "content": forms.Textarea(attrs={"placeholder": "리뷰를 작성하세요."}),
        }
