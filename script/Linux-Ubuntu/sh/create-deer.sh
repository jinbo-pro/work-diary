#!/bin/sh
docker run -d -p 39003:8899 --name deer -v /home/lijinbo/deer:/home/deer node /bin/bash -c "cd home/deer;npm run start"