# run mysql
service mysql start

# run spring in background
# shellcheck disable=SC2164
cd ../back
nohup ./gradlew bootRun > app.log 2>&1 &

# run next
# shellcheck disable=SC2164
cd ../front
pm2 "npm run dev"
cd ../
