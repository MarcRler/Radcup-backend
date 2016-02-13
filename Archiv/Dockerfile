FROM mongo

COPY radcupDevSample.json /radcupDevSample.json
CMD mongorestore -h db /radcupDevSample.json && mongo db/radcupDevelopment --eval "db.createUser({user: 'root', pwd: 'toor', roles:[ { role:'readWrite',db: 'dbAdmin'} ]  } ) ;"
