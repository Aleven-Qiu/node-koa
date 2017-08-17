
#!/bin/bash

if [ -z "$1" ];then
echo "please path"
exit
fi

cd /data/qmx-qnpm-modules
cd $1
npm publish

# cd /data/qmx-qnpm-modules-code/$1
# git pull origin master
# npm publish


