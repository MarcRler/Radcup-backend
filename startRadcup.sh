#!/bin/bash
echo "
ooooooooo.         .o.       oooooooooo.     .oooooo.   ooooo     ooo ooooooooo.                                                     
 888    Y88.      .888.       888    Y8b   d8P    Y8b    888       8   888    Y88.                                                   
 888   .d88      .8 888.      888      888 888           888       8   888   .d88                                                   
 888ooo88P      .8   888.     888      888 888           888       8   888ooo88P                                                    
 888 88b.      .88ooo8888.    888      888 888           888       8   888                                                           
 888   88b.   .8       888.   888     d88   88b    ooo    88.    .8    888                                                           
oooooooooo.o o88o     o8888o o888bood8P      Y8bood8P       YbodP     o888o                      .o.       ooooooooo.   ooooooooo.   
 888     Y8b                                                                                    .888.       888    Y88.  888    Y88. 
 888     888  .ooooo.   .ooooo.  oooo d8b oo.ooooo.   .ooooo.  ooo. .oo.    .oooooooo          .8 888.      888   .d88   888   .d88 
 888oooo888  d88   88b d88   88b  888  8P  888   88b d88   88b  888P Y88b  888   88b          .8   888.     888ooo88P    888ooo88P   
 888     88b 888ooo888 888ooo888  888      888   888 888   888  888   888  888   888         .88ooo8888.    888          888         
 888    .88P 888    .o 888    .o  888      888   888 888   888  888   888   88bod8P         .8       888.   888          888         
o888bood8P    Y8bod8P   Y8bod8P  d888b     888bod8P   Y8bod8P  o888o o888o  8oooooo.       o88o     o8888o o888o        o888o        
                                           888                             d      YD                                                 
                                          o888o                             Y88888P                                                 
                                                                                                                                      
- ih027, pw032, mn031 WS15/16 Mobile Web Applications -                                                                                                                                     
 Hint: you need a "docker" & "docker-compose" installation to run the APP!
       if a error in the web1 container occurs please check your ip address, maybe you have to change it with option 3)

"

function press_enter
{
    echo ""
    echo -n "Press Enter to continue"
    read
    clear
}

function killion
{
 docker stop radcupbackend_ionic_1
 echo "call ionic serve from your client!" 
}

function testsuite
{
 docker stop radcupbackend_web_1
 docker stop radcupbackend_ionic_1
 docker stop radcupbackend_db_1
 docker-compose -f tests/docker-compose.yml build
 docker-compose -f tests/docker-compose.yml up 
}

function getlogins
{

echo "RadcupUserName:Email:Password"
echo "userone:1@1.de:123"
echo "usertwo:2@2.de:123"
echo "userthree:3@3.de:123"
echo "userfour:4@4.de:123"
echo "immae:immi@immi.de:123"
echo "manu:manu@manu.de:123"
echo "pascal:pascal@pascal.de:123"

}

function dockerip 
{
  echo "setting dockerip in Dockerfiles"
  sed -i -E "s#ENV SERVER=.*#ENV SERVER=192.168.99.100#" web/Dockerfile
  sed -i -E "s#ENV SERVER=.*#ENV SERVER=192.168.99.100#" ion/Dockerfile
  sed -i -E "s#ENV SERVER=.*#ENV SERVER=192.168.99.100#" tests/Dockerfile
  echo "done.."
}

function localhostip 
{
 echo "setting localhost in Dockerfiles"
 sed -i -E "s#ENV SERVER=.*#ENV SERVER=localhost#" web/Dockerfile
 sed -i -E "s#ENV SERVER=.*#ENV SERVER=localhost#" ion/Dockerfile
 sed -i -E "s#ENV SERVER=.*#ENV SERVER=localhost#" tests/Dockerfile
echo "done.."
}

function otherip
{
 echo "setting otherip in Dockerfiles"
 read -p "Please set a valid ip-address:" ip
 echo "setting:"$ip
 sed -i -E "s#ENV SERVER=.*#ENV SERVER=$ip#" web/Dockerfile
 sed -i -E "s#ENV SERVER=.*#ENV SERVER=$ip#" ion/Dockerfile 
 sed -i -E "s#ENV SERVER=.*#ENV SERVER=$ip#" tests/Dockerfile 
}
 

function calldocker
{
 echo " starting radcup application "
 echo "please visit ip:8100 in a webbrowser (chrome recommended)" 
 sleep 1
 echo '.' 
sleep 1 
echo '..'
sleep 1
echo '...'
 docker-compose build
 docker-compose up
}

selection=
until [ "$selection" = "0" ]; do
    echo ""
    echo "Radcup MENU"
    echo "please use crtl-c if you want to stop the running application"
    echo ""
    echo "1 - Use Dockerip (MAC)"
    echo "2 - Use localhost "
    echo "3 - Use a other ip "
    echo "4 - run testsuite containers - please read the output carefully:" 
    echo "5 - get logins for radcup"
    echo "6 - start radcup docker containers"
    echo "99 - dev mode "
    echo ""
    echo "0 - exit program"
    echo ""
    echo -n "Enter selection: "
    read selection
    echo ""
    case $selection in
        1 ) dockerip ; press_enter ;;
        2 ) localhostip ; press_enter ;;
        3 ) otherip ; press_enter;;
        6 ) calldocker ; press_enter;;
	99 ) killion ; press_enter;;
        5 ) getlogins ; press_enter;; 
        4 ) testsuite ; press_enter;;
        0 ) exit ;;
        * ) echo "Please enter 1, 2, 3, 4, 5, 6, 99 or 0"; press_enter
    esac
done

