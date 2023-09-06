import json
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Business, BalanceSheet, LoanApplication
from .decision_engine import calculate_pre_assessment



def home(request):
    return render(request,"loan_app/start_application.html")

def loan_application_view(request):
    return render(request,"loan_app/loan_application.html")

@csrf_exempt
def request_balance_sheet(request):
    if request.method=='POST':
        data = json.loads(request.body)
        business_name = data['business_name']
        year_established = data['year_established']
        loan_amount = data['loan_amount']
        print(data)
        business = Business.objects.filter(name=business_name, year_established=year_established).first()
        if business:
            balance_sheets_val = BalanceSheet.objects.filter(business=business).all().values()
            loan_application = LoanApplication.objects.create(business=business, loan_amount=loan_amount)
            response = {
                "name": business.name,
                "business_id": business.id,
                "year_established": business.year_established,
                "balance_sheets": list(balance_sheets_val),
            }
            
            return HttpResponse(json.dumps(response))
        response = {
            "Message" : "Business not found"
        }
        return HttpResponse("<h1>Error!</h1>")

def preassessment(request, business_id):
    if request.method == "GET":
        business = Business.objects.filter(id=business_id).first()
        if business:
            balance_sheets_val = BalanceSheet.objects.filter(business=business).all().values()
            # to check whether balance sheets exist
            loan_application = LoanApplication.objects.filter(business__id=business_id).first()
            loan_amount = loan_application.loan_amount
            pre_assessment = calculate_pre_assessment(balance_sheets_val, loan_amount)
            response = {
                "name": business.name,
                "year_established": business.year_established,
                "loan_amount": loan_amount,
                "pre_assessment": pre_assessment,
                "message" : f"{pre_assessment} percent of the loan amount has been approved."
            }
            return render(request,'loan_app/pre_assessment_result.html',response)