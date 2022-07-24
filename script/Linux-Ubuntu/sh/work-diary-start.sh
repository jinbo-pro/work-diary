#!/bin/sh
echo "run docker node work-diary -->> 7586:7586";
docker run -d -p 7586:7586 -v /home/lijinbo/work-diary:/home/work-diary node /bin/bash -c "cd home/work-diary;npm run start"