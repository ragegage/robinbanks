# Schema Information

## stocks
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
ticker_symbol | string    | not null
company_info  | text      |

## lists
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
list_head   | integer   | foreign key (references stock_list_items), indexed

## stock_list_items
column name         | data type | details
--------------------|-----------|-----------------------
id                  | integer   | not null, primary key
list_id             | integer   | not null, foreign key (references users), indexed
stock_id            | string    | not null, foreign key (references stocks), indexed
next_stock_list_id  | integer   | foreign key (references stock_list_items)

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
