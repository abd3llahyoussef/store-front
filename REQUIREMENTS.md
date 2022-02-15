# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index : '/products' [GET]
- Show : '/products/:id' [GET]
- Create [token required] : '/products' [POST]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required] : '/users' [GET]
- Show [token required] : '/users/:id' [GET]
- Create N[token required] : '/users' [POST]

#### Orders
- Current Order by user (args: user id)[token required] : '/orders' [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required] : '/orders/:id' [GET]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category
Column	   Type
id	       SERIAL PRIMARY KEY
name	   VARCHAR
price	   INTEGER
category   VARCHAR

#### User
- id
- firstName
- lastName
- password
Column	    Type
id	        SERIAL PRIMARY KEY
username	VARCHAR 
firstName	VARCHAR
lastName	VARCHAR
password	VARCHAR

//divide the order table to 2 tables (orders-products && orders)
#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
# orders-product
Column	    Type
id	        SERIAL PRIMARY KEY
product_id	FOREIGN KEY to PRODUCTS
quantity	INTEGER
order_id	    FOREIGN KEY to ORDERS

# orders
- id
- user_id
- status of order (active or complete)
Column	        Type
id	            SERIAL PRIMARY KEY
user_id	        FOREIGN KEY to USERS
status	        ENUM ('active','complete')