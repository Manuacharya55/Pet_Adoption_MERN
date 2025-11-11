## PET ADOPTION APPLICATION

A platform to adopt pet

// auth : 
/api/v1/auth
/register :
    success : 
        {
            "success": true,
            "statusCode": 201,
            "data": {
                "_id": "6913314bcb24e92858ba1a85",
                "fullname": "manu",
                "email": "manu@gmail.com",
                "avatar": "",
                "token": "token here"
            },
            "message": "User registered successfully"
        }

    error : 
        {
            "success": false,
            "statusCode": 400,
            "message": "User already exists with this email"
        }

        {
            "success": false,
            "statusCode": 400,
            "message": "Please provide all required fields"
        }

/login :
    success :
        {
            "success": true,
            "statusCode": 200,
            "data": {
                "_id": "6913314bcb24e92858ba1a85",
                "fullname": "manu",
                "email": "manu@gmail.com",
                "avatar": "",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTEzMzE0YmNiMjRlOTI4NThiYTFhODUiLCJpYXQiOjE3NjI4NjU3NDB9.lRCUXLY9RPxORsntFzrBaOMADnJJiAFkW8jBCiaXe7Y"
            },
            "message": "Login successful"
        }

    error :
        {
            "success": false,
            "statusCode": 401,
            "message": "Invalid email or password"
        }


/profile :
    success :


//update profile
/profile : 
    success :
        {
            "success": true,
            "statusCode": 200,
            "data": {
                "_id": "6913314bcb24e92858ba1a85",
                "fullname": "manu acharya",
                "email": "manu@gmail.com",
                "avatar": "",
                "address": {
                    "_id": "69133996d371df304ccc0cfa",
                    "phonenumber": "9845092447",
                    "address": "S N Nagar Sagar",
                    "district": "Shimogga",
                    "state": "Karnataka",
                    "lng": 0.001,
                    "lat": 0.21,
                    "user": "6913314bcb24e92858ba1a85",
                    "createdAt": "2025-11-11T13:26:46.367Z",
                    "updatedAt": "2025-11-11T13:26:46.367Z",
                    "__v": 0
                }
            },
            "message": "Profile retrieved successfully"
        }



/api/v1/address
 /
 success :
    {
        "success": true,
        "statusCode": 201,
        "data": {
            "phonenumber": "9845092447",
            "address": "S N Nagar Sagar",
            "district": "Shimogga",
            "state": "Karnataka",
            "lng": 0.001,
            "lat": 0.21,
            "user": "6913314bcb24e92858ba1a85",
            "_id": "69133996d371df304ccc0cfa",
            "createdAt": "2025-11-11T13:26:46.367Z",
            "updatedAt": "2025-11-11T13:26:46.367Z",
            "__v": 0
        },
        "message": "Address added successfully"
    }

error : 
    {
        "success": false,
        "statusCode": 400,
        "message": "Please provide all required fields"
    }

/:addressId
    success :
        {
        "success": true,
        "statusCode": 200,
        "data": {
            "_id": "69133a35f3fdec5975206aca",
            "phonenumber": "9845092446",
            "address": "S N Nagar Sagar",
            "district": "Shimogga",
            "state": "Karnataka",
            "lng": 0.001,
            "lat": 0.21,
            "user": "6913314bcb24e92858ba1a85",
            "createdAt": "2025-11-11T13:29:25.687Z",
            "updatedAt": "2025-11-11T13:30:01.633Z",
            "__v": 0
        },
        "message": "Address updated successfully"
    }

    error :
        {
            "success": false,
            "statusCode": 400,
            "message": "Please provide all required fields"
        }

/api/v1/category

add category : 
    success :
        {
            "success": true,
            "statusCode": 201,
            "data": {
                "categoryImg": "www.placeholder.com",
                "categoryName": "cat",
                "isActive": true,
                "_id": "69133d0f663d28940edebb01",
                "createdAt": "2025-11-11T13:41:35.351Z",
                "updatedAt": "2025-11-11T13:41:35.351Z",
                "__v": 0
            },
            "message": "Category added successfully"
        }

    error :
        {
            "success": false,
            "statusCode": 400,
            "message": "Category name and image are required"
        }

get all category :
    {
    "success": true,
    "statusCode": 200,
    "data": [
        {
            "_id": "69133d0f663d28940edebb01",
            "categoryImg": "www.placeholder.com",
            "categoryName": "cat",
            "isActive": true,
            "createdAt": "2025-11-11T13:41:35.351Z",
            "updatedAt": "2025-11-11T13:41:35.351Z",
            "__v": 0
        }
    ],
    "message": "Categories retrieved successfully"
}

get category
{
    "success": true,
    "statusCode": 200,
    "data": [
        {
            "_id": "69133d0f663d28940edebb01",
            "categoryImg": "www.placeholder.com",
            "categoryName": "kittens",
            "isActive": false,
            "createdAt": "2025-11-11T13:41:35.351Z",
            "updatedAt": "2025-11-11T13:47:20.644Z",
            "__v": 0
        }
    ],
    "message": "Categories retrieved successfully"
}

//update category
{
    "success": true,
    "statusCode": 200,
    "data": {
        "_id": "69133d0f663d28940edebb01",
        "categoryImg": "www.placeholder.com",
        "categoryName": "kittens",
        "isActive": false,
        "createdAt": "2025-11-11T13:41:35.351Z",
        "updatedAt": "2025-11-11T13:47:20.644Z",
        "__v": 0
    },
    "message": "Category updated successfully"
}