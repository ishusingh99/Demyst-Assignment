# Business Loan System

Documentation - `https://docs.google.com/document/d/1Qx5ZTA7NyB2utKhrAeH-M-9A_kjpPex9PJvhwj6vRTg/edit?usp=sharing`
 
### Steps to run

1. clone the github repo - `git clone https://github.com/ishusingh99/Demyst-Assignment.git`
2. cd into the Business Load System - `cd '.\Business Loan System\'`
3. run python manage.py migrate in the terminal.
4. run python manage.py runserver in the terminal to run the server.
5. To test APIs run `http://127.0.0.1:8000/admin/`, so as to populate the Database Models.

### Entities 

1. Business
2. BalanceSheet
3. LoanApplication


### Database Models

#### Business:

Description: Represents a business entity with the following fields:

```
name (CharField, max_length=100): Name of the business.
year_established (IntegerField): Year the business was established.
```

#### BalanceSheet:

Description: Represents a balance sheet for a business with the following fields:

```
business (ForeignKey to Business): Business associated with the balance sheet.
year (IntegerField): Year of the balance sheet.
month (IntegerField, default=0): Month of the balance sheet.
profit_loss (FloatField): Profit or loss value.
assets_value (FloatField, default=0): Assets value.
```

#### LoanApplication:

Description: Represents a loan application with the following fields:

```
business (ForeignKey to Business): Business associated with the loan application.
loan_amount (FloatField): The requested loan amount (input from the user).
```

### API Details:

#### request_balance_sheet

URL: `http://127.0.0.1:8000/request_balance_sheet/`

Method: POST
```
Request Body:
{
  "business_name": "Test",
  "year_established": 2023,
  "loan_amount": 100000
}
```
Description:
- Based on the ‘business_name’ and ‘year_established’ this API will fetch the ‘balance_sheets’ of that business.
- Inserts ‘loan_amount’ in the ‘LoanApplication’ table.

```
Response: 
{
  "name": "Test",
  "business_id": 4,
  "year_established": 2023,
  "balance_sheets": [
    {
      "id": 6,
      "business_id": 4,
      "year": 2023,
      "month": 12,
      "profit_loss": 250000,
      "assets_value": 1234
    },
    {
      "id": 7,
      "business_id": 4,
      "year": 2023,
      "month": 11,
      "profit_loss": 1150,
      "assets_value": 5789
    },
    {
      "id": 8,
      "business_id": 4,
      "year": 2023,
      "month": 10,
      "profit_loss": 2500,
      "assets_value": 22345
    },
    {
      "id": 9,
      "business_id": 4,
      "year": 2023,
      "month": 9,
      "profit_loss": -187000,
      "assets_value": 223452
    }
  ]
}
```
#### preassessment

URL: `http://127.0.0.1:8000/request_balance_sheet/4`

Method: GET

Description: This API calls the calculate_pre_assessment method in the decsion_engine.py file to calculate the preassessment for the Business whose ‘business_id’ is passed in the query params.

Response:

![image](https://github.com/ishusingh99/Demyst-Assignment/assets/55423606/ef145111-a400-498b-b1bf-bb075953d720)

#### Preassessment Calculation:

- Total Profit Loss: Total Profit Loss across the last 12 months as mentioned in the balance sheet.
- Average Asset Value: Average Asset Value across the last 12 months as mentioned in the balance sheet i.e. Total Asset Value(Sum of asset value across 12 months)/number of months.
- If the Average Asset Value is greater than the Loan Amount, Preassessment = 100.
- If the Total Profit Loss is greater than 0, Preassessment = 60.

### Frontend:

#### URL 1 - `http://127.0.0.1:8000/home/`
![image](https://github.com/ishusingh99/Demyst-Assignment/assets/55423606/ced2f8cd-43d0-4cce-907b-182e3adef740)

- Upon hitting the Start Application button, we get to the Business Loan Application page.

#### URL 2 - `http://127.0.0.1:8000/loan_application/`
![image](https://github.com/ishusingh99/Demyst-Assignment/assets/55423606/8e2cec6a-9b9d-410c-965b-8e7b621333fc)

- Upon filling the details for the fields, Business Name, Year Established and Loan Amount and then hitting the Request Balance Sheets Button, we get the following updates to the same page.

![image](https://github.com/ishusingh99/Demyst-Assignment/assets/55423606/477f7e6f-5924-4e9e-a56b-99b614776a6f)

![image](https://github.com/ishusingh99/Demyst-Assignment/assets/55423606/657b4ea9-64f3-424d-9543-98293970539e)

- Upon reviewing the Balance Sheet data, and then hitting the Submit Application button, we get to the following page where the Preassessment Result is displayed.

#### URL 3 - `http://127.0.0.1:8000/preassessment/4`
![image](https://github.com/ishusingh99/Demyst-Assignment/assets/55423606/30ee7418-9562-4e11-aa6a-e1787fd44079)





