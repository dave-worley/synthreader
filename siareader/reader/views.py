from django.shortcuts import render

def index(req):
    return render(req, 'reader/home.html')
