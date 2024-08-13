# iPlant

Installation and configuration commands:

```
git clone https://github.com/Iammayank18/iPlant.git
```

create a new **_.env_** file in root of server folder and setup these:

```
DBLOCAL=mongodb://127.0.0.1:27017/iplant (db url)
SECRET_KEY=KJANJDFN3432KJSDNJNBWFWE423SDFDS (jwt secret key)
DEV_ENV=dev (enviroment)
ORS_API_KEY="" (open route sevice api key)

# ==== for aws s3 access
accessKeyId=""
secretAccessKey=""
AWS_BUCKET=""
AWS_REGION=""
```

No navigate in client and server folder and run:

```
yarn (in both)
yarn start (in client)
yarn dev (in server)
```
