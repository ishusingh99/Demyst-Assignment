from django.urls import path
from .views import request_balance_sheet,home,loan_application_view,preassessment

urlpatterns = [
    path('request_balance_sheet/', request_balance_sheet, name = 'request_balance_sheet'),
    path('home/', home, name='home' ),
    path('loan_application/', loan_application_view, name='loan_application' ),
    path('preassessment/<int:business_id>',preassessment,name = 'preassessment')
]
