please use npm i before npm start

Question 1:     PrimeNumber

->   url:-localhost:3000/prime/50
     Method:-GET

Here 50 is param or number passed in GET Method

->  json as Response:- {
    "prime": [
        2,
        3,
        5,
        7,
        11,
        13,
        17,
        19,
        23,
        29,
        31,
        37,
        41,
        43,
        47
    ]
}

Question 2:     User  creation and insertion


-> url:- localhost:3000/user/
   Method:-POST
   payload:-{
	        "name": "rahul",
            "email": "rahulmukherjee68@gmail.com",
            "password": "1234",
            "address": "abc colony",
            "phone": 9433003911,
            "dob": "03-02-2020"
        }


-> response:- {
    "message": "Data Inserted Successfully to User and Contact Collection"
}

->response for phone or mail errors :-
{
    "error": "Please enter correct email and phone"
}


Question 3:     Contact Creation and deletion

Contact is getting created first then user is getting inserted where i am keeping the contact id as field contactref
in db and deleting it when delete is called from user route with phone number from body

->url:-localhost:3000/user/
->payload:-{
            "phone": 8433003911
            }

->response:-{
    "message": "Data deleted Successfully from user and contacts "
}

->NoSuchRecordResponse:-{
    "message": "Such Data Not Found! Cannot apply delete Operation"
}




mongo db User collection saved doc eg:-
{"_id":{"$oid":"5e7392046c70b5237816fb17"},"contactRef":{"$oid":"5e7392046c70b5237816fb18"},"name":"rahul","email":"rahul@gmail.com","password":"1234","address":"abc","phone":{"$numberDouble":"9433003921"},"dob":{"$date":{"$numberLong":"1583087400000"}},"__v":{"$numberInt":"0"}}

mongodb Contact collection saved doc eg:0
{"_id":{"$oid":"5e7392046c70b5237816fb18"},"email":"rahul@gmail.com","phone":{"$numberDouble":"9433003921"},"__v":{"$numberInt":"0"}}
