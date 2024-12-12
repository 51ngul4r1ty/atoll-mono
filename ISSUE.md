{"status":500,"message":"targetItemPrevLink with 7045d122b3014d468849ad02a3decfc9 linked to self (which was source item)!"}

curl 'https://pointswag.com/api/v1/actions/reorder-backlog-items' -X POST -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:124.0) Gecko/20100101 Firefox/124.0' -H 'Accept: application/json' -H 'Accept-Language: en-US,en;q=0.5' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Authorization: Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyMTc3OTZmNmUxYWI0NTVhOTgwMjYzMTcxMDk5NTMzZiIsInVzZXJuYW1lIjoidGVzdCIsImV4cGlyYXRpb25EYXRlIjoiMjAyNC0wMy0xMVQxNzo0MjoyNy43MTBaIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTAxNzg2NDd9.zQRYeJ5r5bMwEbUFoPBKuVKQe-3DR5VHD_sqcyvxshY' -H 'Origin: https://pointswag.com' -H 'Connection: keep-alive' -H 'Referer: https://pointswag.com/plan' -H 'Sec-Fetch-Dest: empty' -H 'Sec-Fetch-Mode: cors' -H 'Sec-Fetch-Site: same-origin' --data-raw '{"sourceItemId":"7045d122b3014d468849ad02a3decfc9","targetItemId":"028bec395df54b1f88578d444371e554"}'


To repro the issue do this:

1. Open one instance of Atoll in a browser (Firefox) window.
2. Open another instance of Atoll in a different browser (Chrome) window.
3. Drag the third backlog item to the top in the second brower.
4. Drag the same third backlog item to the top in the first browser.
5. It should blow up with this error.