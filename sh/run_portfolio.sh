# run mysql
service mysql start

# run spring in background
cd /workspace/portfolio/portfolio/back
./gradlew clean build -x test
nohub java -jar /workspace/portfolio/portfolio/back/target/portfolio-0.0.1-SNAPSHOT.jar &

# run next
cd /workspace/portfolio/portfolio/front
npm run dev
