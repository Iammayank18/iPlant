# iPlant

About:

Iplant is an innovative and eco-friendly initiative that aims to promote the importance of plants and nature. Plants are an essential part of our environment and contribute significantly to our overall well-being. They provide us with food, oxygen, and a habitat for many living organisms. Moreover, plants have a positive impact on our mental and physical health. Studies have shown that spending time in nature can reduce stress, anxiety, and depression.
Unfortunately, due to rapid urbanization and deforestation, our natural environment is under threat. The Iplant initiative aims to raise awareness about the importance of plants and nature and encourage individuals to take action to protect the environment. By planting more trees and vegetation, we can create a healthier and more sustainable environment for ourselves and future generations.
There are many ways to get involved with Iplant. You can volunteer at local tree planting events, donate to organizations that support environmental conservation, or simply make small changes in your daily life, such as using eco-friendly products and reducing your carbon footprint.
In conclusion, the Iplant initiative is a crucial step towards promoting the importance of plants and nature. By working together, we can create a healthier and more sustainable environment for ourselves and future generations. Let's all do our part in protecting our planet and preserving our natural heritage.

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
