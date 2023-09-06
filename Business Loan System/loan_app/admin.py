from django.contrib import admin
from loan_app.models import BalanceSheet, LoanApplication, Business

# Register your models here.
admin.site.register(Business)
admin.site.register(LoanApplication)
admin.site.register(BalanceSheet)
