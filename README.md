# For installing the app

"npm install" is sufficient for installing the node_modules.

## For running the project

With "npm start" command the project can be used on localhost.

## Parameters

You can use these product Ids for searching 

1K000006
1T010212
1T010182

## Backend Headers

For backend communication those headers must be added in APIUtils.js . I added it but they can be changed in future.

"x-smartgift-app-id" = "zOdeE81mInZIiPLrdHRd0IVZ1a2vv42p6tvh8SX3";
"x-smartgift-app-secret" = "ldPn67Cf7e0NboidnQ30KTtrfD1nqPpoSqs69EfH";

## Multiple Product Search

You can use the Product Id(s)'s input field for multiple search adding comma between product codes.
Alternatively you can search from url directly like that "http://localhost:3000/{productCode1},{productCode2}"

## Use Case

I could not be sure what should i do when user search some product Ids and push send button with the same product Ids again and again
I preferred the api call again because there is a cache mechanism for same api requests and it is useful for the use-case below
- user searched the multiple products
- user accepts some of them
- user push the send button again with the same ids.

## Merchant Code

I added 'vineyardwards' as a default value for merchant code input for easy testing purpose for you :)
