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
 888    .88P 888    .o 888    .o  888      888   888 888   888  888   888   88bod8P         .8      888.   888          888         
o888bood8P    Y8bod8P   Y8bod8P  d888b     888bod8P   Y8bod8P  o888o o888o  8oooooo.       o88o     o8888o o888o        o888o        
                                           888                             d      YD                                                 
                                          o888o                             Y88888P                                                 
                                                                                                                                      
- ih027, pw032, mn031 WS15/16 Mobile Web Applications -                                                                                                                                     
 Hint: you need a "docker" & "docker-compose" installation to run the APP!

"

function press_enter
{
    echo ""
    echo -n "Press Enter to continue"
    read
    clear
}

function dockerip 
{
  echo "setting dockerip in Dockerfiles"
  sed -i -E "s#ENV SERVER=.*#ENV SERVER=192.168.99.100#" web/Dockerfile
  sed -i -E "s#ENV SERVER=.*#ENV SERVER=192.168.99.100#" ion/Dockerfile
  echo "done.."
}

function localhostip 
{
 echo "setting localhost in Dockerfiles"
 sed -i -E "s#ENV SERVER=.*#ENV SERVER=localhost#" web/Dockerfile
 sed -i -E "s#ENV SERVER=.*#ENV SERVER=localhost#" ion/Dockerfile
 echo "done.."
}

function otherip
{
 echo "setting otherip in Dockerfiles"
 read -p "Please set a valid ip-address:" ip
 echo "setting:"$ip
 sed -i -E "s#ENV SERVER=.*#ENV SERVER=$ip#" web/Dockerfile
 sed -i -E "s#ENV SERVER=.*#ENV SERVER=$ip#" ion/Dockerfile 
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
    echo "1 - Use Dockerip (MAC)"
    echo "2 - Use localhost (Linux)"
    echo "3 - Use a other ip "
    echo "4 - start radcup docker containers"
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
        4 ) calldocker ; press_enter;;
	0 ) exit ;;
        * ) echo "Please enter 1, 2, 3, 4 or 0"; press_enter
    esac
done

