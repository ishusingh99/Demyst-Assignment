from django.db import models

class Business(models.Model):
    name = models.CharField(max_length=100)
    year_established = models.IntegerField()

class BalanceSheet(models.Model):
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    year = models.IntegerField()
    month = models.IntegerField(default = 0)
    profit_loss = models.FloatField()
    assets_value = models.FloatField(default = 0)

class LoanApplication(models.Model):
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    loan_amount = models.FloatField()
