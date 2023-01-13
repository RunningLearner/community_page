# community_page
넥스트 &amp; 익스프레스를 사용한 커뮤티니 페이지 사이트 프로젝트
## 서버 재실행시  
1. 깃 러너 실행  
```
# aws 서버내 actions-runner 폴더에서
nohup ./run.sh &
```
2. postgres 실행
```
# community_page 폴더에서
docker-compose up -d
```
3. 포트포워딩
```
# 80을 3000으로받기
sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
```
4. pm2 실행
```
# 클라이언트와 서버폴더 안에서
pm2 start ecosystem.config.js
```
