## Architecture/Design Documents

# Flowchart

Login API & Sign-Up API

Shop API


# Database Schema

## User

```
Attribute Type
ID Int (PK) (Auto_increment)
firstName varchar(225)
lastName varchar(225)
gender varchar(20)
```

```
Email varchar(225)
Password varchar(225)
Number char(15)
```
## Product

## Name Type Constraints Default

```
id(pk) int Not null Auto increment
name string Not null
price decimal Not null 0
stock int
category_id fk Not null
details string Not null
```
## Category

## Name Type Constraints Default

```
id(pk) int Not null Auto increment
name string Not null
details string Not null
```
## Reviews

## Name Type Constraints Default

```
id(pk) int Auto increment
```

```
user_id fk
prod_id fk
rating decimal(upto 1decimal place)
review string
```
## Order

## Name Type Constraints Default

```
id(pk) int Auto increment
total_price decimal
user_id string
```
## Order product

## Name Type Constraint Default

```
id(pk) int Auto increment
order_id fk
product_id fk
Quantity int
```
# permissions

For products and category:


```
Admin C R U D
User R
```
For Reviews:
Admin R D
User R
Owner C R U D

# ER diagrams


# Product APIs

Route - / products/
Method: GET
Description - This API is used to get all products

Example URL:
[http://localhost:](http://localhost:) 3000 /products/

Output -

```
Fields Description Data Types
Status success/fail string
Data Product json
Code 201 - success
409 - fail
```
```
string
```
```
Error message string
```

Route - / products/<id>
Method : GET
Description - This API is used to get the details one product using id of the
product

Example URL:
[http://localhost:](http://localhost:) 3000 /products/<id>
Here id is id of product

Input -

```
Fields Description Data Types
id Id of the product integer
```
Output -

```
Fields Description Data Types
Status success/fail string
Data Product json
```

```
Code 201 - success
409 - fail
```
```
string
```
```
Error message string
```
Route - / products
Method : POST
Description - This API is used to add product to database

Example URL:
[http://localhost:](http://localhost:) 3000 /products

Input -

```
Fields Description Data Types Mandatory
Name Name of
Product
```
```
string yes
```
```
Price Price of
product
```
```
string yes
```
```
details Details of
product
```
```
string No
```

```
category Category to
which product
belong
```
```
integer No
```
Output -

```
Fields Description Data Types
Status success/fail string
Code 201 - success
409 - fail
```
```
string
```
```
Error message string
```
Route - / products/<id>
Method : PUT
Description - This API is used to update product details of an existing product

Input -

```
Fields Description Data Types Mandatory
Name Name of
Product
```
```
string No
```
```
Price Price of
product
```
```
string No
```
```
details Details of
product
```
```
string No
```
```
category Category to
which product
```
```
integer No
```

```
belong
```
Output -

```
Fields Description Data Types
Status success/fail string
Code 201 - success
409 - fail
```
```
string
```
```
Error message string
```
Route - / products/<id>
Method : DELETE
Description - This API is used to delete a particular product from the database

```
http://localhost: 3000 /products/<id>
```
Input -

```
Fields Description Data Types
```

```
id Id of the product integer
```
Output -

```
Fields Description Data Types
Status success/fail string
Data All product details
Code 201 - success
409 - fail
```
```
string
```
```
Error message string
```
# Category APIs

Route - /category/
Method : GET
Description - This API is used list all the categories

Output -

```
Fields Description Data Types
Status success/fail string
Data Category list string
Code 201 - success
409 - fail
```
```
string
```

```
Error message string
```
Route - /category/
Method : POST
Description - This API is used to add a new category

Input -

```
Fields Description Data Types Mandatory
Name Name of
category
```
```
string yes
```
```
details Details of
category
```
```
string No
```
Output -

```
Fields Description Data Types
Status success/fail string
Code 201 - success
409 - fail
```
```
string
```
```
Error message string
```
Route - /category/<id>
Method : PUT
Description - This API is used to update an existing category


Input -

```
Fields Description Data Types Mandatory
Name Name of
category
```
```
string yes
```
```
details Details of
category
```
```
string No
```
Output -

```
Fields Description Data Types
Status success/fail string
Code 201 - success
409 - fail
```
```
string
```
```
Error message string
```
Route - /category/<id>
Method : DELETE
Description - This API is used to delete a category

Input -

```
Fields Description Data Types
id Id of the product integer
```

Output -

```
Fields Description Data Types
Status success/fail string
Code 201 - success
409 - fail
```
```
string
```
```
Error message string
```
# Reviews APIs

Route - /products/<id>/reviews
Method : POST
Description - This API is used to add review of a product

Input -

```
Fields Description Data Types Mandatory
rating Rating for the
product
```
```
string yes
```
```
review Review for the
product
```
```
string No
```
Output -

```
Fields Description Data Types
Status success/fail string
Code 201 - success string
```

```
409 - fail
Error message string
```
Route - /products/<id>/reviews/<id>
Method : PUT
Description - This API is used to update review of a product

Input -

```
Fields Description Data Types Mandatory
token Token of user string yes
rating Rating for the
product
```
```
string yes
```
```
review Review for the
product
```
```
string No
```
Output -

```
Fields Description Data Types
Status success/fail string
Code 201 - success
409 - fail
```
```
string
```
```
Error message string
```
Route - /products/<id>/reviews/<id>
Method : DELETE
Description - This API is used to delete the review of a product


Input -

```
Fields Description Data Types Mandatory
token Token of user string yes
id Id of the
review
```
```
string yes
```
Output -

```
Fields Description Data Types
Status success/fail string
Code 201 - success
409 - fail
```
```
string
```
```
Error message string
```

# Order APIs

Route - / order
Method : GET
Description - This API is used to get all orders with details

Input -

```
Fields Description Data Types Mandatory
token User auth
token
```
```
string yes
```
Output -

```
Fields Description Data Types
Status success/fail string
Data Data all order json
Code 201 - success
409 - fail
```
```
string
```
```
Error message string
```
Route - / order/<id>
Method : GET
Description - This API is used to a particular orders with details


Input -

```
Fields Description Data Types Mandatory
token User auth
token
```
```
string yes
```
Output -

```
Fields Description Data Types
Status success/fail string
Data Data of order json
Code 201 - success
409 - fail
```
```
string
```
```
Error message string
```
Route - / order
Method : POST
Description - This API is used to a create orders

Input -

```
Fields Description Data Types Mandatory
token User auth
token
```
```
string yes
```
```
Data List of
products
```
```
JSON yes
```

Output -

```
Fields Description Data Types
Status success/fail string
Data Data of order json
Code 201 - success
409 - fail
```
```
string
```
```
Error message string
```
Route - / order/<id>
Method : PUT
Description - This API is update particular orders

Input -

```
Fields Description Data Types Mandatory
token User auth
token
```
```
string yes
```
```
Data List of updated
products
```
```
JSON yes
```
Output -

```
Fields Description Data Types
Status success/fail string
Data Data of updated
order
```
```
json
```

```
Code 201 - success
409 - fail
```
```
string
```
```
Error message string
```
Route - / order/<id>
Method : DELETE
Description - This API is used to delete a orders

Input -

```
Fields Description Data Types Mandatory
token User auth
token
```
```
string yes
```
```
id Id of products integer yes
```
Output -

```
Fields Description Data Types
Status success/fail string
Code 201 - success
409 - fail
```
```
string
```
```
Error message string
```

# User APIs

**Sign-Up API:**
Input:
**Fields Data Type**
FirstName String
LastName String
Gender String
Email AlphaNumeric
Password Alphanumeric
Number Landline

Output:

```
Fields Description
Status 200(Success)/500(Failure)
Message “DB Connection Error”
Data User data excluding Token
```
**Sign-In API:**
Input:
**Fields Data Type**
Email AlphaNumeric
Password Alphanumeric

Output:

```
Fields Description
Status 200(Success)/500(Failure)
Message “Invalid Password or Email “
```

```
Data User data including Token
```
**Create-User API:**
Input:
**Fields Data Type**
Token SystemGenerated (UUID)
FirstName String
LastName String
Gender String
Email AlphaNumeric
Password Alphanumeric
Number Landline

Output:

```
Fields Description
Status 200(Success)/500(Failure)
Message “DB Connection Error”
Data User data excluding Token
```
**Update-User API:**
Input:
**Fields Data Type**
Token SystemGenerated (UUID)
FirstName String
LastName String
Gender String
Email AlphaNumeric


```
Password Alphanumeric
Number Landline
```
Output:

```
Fields Description
Status 200(Success)/500(Failure)
Message “DB Connection Error”
Data User data excluding Token
```
**Delete-UserByID API:**
Input:
**Fields Data Type**
Token SystemGenerated (UUID)
Id Int

Output:

```
Fields Description
Status 200(Success)/500(Failure)
Message “DB Connection Error”/”Record deleted.
```
**GetUserByID API:**
Input:
**Fields Data Type**
Token SystemGenerated (UUID)
Id Int

Output:


```
Fields Description
Status 200(Success)/500(Failure)
Message “DB Connection Error”
Data User Data
```
**GetUsers API:**
Input:
**Fields Data Type**
Token SystemGenerated (UUID)

Output:

```
Fields Description
Status 200(Success)/500(Failure)
Message “DB Connection Error”
Data User Data
```

