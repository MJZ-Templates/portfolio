# run mysql
service mysql start

# run spring in background
# shellcheck disable=SC2164
cd ../back
./gradlew clean build -x test
nohub java -jar /workspace/portfolio/portfolio/back/target/portfolio-0.0.1-SNAPSHOT.jar &

# run next
# shellcheck disable=SC2164
cd ../front
npm run dev